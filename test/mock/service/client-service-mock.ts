import { ClientEntity } from '@/domain/entities'
import { ClientServiceContract } from '@/services/contract/client-contract'
import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { Either, right, left } from '@/shared/errors/Either'
import { ClientModel } from '@/use-case/model'
import { ClientViews } from '@/views'
import { faker } from '@faker-js/faker'

export class ClientServiceMock implements ClientServiceContract {
  private clientMock: ClientEntity[] = []
  async create(data: ClientEntity): Promise<Either<ClientCreateServiceError, ClientModel>> {
    try {
      data.idClient = 1
      this.clientMock.push(data)
      const clientView = new ClientViews()
      const resultView = clientView.fromEntity(data)
      return right(resultView)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<ClientLoadServiceError, ClientModel[]>> {
    try {
      const clientView = new ClientViews()
      const resultView = this.clientMock.map<ClientModel>(item => clientView.fromEntity(item))
      return right(resultView)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }
}