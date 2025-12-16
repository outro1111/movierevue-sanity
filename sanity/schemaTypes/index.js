import { movieSchema } from './movies'
import { userSchema } from './user'

export const schema = {
  types: [movieSchema, userSchema],
}
