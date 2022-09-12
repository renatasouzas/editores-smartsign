import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const GlobalContext = React.createContext();

const TinyMCE = ({handleSubmit, handleChange, content, setImage}) => {

  const apiKey = 'rwqbmu7r1py640c26ybql3iuc5vt2mpnlys7i1qfaczf6aqw'
  const initialConfig = {
    branding: false,
    skin: 'oxide',
    height: '320px',
    toolbar: 'undo redo | table | styles | ' +
    'bold italic forecolor fontfamily fontsize | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist | ' +
    'removeformat | code preview image ',
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'visualblocks', 'code', 'media', 'table', 'code', 'help'
    ],
    menubar: 'insert format',
    menu: {view: { title: 'View', items: 'code | preview' }},
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}',
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        setImage(file)

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const id = 'blobid' + (new Date()).getTime();
          const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });

      input.click();
    },
  }
    
    return (
      <form onSubmit={handleSubmit}>
        <Editor
          id='id fix'
          apiKey= {apiKey}
          value={content}
          onEditorChange={handleChange}
          init={initialConfig}
        />
        <input type="submit" value="Salvar Tiny Editor" />
      </form>
    )
}

export default TinyMCE
