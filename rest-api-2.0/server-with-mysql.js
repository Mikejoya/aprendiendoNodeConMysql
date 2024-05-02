import { createApp } from './app.mjs'
import { MovieModel } from './models/mysql/movie.js'

createApp({ movieModel: MovieModel })
