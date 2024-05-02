import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre])

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [movies] = await connection.query(`
        SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id
        FROM movie m
        INNER JOIN movie_genres mg ON m.id = mg.movie_id
        INNER JOIN genre g ON mg.genre_id = g.id
        WHERE g.id = ?;
      `, [id])

      return movies
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;')
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(`SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie WHERE id = UUID_TO_BIN(?);
    `, [id])

    if (movies.length === 0) return null

    return movies
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const uuidResult = await connection.query('SELECT UUID() uuid;')

    console.log('soy 1 clg', uuidResult)

    const [[{ uuid }]] = uuidResult

    console.log('soy 2 clg', uuid)

    try {
      await connection.query(`
      INSERT INTO movie (id, title, year, director, duration, poster, rate) 
      VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);
      `, [title, year, director, duration, poster, rate])
    } catch (e) {
      // Puede enviar informacion sensible
      console.log(e)
      throw new Error('Error creating movie')
      // Enviar la traza(Error) a un servicio interno
      // sendLog(e)
    }

    const [movie] = await connection.query(`
      SELECT title, year, director, duration,poster, rate, BIN_TO_UUID(id) id 
      FROM movie WHERE id = UUID_TO_BIN(?);
    `, [uuid])

    console.log(movie)

    return movie[0]
  }

  static async delete ({ id }) {
    try {
      await connection.query(`DELETE FROM movie m WHERE m.id = UUID_TO_BIN(?)
      `, [id]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error al eliminar la pelicula')
    }

    const [movie] = await connection.query(`SELECT title, year, director, duration,poster, rate, BIN_TO_UUID(id) id 
    FROM movie`
    )
    console.log(movie)

    return movie
  }

  static async update ({ id, input }) {
    const {
      // title,
      year
      // duration
    } = input
    console.log('soy input', input)
    try {
      await connection.query(`
        UPDATE movie 
        SET year = ?
        WHERE BIN_TO_UUID(id) = ?
      `, [year, id])
    } catch (err) {
      console.log(err)
      throw new Error('los datos no estan completos')
    }

    const [movie] = await connection.query('SELECT *, BIN_TO_UUID(id) id FROM movie')
    return movie
  }
}
