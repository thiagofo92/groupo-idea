import { OrderEntity } from '@/domain/entities'
import { OrderCreateResponseModel } from '@/use-case/model'

export class OrderView {
  fromEntity(data: OrderEntity): OrderCreateResponseModel {
    return {
      idTransaction: data.idTransaction!,
      purchasesPrice: data.purchasesPrice,
      purchasesCount: data.purchasesCount,
      purchasesTotalPrice: data.purchasesTotalPrice,
      createdAt: data.createdAt
    }
  }
}