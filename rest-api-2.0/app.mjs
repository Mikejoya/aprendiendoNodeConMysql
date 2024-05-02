import express from 'express'
// import crypto from 'node:crypto'
// import cors from 'cors'
// import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import { MovieModel } from './models/mysql/movie.js'
// import { validateMovie, validatePartialMovie } from './schemas/movies.mjs'
// const { title } = require("node:process")

// Esta seria una forma valida tambien de realizar el llamado de mi json en es6

// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')
// const filePath = './movies.json'
// let movies

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())

  // app.use(
  //   cors({
  //     origin: (origin, callback) => {
  //       const ACCEPTED_ORIGINS = [
  //         'http://localhost:8080',
  //         'http://localhost:1234',
  //         'https://movies.com',
  //         'https://midu.dev'
  //       ]

  //       if (ACCEPTED_ORIGINS.includes(origin)) {
  //         return callback(null, true)
  //       }

  //       if (!origin) {
  //         return callback(null, false)
  //       }

  //       return callback(new Error('Not allowed by CORS'))
  //     }
  //   })
  // )

  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo...' })
  })

  app.use(`${path.sep}movies`, createMovieRouter({ movieModel }))

  // const ACCEPTED_ORIGINS = [
  //   "http://localhost:8080",
  //   "http://localhost:1234",
  //   "https://movies.com",
  //   "https://midu.dev",
  // ];

  // try {
  //   const jsonData = await readFile(filePath)
  //   movies = JSON.parse(jsonData)
  //   app.use(express.json())
  // } catch (err) {
  //   console.log('Error al leer el archivo: ', err)
  // }

  // app.get('/movies', (req, res) => {
  //   // const origin = req.header("origin");

  //   // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   //   res.header("Access-Control-Allow-Origin", origin);
  //   // }

  //   const { genre } = req.query
  //   if (genre) {
  //     const filteredMovies = movies.filter((movie) =>
  //       movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
  //     )
  //     return res.json(filteredMovies)
  //   }
  //   res.json(movies)
  // })

  // app.get('/movies/:id', (req, res) => {
  //   const { id } = req.params
  //   const movie = movies.find((movie) => movie.id === id)

  //   if (movie) return res.json(movie)

  //   res.status(404).json({ message: 'Movie not found' })
  // })

  // app.get('/movies/:id', (req, res) => {
  //   const { id } = req.params
  //   const movie = movies.find((movie) => movie.id === id)

  //   if (movie) return res.json(movie)

  //   res.status(404).json({ message: 'Movie not found' })
  // })

  // app.post('/movies', (req, res) => {
  //   const result = validateMovie(req.body)

  //   if (!result.success) {
  //     console.log('Validation Error:', result.error)
  //     return res.status(400).json({ error: JSON.parse(result.error.message) })
  //   }
  //   const newMovie = {
  //     id: crypto.randomUUID(),
  //     ...result.data
  //   }

  //   movies.push(newMovie)

  //   res.status(201).json(newMovie)
  // })

  // app.delete('/movies/:id', (req, res) => {
  //   const { id } = req.params
  //   const moviesIndex = movies.findIndex((movie) => movie.id === id)

  //   if (moviesIndex === -1) {
  //     return res.status(404).json({ error: 'Movie not found' })
  //   }

  //   movies.splice(moviesIndex, 1)

  //   return res.json({ message: 'Movie deleted' })
  // })

  // app.patch('/movies/:id', (req, res) => {
  //   const result = validatePartialMovie(req.body)
  //   if (!result.success) {
  //     return res.status(400).json({ error: result.error.message })
  //   }

  //   const { id } = req.params
  //   const movieIndex = movies.findIndex((movie) => movie.id === id)

  //   if (movieIndex === -1) {
  //     return res.status(404).json({ message: 'Movie not found' })
  //   }

  //   const updateMovie = {
  //     ...movies[movieIndex],
  //     ...result.data
  //   }

  //   movies[movieIndex] = updateMovie

  //   return res.json(updateMovie)
  // })

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, (req, res) => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
