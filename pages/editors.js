import { useState } from 'react';
import TinyMCE from './components/TinyMCE';
import CKEditor4 from './components/CKEditor4';

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

export default function Editors({dbContent}) {
  
    const [ tinyContent, setTinyContent ] = useState(dbContent.tinyMCE)
    const [ ckContent, setCkContent ] = useState(dbContent.CKEditor4)
    const [ image, setImage ] = useState('')
    const [ saved, setSaved] = useState(false)
    console.log(image, 'PARENT')

  function handleTinyChange(editorContent) {
    setTinyContent(editorContent);
  }

  function handleCkChange(editorContent) {
    setCkContent(editorContent.editor.getData())
  }

  async function handleSubmit(event) {
    event.preventDefault();
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
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <>
      {saved && <p>Conteudo salvo!</p>}
      {ckContent && tinyContent && (
        <>
          <TinyMCE 
            handleSubmit={handleSubmit}
            handleChange={handleTinyChange}
            content={tinyContent}
            setImage={setImage}
          />
          <CKEditor4 
            handleSubmit={handleSubmit}
            handleChange={handleCkChange}
            content={ckContent}
          />
        </>
      )}
    </>
  );
}

