export interface OrderEntity {
  idTransaction?: number
  idClient: number
  idProduct: number
  purchasesPrice: number
  purchasesCount: number
  purchasesLimit: number
  createdAt: Date
}