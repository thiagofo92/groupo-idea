import { RequestContract } from '@/main/contracts/http-contract'
import { ClientCreateServiceError } from '@/services/error'
import { ClientUseCaseContract } from '@/use-case/contract'
import { ClientCreateUseCaseError } from '@/use-case/error'
import { HttpResponse } from './contracts/http-responde'
import { badRequest, internalError, success, successToCreate } from './helpers/http-respnse'
import { ClientModel } from './models'

export class ClientController {
  constructor(private clientUseCase: ClientUseCaseContract) {
    this.create = this.create.bind(this)
    this.load = this.load.bind(this)
  }

  async create({ body }: RequestContract<ClientModel>): Promise<HttpResponse> {
    const createdClient = await this.clientUseCase.create(body)
    
    if(createdClient.isRight()) return successToCreate(createdClient.value)

    if(createdClient.value instanceof ClientCreateUseCaseError) return badRequest('Invalid age')

    if(createdClient.value instanceof ClientCreateServiceError) return internalError(createdClient.value)

    return internalError('Internal error')
  }

  async load(): Promise<HttpResponse> {
    const loadClient = await this.clientUseCase.load()
    if(loadClient.isRight()) return success(loadClient.value)

    return internalError(loadClient.value)
  }
}