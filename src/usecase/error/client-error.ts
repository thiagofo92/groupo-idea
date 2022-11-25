export class ClientCreateUseCaseError extends Error {
  constructor(message: string ) {
    super(message)
    this.name = 'ClientCreateUseCaseError'
  }
}