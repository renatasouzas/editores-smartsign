import React, { Component } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
  toolbar: [ 'bold', 'italic' ]
};

function CKEditor5  ()  {
  return (
    <CKEditor
        editor={ Editor }
        config={ editorConfiguration }
        data="<p>Hello from CKEditor 5!</p>"
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        }
      }
    />
  );
}

export default CKEditor5;