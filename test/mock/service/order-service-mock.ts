import { OrderEntity } from '@/domain/entities'
import { OrderServiceContract } from '@/services/contract'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { Either, right, left } from '@/shared/errors/Either'
import { OrderCreateResponseModel } from '@/use-case/model'
import { OrderView } from '@/views'

export class OrderServiceMock implements OrderServiceContract {
  private orderMock: OrderEntity[] = []
  async create(data: OrderEntity): Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>> {
    try {
      data.idTransaction = 1
      this.orderMock.push(data)
      const orderView = new OrderView()
      const resultView = orderView.fromEntity(data)
      return right(resultView)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>> {
    try {
      const orderView = new OrderView()
      const resultView = this.orderMock.map<OrderCreateResponseModel>(item => orderView.fromEntity(item))
      return right(resultView)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }
}