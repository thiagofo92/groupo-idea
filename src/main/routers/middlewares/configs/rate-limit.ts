import RateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import { MIN } from '@/shared/util/time-ms'

const rateLimit: RateLimitRequestHandler = RateLimit({
  windowMs: MIN * 1,
  max: 50,
  headers: true
})

export { rateLimit }
