import { ClientEntity } from '@/domain/entities'
import { Either, right } from '@/shared/errors/Either'
import { ClientUseCaseContract } from './contract'
import { ClientCreateUseCaseError } from './error'
import { ClientModel } from './model'

export class ClientUseCase implements ClientUseCaseContract {
  constructor(private readonly clientService: ClientService) {}

  async create (data: ClientEntity): Promise<Either<ClientCreateUseCaseError, ClientModel>> {
    const result = await this.clientService.create(data)
    return right(result)
  }

  async load(): Promise<Either<Error, any[]>> {
    return {} as any
  }

}