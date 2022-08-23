let content = '<table border="1"><tbody><tr><td><img alt="" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80" style="height:133px; width:200px" /></td><td><h1>T&iacute;tulo</h1><h2>Subtitulo</h2><pre>Cargo: Pipipi popo</pre></td></tr></tbody></table>'

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(content) 
  }
  else if (req.method === 'PATCH') {
    const newContent = req.body
    console.log(newContent)
    content = newContent
    console.log(content, 'data content')
    res.status(200).json(newContent)
  }
} 

