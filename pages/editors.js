import { Editor } from '@tinymce/tinymce-react';
import { CKEditor } from 'ckeditor4-react';
import { useState } from 'react';

export default function Editors({dbContent}) {

  const [ tinyContent, setTinyContent ] = useState(dbContent.tinyContent)
  const [ ckContent, setCkContent ] = useState(dbContent.ckContent)

  function handleTinyChange(editorContent) {
    setTinyContent(editorContent);
  }

  function handleCkChange(editorContent) {
    setCkContent(editorContent.editor.getData())
  }

  function handleTinySubmit() {
    let url = 'http://localhost:3000/api/tiny-content'
    updateContent(url, tinyContent)
  }

  function handleCkSubmit() {
    let url = 'http://localhost:3000/api/ck-content'
    updateContent(url, ckContent)
  }

  const updateContent = async (url, body) => {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setTinyContent(data)
  }

  return (
    <>
      <form onSubmit={handleTinySubmit}>
        <Editor
          apiKey='rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw'
          value={tinyContent}
          onEditorChange={handleTinyChange}
          init={{
            icons: 'material',
            height: '320px',
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
        <input type="submit" value="Salvar Tiny Editor" />
      </form>

      <form onSubmit={handleCkSubmit}>
        <CKEditor
          initData={ckContent}
          config={{
            height: '200px',
            skin: 'kama',
            toolbar: [
              { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
              { name: 'links', items: [ 'Link', 'Unlink' ] },
              { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule' ] },
              { name: 'document', items: [ 'Source' ] },
              { name: 'basicstyles', items: [ 'Bold', 'Italic', '-', 'RemoveFormat' ] },
              { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Blockquote' ] },
              { name: 'styles', items: [ 'Styles', 'Format', 'Color' ] }
            ],
          }}
          onChange={handleCkChange}
        />
        <input type="submit" value="Salvar CKEditor" />
      </form>
    </>
  );
}

export async function getServerSideProps() {
  const tinyResponse = await fetch('http://localhost:3000/api/tiny-content')
  const tinyContent = await tinyResponse.json()

  const ckResponse = await fetch('http://localhost:3000/api/ck-content')
  const ckContent = await ckResponse.json()

  return {
    props: {
      dbContent: {
        "tinyContent": tinyContent, 
        "ckContent": ckContent
      },
    }
  }
}