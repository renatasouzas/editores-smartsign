let data = require('../../signature.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(data.content) 
  }
  else if (req.method === 'PATCH') {
    const newContent = req.body
    data.content = newContent
    res.status(200).json(newContent)
  }
} 

