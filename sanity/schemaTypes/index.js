import { movieSchema } from './movies'
import { userSchema } from './user'
import { reviewSchema } from './review'

export const schema = {
  types: [movieSchema, userSchema, reviewSchema],
}
