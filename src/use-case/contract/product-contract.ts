import { Either } from '@/shared/errors/Either'
import { ProductCreateServiceError, ProductLoadServiceError} from '@/services/error'
import { ProductModel } from '../model/product-model'

export interface ProductUseCaseContract  {
  create: () => Promise<Either<ProductCreateServiceError, ProductModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProductModel[]>>
}