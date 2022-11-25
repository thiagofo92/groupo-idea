export class ClientCreateServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ClientCreateServiceError'
  }
}

export class ClientLoadServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ClientLoadServiceError'
  }
}