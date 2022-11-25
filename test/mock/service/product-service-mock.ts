import { ProductServiceContract } from '@/services/contract'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'

export class ProductServiceMock implements ProductServiceContract {
  async create (): Promise<Either<ProductCreateServiceError, any>> {
    try {
      return right({} as any) 
    } catch (error: any) {
      return left(new ProductCreateServiceError(error.message))
    }
  }

  async load (): Promise<Either<ProductLoadServiceError, any>> {
    try {
      return right({} as any)
    } catch (error: any) {
      return left(new ProductLoadServiceError(error.message))
    }
  }
  
}