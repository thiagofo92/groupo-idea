import { ProductEntity } from '@/domain/entities/product-entity'
import { ProductServiceContract } from '@/services/contract'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { ProductUseCaseContract } from './contract/product-contract'

export class ProductUseCase implements ProductUseCaseContract {
  constructor(private readonly productService: ProductServiceContract) {}
  async create (): Promise<Either<ProductCreateServiceError, ProductEntity>> {
    const result = await this.productService.create()
    return right({} as any) 
  }

  async load (): Promise<Either<ProductLoadServiceError, ProductEntity[]>> {
    return right({} as any)
  }
}