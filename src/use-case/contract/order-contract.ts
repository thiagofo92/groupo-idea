import { OrderCreateServiceError } from '@/services/error/order-error'
import { Either } from '@/shared/errors/Either'
import { OrderCreateModel, OrderCreateResponseModel } from '../model'

export interface OrderUseCaseContract {
  create: (data: OrderCreateModel) => Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>>
  load: () => Promise<Either<OrderCreateServiceError, OrderCreateResponseModel[]>>
}