import { Either } from '@/shared/errors/Either'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { ProductEntity } from '@/domain/entities'
import { ProducCreatetModel, ProductCreateResponseModel } from '../model'

export interface ProductUseCaseContract  {
  create: (data: ProducCreatetModel) => Promise<Either<ProductCreateServiceError, ProductCreateResponseModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProductCreateResponseModel[]>>
}