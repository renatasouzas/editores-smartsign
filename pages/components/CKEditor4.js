import { CKEditor } from 'ckeditor4-react';

const CKEditor4 = ({handleSubmit, handleChange, content}) => {
  
  return (
    <form onSubmit={handleSubmit}>
        <CKEditor
          initData={content}
          onChange={handleChange}
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
        />
        <input type="submit" value="Salvar CKEditor" />
      </form>
  )
}

export default CKEditor4
