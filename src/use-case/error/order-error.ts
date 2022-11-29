export class OrderUseCaseClientNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'OrderUseCaseClientNotFoundError'
  }
}

export class OrderUseCaseProductNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'OrderUseCaseProductNotFoundError'
  }
}