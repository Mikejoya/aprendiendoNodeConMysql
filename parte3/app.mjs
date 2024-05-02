import express from 'express'
import cors from 'cors'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { validateMovie, validatePartialMovie } from './scherma/movie.mjs'

const filePath = './movies.json'
const PORT = process.env.PORT ?? 1234
let data

const app = express()
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGIN = [
      `http:${path.sep}${path.sep}localhost:8080`,
      `http:${path.sep}${path.sep}localhost:1234`,
      `http:${path.sep}${path.sep}movies.com`,
      `http:${path.sep}${path.sep}mikejoya.com`,
      `http:${path.sep}${path.sep}127.0.0.1:5500`
    ]

    if (ACCEPTED_ORIGIN.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by')

try {
  const jsonData = await readFile(filePath)
  data = JSON.parse(jsonData)
  app.use(express.json())
} catch (err) {
  console.log('Error al leer el archivo: ', err)
}
app.get(`${path.sep}`, (req, res) => {
  res.status(200).json({ saludo: 'Welcome' })
})

app.get(`${path.sep}movies`, (req, res) => {
  const { genre } = req.query
  if (genre) {
    const movie = data.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(movie)
  }
  res.json(data)
})

app.get(`${path.sep}movies${path.sep}:id`, (req, res) => {
  const { id } = req.params
  const movie = data.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post(`${path.sep}movies`, (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  data.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete(`${path.sep}movies${path.sep}:id`, (req, res) => {
  const { id } = req.params

  const movieIndex = data.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ message: 'Movie not found' })
  }

  data.slice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch(`${path.sep}movies${path.sep}:id`, (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = data.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...data[movieIndex],
    ...result.data
  }

  data[movieIndex] = updateMovie

  return res.json(updateMovie)
})

// app.options(`${path.sep}movies${path.sep}:id`, (req, res) => {
//   const origin = req.header('origin')
//   console.log('Esto es origen', origin)
//   console.log(ACCEPTED_ORIGIN.includes(origin))
//   if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'DELETE'])
//   }
//   res.sendStatus(200)
// })

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
