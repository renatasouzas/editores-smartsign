import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = ({handleSubmit, handleChange, content}) => {
  
  return (
    <form onSubmit={handleSubmit}>
        <Editor
          apiKey='rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw'
          value={content}
          onEditorChange={handleChange}
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
  )
}

export default TinyMCE