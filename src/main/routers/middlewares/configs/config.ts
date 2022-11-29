import { helmet, rateLimit } from './index'

export const configMiddleware = [
  helmet,
  rateLimit
]