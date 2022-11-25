import { ClientEntity } from '@/domain/entities'
import { ClientServiceContract } from '@/services/contract/client-contract'
import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { ClientUseCaseContract } from './contract'
import { ClientCreateUseCaseError } from './error'
import { ClientModel } from './model'

export class ClientUseCase implements ClientUseCaseContract {
  constructor(private readonly clientService: ClientServiceContract) {}

  async create (data: ClientEntity): Promise<Either<ClientCreateUseCaseError | ClientCreateServiceError, ClientModel>> {
    if(!data.legalAge()) return left(new ClientCreateUseCaseError('Under the age'))
    
    const result = await this.clientService.create(data)

    if(result.isLeft()) return left(result.value)

    return right(result.value as any)
  }

  async load(): Promise<Either<ClientLoadServiceError, ClientModel[]>> {
    const result = await this.clientService.load()

    if(result.isLeft()) return left(result.value)

    return right(result.value as any)
  }

}