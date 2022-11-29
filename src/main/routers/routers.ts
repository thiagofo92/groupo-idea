import { Router } from 'express'
import { ExpressAdapter } from '../adapter/express-adapter'
import { clientControllerFactory, orderControllerFactory, productControllerFactory } from './factory'
import { clientCreateMiddleware, orderCreateMiddleware, productCreateMiddleware } from './middlewares'

export class Routers {
  constructor(private readonly router: Router) {}

  private client(): void {
    const controller = clientControllerFactory()
    this.router.post('/client/create', clientCreateMiddleware, ExpressAdapter(controller.create))
    this.router.get('/client/load', ExpressAdapter(controller.load))
  }

  private product(): void {
    const controller = productControllerFactory()
    this.router.post('/product/create', productCreateMiddleware, ExpressAdapter(controller.create))
    this.router.get('/product/load', ExpressAdapter(controller.load))
  }

  private order(): void {
    const controller = orderControllerFactory()
    this.router.post('/order/create', orderCreateMiddleware, ExpressAdapter(controller.create))
    this.router.get('/order/load', ExpressAdapter(controller.load))
  }

  factory(): Router {
    this.client()
    this.product()
    this.order()
    return this.router
  }
}