export interface Order {
  idTransaction: number
  idClient: number
  idProduct: number
  purchasesPrice: number
  purchasesCount: number
  purchasesLimit: number
  createdAt: Date
}