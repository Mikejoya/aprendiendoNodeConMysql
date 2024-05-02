import http from 'node:http'
import path from 'node:path'
import ditto from './ditto.mjs'

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case path.sep:
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          res.end('<h1>Hola Mike llegaras hacer el mejor...</h1>')
          break
        // eslint-disable-next-line no-fallthrough
        case `${path.sep}about`:
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          res.end('<h1>Sobre nosotros Mike</h1>')
          break
        case `${path.sep}pokemon${path.sep}ditto`:
          res.setHeader('Content-Type', 'text/plain; charset=utf8')
          res.end(JSON.stringify(ditto))
          break
        default:
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          res.end('<h1>not fount 404</h1>')
      }
    // eslint-disable-next-line no-fallthrough
    case 'POST':
      switch (url) {
        case `${path.sep}pokemon`:{
          // eslint-disable-next-line no-unused-vars
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = new Date()
            res.end(JSON.stringify(data))
          })
          break
        }

        // eslint-disable-next-line no-fallthrough
        default:
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          return res.end('<h1>not fount 404</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen('1234', () => {
  console.log('listen on http://localhost:1234')
})
