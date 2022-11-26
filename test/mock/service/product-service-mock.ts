import { ProductEntity } from '@/domain/entities'
import { ProductServiceContract } from '@/services/contract'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'

export class ProductServiceMock implements ProductServiceContract {
  private readonly productEntity: ProductEntity [] = []
  async create (data: ProductEntity): Promise<Either<ProductCreateServiceError, ProductEntity>> {
    try {
      data.idProduct = 1
      this.productEntity.push(data)
      return right(data) 
    } catch (error: any) {
      return left(new ProductCreateServiceError(error.message))
    }
  }

  async load (): Promise<Either<ProductLoadServiceError, ProductEntity[]>> {
    try {
      return right(this.productEntity)    
    } catch (error: any) {
      return left(new ProductLoadServiceError(error.message))
    }
  }
  
}