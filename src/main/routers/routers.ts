import { Router } from 'express'
import { ExpressAdapter } from '../adapter/express-adapter'
import { clientControllerFactory } from './factory'
import { clientCreateMiddleware } from './middlewares'

export class Routers {
  constructor(private readonly router: Router) {}

  private client(): void {
    const controller = clientControllerFactory()
    this.router.post('/client/create', clientCreateMiddleware, ExpressAdapter(controller.create))
    this.router.get('/client/load', ExpressAdapter(controller.load))
  }

  factory(): Router {
    this.client()
    return this.router
  }
}