export class ProductCreateServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProductCreateServiceError'
  }
}

export class ProductLoadServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProductLoadServiceError'
  }
}