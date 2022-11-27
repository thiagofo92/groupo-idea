import { OrderEntity } from '@/domain/entities'
import { OrderServiceContract } from '@/services/contract/order-contract'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { Either, right, left } from '@/shared/errors/Either'
import { OrderResponseModel } from '@/use-case/model'
import { OrderViews } from '@/views'

export class orderServiceMock implements OrderServiceContract {
  private orderMock: OrderEntity[] = []
  async create(data: OrderCreateResponseModel): Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>> {
    try {
      data.idorder = 1
      this.orderMock.push(data)
      const orderView = new orderViews()
      const resultView = orderView.fromEntity(data)
      return right(resultView)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>> {
    try {
      const orderView = new orderViews()
      const resultView = this.orderMock.map<OrderCreateResponseModel>(item => orderView.fromEntity(item))
      return right(resultView)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }
}