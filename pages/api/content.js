let content = '<table style="border-collapse: collapse; width: 100%; height: 152px; border-width: 1px; border-style: hidden;" border="1"><colgroup><col style="width: 17.4481%;"><col style="width: 82.5519%;"></colgroup><tbody><tr style="height: 157.094px;"><td style="height: 157.094px; border-width: 1px; border-style: hidden;"><img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80" alt="" width="200" height="133"></td><td style="height: 157.094px; border-width: 1px;"><h1><span style="color: rgb(241, 196, 15);">T&iacute;tulo</span></h1><h2>Subtitulo</h2><pre><span style="color: rgb(53, 152, 219);">Cargo</span>: Pipipi popo</pre></td></tr></tbody></table>'

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

