import http from 'node:http'
import path from 'node:path'

const PORT = process.env.PORT || 1234

function processRequest (req, res) {
  const { method, url } = req

  if (method === 'GET') {
    if (url === path.sep) {
      res.setHeader('Content-Type', ' text/plain; charset=utf8')
      res.end('HOLA WORLD!')
    }
    if (url === `${path.sep}about`) {
      res.setHeader('Content-Type', 'text/html; charset=utf8')
      res.end('<section><div><h1>HOLA BABY</h1></div> <p>Estamos para romperla todo este tiempo y poder meterle duro y no sentirme como hoy porque las vocas se callan con acciones y hablan por si solas...</p> </section>')
    }
  } else if (method === 'POST') {
    if (url === `${path.sep}pokemon`) {
      let body = ''

      req.on('data', chunk => {
        body += chunk.toString()
      })

      req.on('end', () => {
        const data = JSON.parse(body)
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
        data.mtime = new Date()
        res.end(JSON.stringify(data))
      })
    }
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Se ejecuta en el port: http://localhost/${PORT}`)
})
