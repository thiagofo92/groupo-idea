import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { left } from '@/shared/errors/Either'
import { OrderUseCase } from '@/use-case'
import { OrderCreateServiceError, OrderLoadServiceError } from '@/services/error'
import { OrderServiceMock } from '../mock/service'
import { OrderModel } from './model'

function factoryClienUseCase() {
  const orderService = new OrderServiceMock()
  const sut = new OrderUseCase(orderService)
  const ordertMock: OrderModel = {
    name: faker.commerce.product(),
    active: true,
  }

  return { sut, orderService, ordertMock }
}

describe('# Use case create a order', () => {
  test('# Create a order', async () => {
    const { sut, ordertMock } = factoryClienUseCase()

    const result = await sut.create(ordertMock)
    
    if(result.isLeft()) throw result.value

    const { value } = result
    expect(value.idProduct).not.toBeUndefined()
    expect(value.name).toStrictEqual(productMock.name)
  })

  // test('Fail to create the order', async () => {
  //   const { sut, orderService, ordertMock } = factoryClienUseCase()
  
  //   vi.spyOn(orderService, 'create').mockResolvedValueOnce(left(new OrderCreateServiceError('Test mock service')))

  //   const result = await sut.create(ordertMock)

  //   expect(result.value).instanceOf(OrderCreateServiceError)
  // })

  // test('# Load a order', async () => {
  //   const { sut, ordertMock } = factoryClienUseCase()

  //   const createdClient = await sut.create(ordertMock)
  //   if(createdClient.isLeft()) throw createdClient.value

  //   const loadClient = await sut.load()

  //   if(loadClient.isLeft()) throw loadClient.value

  //   const { value } = loadClient

  //   expect(value.length).toBeGreaterThan(0)
  // })

  // test('Fail to load the order', async () => {
  //   const { sut, orderService } = factoryClienUseCase()
  //   vi.spyOn(orderService, 'load').mockResolvedValueOnce(left(new OrderLoadServiceError('Test mock service')))
  //   const loadClient = await sut.load()
  //   expect(loadClient.value).instanceOf(OrderLoadServiceError)
  // })
})