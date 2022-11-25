import { ClientEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { ClientCreateUseCaseError } from '../error'
import { ClientModel } from '../model'
import { BaseUseCaseContract } from './base-contract'

export interface ClientUseCaseContract extends BaseUseCaseContract <ClientEntity, ClientModel> {
  create: (data: ClientEntity) => Promise<Either<ClientCreateUseCaseError, ClientModel>>
  load: () => Promise<Either<Error, []>>
}