import { RequestContract } from '@/main/contracts/http-contract'
import { ClientUseCaseContract } from '@/use-case/contract'
import { HttpResponse } from './contracts/http-responde'
import { success, successToCreate } from './helpers/http-respnse'
import { ClientModel } from './models'

export class ClientController {
  constructor(private clientUseCase: ClientUseCaseContract) {}

  async create({ body }: RequestContract<ClientModel>): Promise<HttpResponse> {
    const createdClient = await this.clientUseCase.create(body)
    return successToCreate(createdClient)
  }

  async load(): Promise<HttpResponse> {
    const loadClient = await this.clientUseCase.load()
    return success(loadClient)
  }
}