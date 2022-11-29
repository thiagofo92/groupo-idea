import { RequestContract } from '@/main/contracts/http-contract'
import { OrderUseCaseContract } from '@/use-case/contract'
import { OrderUseCaseClientNotFoundError, OrderUseCaseProductNotFoundError } from '@/use-case/error/order-error'
import { HttpResponse } from './contracts/http-responde'
import { badRequest, internalError, success, successToCreate } from './helpers/http-respnse'
import { OrderModel } from './models'

export class OrderController {
  constructor(private clientUseCase: OrderUseCaseContract) {
    this.create = this.create.bind(this)
    this.load = this.load.bind(this)
  }

  async create({ body }: RequestContract<OrderModel>): Promise<HttpResponse> {
    const createdOrder = await this.clientUseCase.create(body)

    if(createdOrder.isRight()) return successToCreate(createdOrder)

    if(createdOrder.value instanceof OrderUseCaseClientNotFoundError) return badRequest('Client ID not found')

    if(createdOrder.value instanceof OrderUseCaseProductNotFoundError) return badRequest('Product ID not found')

    
    return internalError(createdOrder.value)
  }

  async load(): Promise<HttpResponse> {
    const loadOrder = await this.clientUseCase.load()
    return success(loadOrder.value)
  }
}