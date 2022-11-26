import { Either } from '@/shared/errors/Either'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { ProductEntity } from '@/domain/entities'
import { ProductModel } from '../model'

export interface ProductUseCaseContract  {
  create: (data: ProductEntity) => Promise<Either<ProductCreateServiceError, ProductModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProductModel[]>>
}