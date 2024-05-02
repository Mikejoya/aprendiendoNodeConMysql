import path from 'node:path'
import crypto from 'node:crypto'
import { readJSON } from '../utils.js'

const movies = readJSON(`.${path.sep}movies.json`)

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(m => m.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movie = movies.findIndex(m => m.id === id)
    if (movie === -1) {
      return false
    }

    movies.splice(movie, 1)
    return true
  }

  static async update ({ id, input }) {
    const movie = await movies.findIndex(m => m.id === id)
    if (movie === -1) return false

    movies[movie] = {
      ...movies[movie],
      ...input
    }

    return movies[movie]
  }
}
