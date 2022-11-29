import { OrderEntity } from '@/domain/entities'
import { OrderServiceContract } from '@/services/contract'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { Either, right, left } from '@/shared/errors/Either'
import { OrderCreateResponseModel } from '@/use-case/model'
import { OrderView } from '@/views'
import { Prisma } from './db/prisma'

export class OrderService implements OrderServiceContract {
  async create(data: OrderEntity): Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>> {
    try {
      const orderCreated = await Prisma.order.create({
        data: {
          id_product: data.idProduct,
          id_client: data.idClient,
          purchases_price: data.purchasesPrice,
          purchases_total_price: data.purchasesTotalPrice,
          purchases_count: data.purchasesCount
        }
      })

      const formated: OrderCreateResponseModel = {
        idTransaction: orderCreated.id_transaction,
        purchasesPrice: parseFloat(orderCreated.purchases_price.toString()),
        purchasesCount: parseFloat(orderCreated.purchases_count.toString()),
        purchasesTotalPrice: parseFloat(orderCreated.purchases_total_price.toString()),
        createdAt: orderCreated.created_at
      }
      
      return right(formated)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>> {
    try {
      const loadedOrder = await Prisma.order.findMany()

      const formated = loadedOrder.map<OrderCreateResponseModel>(item => ({
        idTransaction: item.id_transaction,
        purchasesPrice: parseFloat(item.purchases_price.toString()),
        purchasesCount: parseFloat(item.purchases_count.toString()),
        purchasesTotalPrice: parseFloat(item.purchases_total_price.toString()),
        createdAt: item.created_at
      }))

      return right(formated)
    } catch (error: any) {
      return left(new OrderCreateServiceError(error.message))
    }
  }
}