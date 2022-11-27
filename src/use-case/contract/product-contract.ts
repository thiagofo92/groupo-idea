import { Either } from '@/shared/errors/Either'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { ProductEntity } from '@/domain/entities'
import { ProducCreatetModel, ProducResponseModel } from '../model'

export interface ProductUseCaseContract  {
  create: (data: ProducCreatetModel) => Promise<Either<ProductCreateServiceError, ProducResponseModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProducResponseModel[]>>
}