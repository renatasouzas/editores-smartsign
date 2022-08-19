import { Editor } from '@tinymce/tinymce-react'; 
import { CKEditor } from 'ckeditor4-react';
import { useState } from 'react';

export default function Editors({dbContent}) {

  const [ content, setContent ] = useState(dbContent)

  function handleChange(editorContent) {
    console.log(editorContent, 'handleChange')
    setContent(editorContent);
  }

  function handleSubmit() {
    console.log(content, 'handleSubmit')
    updateContent()
  }

  const updateContent = async () => {
    const response = await fetch('http://localhost:3000/api/content', {
      method: 'PATCH',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.body, 'response body')
    const data = await response.json()
    setContent(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Editor
        apiKey='rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw'
        value={content}
        onEditorChange={handleChange}
        init={{
          skin: 'snow', // skin padrão compatível com o smartSign
          icons: 'material',
          height: '300px',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'visualblocks', 'code', 'media', 'table', 'code', 'help'
          ],
          toolbar: 'undo redo | table | blocks | ' +
            'bold italic forecolor fontfamily | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist | ' +
            'removeformat | code preview',
          menubar: 'insert format',
          menu: {view: { title: 'View', items: 'code | preview' }},
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
        }}
      />
      <input type="submit" value="Salvar" />
      <CKEditor
        initData="<p>CKEditor 4</p>"
      />
    </form>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/content')
  const data = await response.json()

  return {
    props: {
      dbContent: data
    }
  }
}