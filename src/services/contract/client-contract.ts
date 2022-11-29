import { ClientEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { ClientCreateResponseModel } from '@/use-case/model'
import { ClientCreateServiceError, ClientLoadServiceError } from '../error'

export interface ClientServiceContract {
  create: (data: ClientEntity) => Promise<Either<ClientCreateServiceError, ClientCreateResponseModel>> 
  load: () => Promise<Either<ClientLoadServiceError, ClientCreateResponseModel[]>>
  loadById: (id: number) => Promise<Either<ClientLoadServiceError, ClientCreateResponseModel | null>>
}