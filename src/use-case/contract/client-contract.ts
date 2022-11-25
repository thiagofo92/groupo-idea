import { ClientEntity } from '@/domain/entities'
import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { Either } from '@/shared/errors/Either'
import { ClientCreateUseCaseError } from '../error'
import { ClientModel } from '../model'
import { BaseUseCaseContract } from './base-contract'

export interface ClientUseCaseContract extends BaseUseCaseContract <ClientEntity, ClientModel> {
  create: (data: ClientEntity) => Promise<Either<ClientCreateUseCaseError | ClientCreateServiceError, ClientModel>>
  load: () => Promise<Either<ClientLoadServiceError, ClientModel[]>>
}