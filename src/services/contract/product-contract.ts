import { Either } from '@/shared/errors/Either'
import { ProductCreateServiceError, ProductLoadServiceError } from '../error'

export interface ProductServiceContract {
  create: () => Promise<Either<ProductCreateServiceError, any>>
  load: () => Promise<Either<ProductLoadServiceError, any>>
}