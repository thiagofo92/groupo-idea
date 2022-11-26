import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { Either } from '@/shared/errors/Either'
import { ClientCreateUseCaseError } from '../error'
import { ClientCreateModel, ClientCreateResponseModel } from '../model'

export interface ClientUseCaseContract {
  create: (data: ClientCreateModel) => Promise<Either<ClientCreateUseCaseError | ClientCreateServiceError, ClientCreateResponseModel>>
  load: () => Promise<Either<ClientLoadServiceError, ClientCreateResponseModel[]>>
}