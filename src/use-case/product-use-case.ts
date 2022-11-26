import { ProductEntity } from '@/domain/entities/product-entity'
import { ProductServiceContract } from '@/services/contract'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { ProductUseCaseContract } from './contract/product-contract'
import { ProductModel } from './model/product-model'

export class ProductUseCase implements ProductUseCaseContract {
  constructor(private readonly productService: ProductServiceContract) {}
  async create (data: ProductModel): Promise<Either<ProductCreateServiceError, ProductEntity>> {
    const createdProduct = await this.productService.create(data)
    if(createdProduct.isRight()) return right(createdProduct.value)

    return left(createdProduct.value)
  }

  async load (): Promise<Either<ProductLoadServiceError, ProductEntity[]>> {
    const productData = await this.productService.load()

    if(productData.isRight()) return right(productData.value)

    return left(productData.value)
  }
}