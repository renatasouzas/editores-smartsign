import { useState, useRef, useEffect } from 'react';
import TinyMCE from './components/TinyMCE';
import CKEditor4 from './components/CKEditor4';
import CKEditor5 from './components/CKEditor5';

export default function Editors({dbContent}) {

  ////////////////////////// CKEditor5
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
      setData('batatinha')
      setEditorLoaded(true);
    }, []);
  /////////////////////////

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
      <CKEditor5
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      /> {JSON.stringify(data)}
      
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