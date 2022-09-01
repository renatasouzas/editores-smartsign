import { useState, useRef, useEffect } from 'react';
import TinyMCE from './components/TinyMCE';
import CKEditor4 from './components/CKEditor4';
// import CKEditor5 from './components/CKEditor5';

export default function Editors({dbContent}) {

  ////////////////////////// CKEditor5
    // const [editorLoaded, setEditorLoaded] = useState(false);
    // const [data, setData] = useState("");

    // useEffect(() => {
    //   setData('<p>Conteudo CKEditor5</p>')
    //   setEditorLoaded(true);
    // }, []);
  /////////////////////////

  const [ tinyContent, setTinyContent ] = useState(dbContent.tinyMCE)
  const [ ckContent, setCkContent ] = useState(dbContent.CKEditor4)

  function handleTinyChange(editorContent) {
    setTinyContent(editorContent);
  }

  function handleCkChange(editorContent) {
    setCkContent(editorContent.editor.getData())
  }

  function handleTinySubmit() {
    updateTinyContent(tinyContent)
  }

  function handleCkSubmit() {
    updateCKContent(ckContent)
  }

  const updateTinyContent = async (body) => {
    const response = await fetch('http://localhost:5000/content', {
      method: 'PATCH',
      body: JSON.stringify({
        tinyMCE: body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setTinyContent(data)
  }

  const updateCKContent = async (body) => {
    const response = await fetch('http://localhost:5000/content', {
      method: 'PATCH',
      body: JSON.stringify({
        CKEditor4: body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setCkContent(data)
  }

  return (
    <>
      {/* <CKEditor5
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      /> {JSON.stringify(data)} */}
      
      <TinyMCE 
        handleSubmit={handleTinySubmit}
        handleChange={handleTinyChange}
        content={tinyContent}
      />

      <CKEditor4 
        handleSubmit={handleCkSubmit}
        handleChange={handleCkChange}
        content={ckContent}
      />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetch('http://localhost:5000/content')
  const contentData = await content.json()

  return {
    props: {
      dbContent: {
        "tinyMCE": contentData.tinyMCE, 
        "CKEditor4": contentData.CKEditor4
      },
    }
  }
}