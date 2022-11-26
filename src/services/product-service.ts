import { ProductEntity } from '@/domain/entities'
import { Either, left, right } from '@/shared/errors/Either'
import { ProductServiceContract } from './contract'
import { ProductCreateServiceError, ProductLoadServiceError } from './error'

export class ProductService implements ProductServiceContract {
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