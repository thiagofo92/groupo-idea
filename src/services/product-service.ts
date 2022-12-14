import { ProductEntity } from '@/domain/entities'
import { Either, left, right } from '@/shared/errors/Either'
import { ProductServiceContract } from './contract'
import { ProductCreateServiceError, ProductLoadServiceError } from './error'
import { Prisma } from './db/prisma'
import { ProductCreateResponseModel } from '@/use-case/model'
export class ProductService implements ProductServiceContract {
  private readonly productEntity: ProductEntity [] = []
  async create (data: ProductEntity): Promise<Either<ProductCreateServiceError, ProductCreateResponseModel>> {
    try {
      const createdProduct = await Prisma.product.create({
        data: {
          name: data.name,
          active: data.active
        }
      })
      const formated: ProductCreateResponseModel = {
        idProduct: createdProduct.id,
        name: createdProduct.name,
        active: createdProduct.active
      }

      return right(formated) 
    } catch (error: any) {
      return left(new ProductCreateServiceError(error.message))
    }
  }

  async load (): Promise<Either<ProductLoadServiceError, ProductCreateResponseModel[]>> {
    try {
      const loadProduct = await Prisma.product.findMany()

      const formated = loadProduct.map<ProductCreateResponseModel>(item => ({
        idProduct: item.id,
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
      const loadProduct = await Prisma.product.findUnique({
        where: {
          id
        }
      })

      if(!loadProduct) return right(null) 

      const formated = {
        idProduct: loadProduct.id,
        name: loadProduct.name,
        active: loadProduct.active
      }

      return right(formated)
    } catch (error: any) {
      return left(new ProductLoadServiceError(error.message))
    }
  }
}