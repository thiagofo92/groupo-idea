import { OrderEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { OrderCreateResponseModel } from '@/use-case/model'
import { OrderCreateServiceError, OrderLoadServiceError } from '../error'

export interface OrderServiceContract {
  create: (data: OrderEntity) => Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>>
  load: () => Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>>
}