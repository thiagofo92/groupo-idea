import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { left } from '@/shared/errors/Either'
import { OrderUseCase } from '@/use-case'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { ClientServiceMock, OrderServiceMock, ProductServiceMock } from '../mock/service'
import { OrderCreateModel } from './model'
import { OrderUseCaseClientNotFoundError, OrderUseCaseProductNotFoundError } from '@/use-case/error/order-error'

function factoryClienUseCase() {
  const orderService = new OrderServiceMock()
  const clientService = new ClientServiceMock()
  const productService = new ProductServiceMock()
  const sut = new OrderUseCase(orderService, clientService, productService)

  const ordertMock: OrderCreateModel = {
    idClient: 1,
    idProduct: 1,
    purchasesPrice: 79.98,
    purchasesCount: faker.datatype.number({ min: 1, max: 5 }),
  }

  return { sut, orderService, ordertMock }
}

describe('# Use case create a order', () => {
  test('# Create a order', async () => {
    const { sut, ordertMock } = factoryClienUseCase()
    const total = new Intl.NumberFormat('en-US', { style: 'decimal' })
      .format(ordertMock.purchasesPrice * ordertMock.purchasesCount)

    const result = await sut.create(ordertMock)
    
    if(result.isLeft()) throw result.value

    const { value } = result
    
    expect(value.purchasesTotalPrice).toStrictEqual(parseFloat(total))
    expect(value.idTransaction).not.toBeUndefined()
  })

  test('Fail to create the order', async () => {
    const { sut, orderService, ordertMock } = factoryClienUseCase()
  
    vi.spyOn(orderService, 'create').mockResolvedValueOnce(left(new OrderCreateServiceError('Test mock service')))

    const result = await sut.create(ordertMock)

    expect(result.value).instanceOf(OrderCreateServiceError)
  })

  test('# Load a order', async () => {
    const { sut, ordertMock } = factoryClienUseCase()

    const createdClient = await sut.create(ordertMock)
    if(createdClient.isLeft()) throw createdClient.value

    const loadClient = await sut.load()

    if(loadClient.isLeft()) throw loadClient.value

    const { value } = loadClient

    expect(value.length).toBeGreaterThan(0)
  })

  test('Fail to load the order', async () => {
    const { sut, orderService } = factoryClienUseCase()
    vi.spyOn(orderService, 'load').mockResolvedValueOnce(left(new OrderLoadServiceError('Test mock service')))
    const loadClient = await sut.load()
    expect(loadClient.value).instanceOf(OrderLoadServiceError)
  })

  test('Fail to create the order, because the client not exist in DB', async () => {
    const { sut, ordertMock } = factoryClienUseCase()
    const mock = Object.create(ordertMock)
    mock.idClient = 2

    const loadClient = await sut.create(mock)
    expect(loadClient.value).instanceOf(OrderUseCaseClientNotFoundError)
  })

  test('Fail to create the order, because the product not exist in DB', async () => {
    const { sut, ordertMock } = factoryClienUseCase()
    const mock = Object.create(ordertMock)
    mock.idProduct = 2

    const createdOrder = await sut.create(mock)
    expect(createdOrder.value).instanceOf(OrderUseCaseProductNotFoundError)
  })
})