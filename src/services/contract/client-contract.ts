import { ClientEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { ClientModel } from '@/use-case/model'
import { ClientCreateServiceError, ClientLoadServiceError } from '../error'

export interface ClientServiceContract {
  create: (data: ClientEntity) => Promise<Either<ClientCreateServiceError, ClientModel>> 
  load: () => Promise<Either<ClientLoadServiceError, ClientModel[]>>
}