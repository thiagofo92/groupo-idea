import { ClientEntity } from '@/domain/entities'
import { ClientServiceContract } from '@/services/contract/client-contract'
import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { ClientUseCaseContract } from './contract'
import { ClientCreateUseCaseError } from './error'
import { ClientCreateModel, ClientCreateResponseModel } from './model'

export class ClientUseCase implements ClientUseCaseContract {
  constructor(private readonly clientService: ClientServiceContract) {}

  async create (data: ClientCreateModel): 
  Promise<Either<ClientCreateUseCaseError | ClientCreateServiceError, ClientCreateResponseModel>> {

    const client = new ClientEntity({
      name: data.nome,
      cpf: data.cpf,
      birthday: data.dtNascimento
    })

    if(!client.legalAge()) return left(new ClientCreateUseCaseError('Under the age'))
    
    const result = await this.clientService.create(client)

    if(result.isLeft()) return left(result.value)

    return right(result.value as any)
  }

  async load(): Promise<Either<ClientLoadServiceError, ClientCreateResponseModel[]>> {
    const result = await this.clientService.load()

    if(result.isLeft()) return left(result.value)

    return right(result.value as any)
  }
}