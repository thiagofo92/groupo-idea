import { OrderEntity } from '@/domain/entities'
import { OrderServiceContract } from '@/services/contract'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { OrderUseCaseContract } from './contract/order-contract'
import { OrderCreateModel, OrderCreateResponseModel } from './model/order-model'

export class OrderUseCase implements OrderUseCaseContract {
  constructor(private readonly OrderService: OrderServiceContract) {}
  async create (data: OrderCreateModel): Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>> {
    const total = new Intl.NumberFormat('en-US', { style: 'decimal' })
      .format(data.purchasesPrice * data.purchasesCount)

    const orderEntity: OrderEntity = {
      idClient: data.idClient,
      idProduct: data.idProduct,
      purchasesPrice: data.purchasesPrice,
      purchasesCount: data.purchasesCount,
      purchasesTotalPrice: parseFloat(total)
    }
    
    const createdOrder = await this.OrderService.create(orderEntity)
    if(createdOrder.isRight()) return right(createdOrder.value)

    return left(createdOrder.value)
  }

  async load (): Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>> {
    const OrderData = await this.OrderService.load()

    if(OrderData.isRight()) return right(OrderData.value)

    return left(OrderData.value)
  }
}