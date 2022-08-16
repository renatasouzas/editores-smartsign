import { Editor } from '@tinymce/tinymce-react'; 
import { CKEditor } from 'ckeditor4-react';

function Editors() {
  return (
    <>
      <Editor
        apiKey='rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw'
        initialValue="<p>Conteúdo <strong>inicial</strong> :D</p>"
        init={{
          skin: 'snow', // skin padrão compatível com o smartSign
          icons: 'material',
          height: '300px',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor fontfamily | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table code',
          menubar: 'edit view insert format table olar',
          menu: {view: { title: 'View', items: 'code | preview' }, olar: { title: 'Olar!', items: 'code' },},
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
        }}
      />
      <CKEditor
        initData="<p>Hello from CKEditor 4!</p>"
      />
    </>
  );
}

export default Editors