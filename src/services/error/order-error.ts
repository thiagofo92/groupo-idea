export class OrderCreateServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderCreateServiceError'
  }
}

export class OrderLoadServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderLoadServiceError'
  }
}