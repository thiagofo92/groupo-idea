import { OrderCreateServiceError } from '@/services/error/order-product'
import { Either } from '@/shared/errors/Either'
import { OrderCreateModel, OrderResponseModel } from '../model'

export interface OrderUseCaseContract {
  create: (data: OrderCreateModel) => Promise<Either<OrderCreateServiceError, OrderCreateModel>>
  load: () => Promise<Either<OrderCreateServiceError, OrderResponseModel>>
}