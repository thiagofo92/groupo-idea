import { Router } from 'express'

export class Routers {
  constructor(private readonly router: Router) {}

  private client(): void {
    this.router.post('/client/create', )
    this.router.get('/client/load', )
  }
}