import http from 'node:http'
import * as fs from 'node:fs'
import path from 'node:path'

const desiredPort = process.env.PORT || 3000

function processRequest (req, res) {
  console.log('Hola bebe...')
  if (req.url === path.sep) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('Bienvenido a mi lugar favorito... esta página')
  } else if (req.url === `${path.sep}images.png`) {
    // eslint-disable-next-line no-unused-expressions
    fs.readFile(`.${path.sep}images.png`, (err, data) => {
      if (err) {
        res.statusCode = 404
        res.end('Error no se encontro archivo...')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === `${path.sep}contact`) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf8')
    res.end('contact')
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
  console.log(path.sep)
}

const server = http.createServer(processRequest)

// eslint-disable-next-line no-undef
server.listen(desiredPort, () => {
  // eslint-disable-next-line no-undef
  console.log(`Mi server http://localhost:${desiredPort}`)
})
