import { ClientEntity } from '@/domain/entities'
import { Either, left, right } from '@/shared/errors/Either'
import { ClientServiceContract } from './contract/client-contract'
import { ClientCreateServiceError, ClientLoadServiceError } from './error'

export class ClientService implements ClientServiceContract  {
  async create(): Promise<Either<ClientCreateServiceError, ClientEntity>> {
    try {
      const result: ClientEntity = {
        name: '',
        cpf: '',
        birthday: new Date(new Date().setFullYear(1992)),
        active: true,
        legalAge: function (): boolean {
          throw new Error('Function not implemented.')
        }
      }
      return right(result)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<ClientLoadServiceError, ClientEntity[]>> {
    try {
      const result: ClientEntity = {
        name: '',
        cpf: '',
        birthday: new Date(new Date().setFullYear(1992)),
        active: true,
        legalAge: function (): boolean {
          throw new Error('Function not implemented.')
        }
      }
      return right([result])
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }
}