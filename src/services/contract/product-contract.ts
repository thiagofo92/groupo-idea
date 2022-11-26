import { ProductEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { ProductModel } from '@/use-case/model'
import { ProductCreateServiceError, ProductLoadServiceError } from '../error'

export interface ProductServiceContract {
  create: (data: ProductEntity) => Promise<Either<ProductCreateServiceError, ProductModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProductModel[]>>
}