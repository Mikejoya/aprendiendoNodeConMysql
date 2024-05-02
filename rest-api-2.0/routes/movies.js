import { Router } from 'express'
import path from 'node:path'
import { MovieController } from '../controllers/movies.js'
// import { MovieModel } from '../models/mysql/movie.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const moviesController = new MovieController({ movieModel })

  moviesRouter.get(`${path.sep}`, moviesController.getAll)

  moviesRouter.get(`${path.sep}:id`, moviesController.getById)

  moviesRouter.post(`${path.sep}`, moviesController.create)

  moviesRouter.delete(`${path.sep}:id`, moviesController.delete)

  moviesRouter.patch(`${path.sep}:id`, moviesController.update)

  return moviesRouter
}
