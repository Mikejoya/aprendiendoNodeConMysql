import http from 'node:http'
import { findAvailablePort } from '../second-server/index.mjs'

const desiredPort = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  console.log('Hola bebe...')
  res.end('BYE')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Mi server http://localhost:${port}`)
  })
})

console.log(process.env)

// server.listen(0, () => {
//   console.log(`Mi server http://localhost:${server.address().port}`)
// })
