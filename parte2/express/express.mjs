import express from 'express'
import path from 'node:path'
import ditto from '../routing/ditto.mjs'

const app = express()

// Simplifica el middleware de la linea 10.
// app.use(express.json())

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  console.log(req)

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = new Date()
    req.body = data
    next()
  })
})

// Desactiva el x powered by del header...
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get(`${path.sep}pokemon${path.sep}ditto`, (req, res) => {
  res.status(200).json(ditto)
})

app.post(`${path.sep}pokemon`, (req, res) => {
  // eslint-disable-next-line no-unused-vars
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>not fount 404</h1>')
})

app.listen(PORT, () => {
  console.log(`listen on port: http://localhost:${PORT}`)
})
