import { createApp } from './app.mjs'
import { MovieModel } from './models/local-file-system/movie.js'

createApp({ movieModel: MovieModel })
