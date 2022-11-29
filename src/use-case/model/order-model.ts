export type OrderCreateModel = {
  idClient: number
  idProduct: number
  purchasesPrice: number
  purchasesCount: number
}
export type OrderCreateResponseModel = {
  idTransaction: number,
  purchasesPrice: number
  purchasesCount: number
  purchasesTotalPrice: number
  createdAt: Date
}