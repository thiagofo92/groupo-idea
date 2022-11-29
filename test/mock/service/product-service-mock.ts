import { ProductEntity } from '@/domain/entities'
import { ProductServiceContract } from '@/services/contract'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { ProductCreateResponseModel } from '@/use-case/model'

export class ProductServiceMock implements ProductServiceContract {
  private readonly productEntity: ProductEntity [] = [{
    idProduct: 1,
    name: 'Test - Product',
    active: true
  }]

  async create (data: ProductEntity): Promise<Either<ProductCreateServiceError, ProductCreateResponseModel>> {
    try {
      data.idProduct = this.productEntity.length + 1
      this.productEntity.push(data)

      const formated: ProductCreateResponseModel = {
        idProduct: data.idProduct,
        name: data.name,
        active: data.active
      }

      return right(formated) 
    } catch (error: any) {
      return left(new ProductCreateServiceError(error.message))
    }
  }

  async load (): Promise<Either<ProductLoadServiceError, ProductCreateResponseModel[]>> {
    try {

      const formated = this.productEntity.map<ProductCreateResponseModel>(item => ({
        idProduct: item.idProduct,
        name: item.name,
        active: item.active
      }))

      return right(formated)
    } catch (error: any) {
      return left(new ProductLoadServiceError(error.message))
    }
  }
  
  async loadById (id: number): Promise<Either<ProductLoadServiceError, ProductCreateResponseModel | null>> {
    try {
      const product = this.productEntity.find(item => item.idProduct === id)

      if(!product) return right(null)

      return right(product)
    } catch (error: any) {
      return left(new ProductLoadServiceError(error.message))
    }
  }
}