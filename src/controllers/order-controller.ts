import { RequestContract } from '@/main/contracts/http-contract'
import { OrderUseCaseContract } from '@/use-case/contract'
import { HttpResponse } from './contracts/http-responde'
import { success, successToCreate } from './helpers/http-respnse'
import { OrderModel } from './models'

export class OrderController {
  constructor(private clientUseCase: OrderUseCaseContract) {}

  async create({ body }: RequestContract<OrderModel>): Promise<HttpResponse> {
    const createdOrder = await this.clientUseCase.create(body)
    return successToCreate(createdOrder)
  }

  async load(): Promise<HttpResponse> {
    const loadOrder = await this.clientUseCase.load()
    return success(loadOrder)
  }
}