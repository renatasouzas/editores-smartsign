import { useState, useRef, useEffect } from 'react';
import TinyMCE from './components/TinyMCE';
import CKEditor4 from './components/CKEditor4';

export default function Editors({dbContent}) {
  
    const [ tinyContent, setTinyContent ] = useState(dbContent.tinyMCE)
    const [ ckContent, setCkContent ] = useState(dbContent.CKEditor4)

  /////////////////// Client side rendering 
  // useEffect(() => {
  //   async function fetchdata(){
  //     const content = await fetch('http://localhost:5000/content')
  //     const contentData = await content.json()

  //     setTinyContent(contentData.tinyMCE)
  //     setCkContent(contentData.CKEditor4)

  //   }; fetchdata()
  // }, [])
  /////////////////////////////////

  function handleTinyChange(editorContent) {
    setTinyContent(editorContent);
  }

  function handleCkChange(editorContent) {
    setCkContent(editorContent.editor.getData())
  }

  async function handleSubmit() {
    const response = await fetch('http://localhost:5000/content', {
      method: 'PATCH',
      body: JSON.stringify({
        tinyMCE: tinyContent,
        CKEditor4: ckContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setTinyContent(data)
    console.log(data, 'novo conteudo')
  }

  return (
    <>
      {ckContent && tinyContent && (
        <>
          <TinyMCE 
            handleSubmit={handleSubmit}
            handleChange={handleTinyChange}
            content={tinyContent}
          />

          <CKEditor4 
            handleSubmit={handleSubmit}
            handleChange={handleCkChange}
            content={ckContent}
          />
        </>)
      }
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