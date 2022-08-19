import { Editor } from '@tinymce/tinymce-react'; 
import { CKEditor } from 'ckeditor4-react';
import { useState, useEffect } from 'react';

export default function Editors() {

  const [ content, setContent ] = useState()

  const fetchContent = async () => {
    const response = await fetch('http://localhost:3000/api/content')
    const data = await response.json()
    setContent(data)
  }

  const updateContent = async () => {
    const response = await fetch('http://localhost:3000/api/content', {
      method: 'PATCH',
      body: JSON.stringify('batatinha'),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data, 'body')
    setContent(data)
  }

  useEffect(() => fetchContent, [])

  return (
    <form>
      <Editor
        apiKey='rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw' 
        initialValue={content || '<p>Digite algo e salve, recarregue a pagina para ver o conteudo atualizado</p>'}
        init={{
          skin: 'snow', // skin padrão compatível com o smartSign
          icons: 'material',
          height: '300px',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'save'
          ],
          toolbar: 'undo redo | table | blocks | ' +
            'bold italic forecolor fontfamily | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist | ' +
            'removeformat | code | save',
          menubar: 'edit view insert format table olar',
          menu: {view: { title: 'View', items: 'code | preview' }, olar: { title: 'Olar!', items: 'code' },},
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
          
          save_onsavecallback: () => {
            const currentContent = tinymce.activeEditor.getContent()
            setContent(currentContent)
            updateContent()
            console.log(content, 'content')
          }
        }}
      />
      <CKEditor
        initData="<p>CKEditor 4</p>"
      />
    </form>
  );
}

