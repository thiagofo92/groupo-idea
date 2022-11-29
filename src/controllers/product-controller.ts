import { RequestContract } from '@/main/contracts/http-contract'
import { ProductUseCaseContract } from '@/use-case/contract'
import { HttpResponse } from './contracts/http-responde'
import { success, successToCreate } from './helpers/http-respnse'
import { ProductModel } from './models'

export class ProductController {
  constructor(private clientUseCase: ProductUseCaseContract) {}

  async create({ body }: RequestContract<ProductModel>): Promise<HttpResponse> {
    const createdProduct = await this.clientUseCase.create(body)
    return successToCreate(createdProduct)
  }

  async load(): Promise<HttpResponse> {
    const loadProduct = await this.clientUseCase.load()
    return success(loadProduct)
  }
}