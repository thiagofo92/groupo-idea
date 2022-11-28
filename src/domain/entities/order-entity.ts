export interface OrderEntity {
  idTransaction?: number
  idClient: number
  idProduct: number
  purchasesPrice: number
  purchasesCount: number
  purchasesTotalPrice: number
  createdAt?: Date
}