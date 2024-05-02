import z from 'zod'

const movieScherma = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().positive(),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'thriller', 'Sci-Fi', 'Crime']),
    {
      invalid_type_error: 'Movie genre must be a array of strings',
      required_error: 'Movie genre is required'
    }
  )
})

export function validateMovie (object) {
  return movieScherma.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieScherma.partial().safeParse(object)
}
