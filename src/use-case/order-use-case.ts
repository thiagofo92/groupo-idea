import { OrderEntity } from '@/domain/entities'
import { ClientServiceContract, OrderServiceContract, ProductServiceContract } from '@/services/contract'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { Either, left, right } from '@/shared/errors/Either'
import { OrderUseCaseContract } from './contract/order-contract'
import { OrderUseCaseClientNotFoundError, OrderUseCaseProductNotFoundError } from './error/order-error'
import { OrderCreateModel, OrderCreateResponseModel } from './model/order-model'

export class OrderUseCase implements OrderUseCaseContract {
  constructor(
    private readonly orderService: OrderServiceContract,
    private readonly clientService: ClientServiceContract,
    private readonly productService: ProductServiceContract
  ) {}

  async create (data: OrderCreateModel): Promise<Either<OrderCreateServiceError, OrderCreateResponseModel>> {
    const total = new Intl.NumberFormat('en-US', { style: 'decimal' })
      .format(data.purchasesPrice * data.purchasesCount)

    const validClientAndProduct = await this.validTheClientIdAndProductId(data.idClient, data.idProduct)

    if(validClientAndProduct.isLeft()) return left(validClientAndProduct.value) 

    const orderEntity: OrderEntity = {
      idClient: data.idClient,
      idProduct: data.idProduct,
      purchasesPrice: data.purchasesPrice,
      purchasesCount: data.purchasesCount,
      purchasesTotalPrice: parseFloat(total)
    }
    
    const createdOrder = await this.orderService.create(orderEntity)
    if(createdOrder.isRight()) return right(createdOrder.value)

    return left(createdOrder.value)
  }

  async load (): Promise<Either<OrderLoadServiceError, OrderCreateResponseModel[]>> {
    const OrderData = await this.orderService.load()

    if(OrderData.isRight()) return right(OrderData.value)

    return left(OrderData.value)
  }
  
  private async validTheClientIdAndProductId(idClient: number, idProduct: number): Promise<Either<Error, boolean>> {
    const existClient = await this.verifyIfClientExist(idClient)

    if(existClient instanceof Error) return left(existClient)

    if(!existClient) return left(new OrderUseCaseClientNotFoundError())

    const existProduct = await this.verifyIfProductExist(idProduct)

    if(existProduct instanceof Error) return left(existProduct)

    if(!existProduct) return left(new OrderUseCaseProductNotFoundError())

    return right(true)
  } 

  private async verifyIfClientExist(id: number) {
    const client = await this.clientService.loadById(id)

    if(client.isRight()) return client.value ? true: false

    return client.value
  }

  private async verifyIfProductExist(id: number) {
    const product = await this.productService.loadById(id)

    if(product.isRight()) return product.value ? true: false

    return product.value
  }
}