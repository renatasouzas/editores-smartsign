import { Editor } from '@tinymce/tinymce-react'; 
import { CKEditor } from 'ckeditor4-react';
import { useState, useEffect } from 'react';

function Editors() {

  const [ content, setContent ] = useState()

  useEffect(() => {
    setContent(localStorage.getItem('content'))
    console.log(content)
  }, [])

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
            localStorage.setItem('content', tinymce.activeEditor.getContent());
          }
        }}
      />
      <CKEditor
        initData="<p>CKEditor 4</p>"
      />
    </form>
  );
}

export default Editors