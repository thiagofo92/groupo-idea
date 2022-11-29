import { describe, test, expect, beforeEach, vi } from 'vitest'
import { OrderService, ClientService, ProductService } from '@/services'
import { ClientEntity, OrderEntity, ProductEntity } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { OrderCreateServiceError } from '@/services/error'
import { ClientCreateResponseModel, ProductCreateResponseModel } from '@/use-case/model'


describe('# Service order test', () => {

  test('Create order in MySQL', async () => {
    const orderService = new OrderService()
    const clientService = new ClientService()
    const productService = new ProductService()

    const clientEntity = new ClientEntity({
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age'}),
      cpf: '111111111'
    })
    
    const productEntity: ProductEntity = {
      name: faker.name.fullName(),
      active: true
    }

    const clientCreated = await clientService.create(clientEntity)
    const productCreated = await productService.create(productEntity)
    const { idCliente } = clientCreated.value as ClientCreateResponseModel
    const { idProduct } = productCreated.value as ProductCreateResponseModel

    const orderEntity: OrderEntity = {
      idClient: idCliente,
      idProduct: idProduct!,
      purchasesPrice: parseFloat(faker.commerce.price()),
      purchasesCount: faker.datatype.number({ min: 1, max: 5}),
      purchasesTotalPrice: 0
    }

    const orderCreated = await orderService.create(orderEntity)

    if(orderCreated.isLeft()) throw orderCreated.value
    
    expect(orderCreated.value.idTransaction).not.toBeUndefined()
  })

  test('Error to create order in MySQL', async () => {
    const orderService = new OrderService()
    const orderCreated = await orderService.create(null as any)

    expect(orderCreated.value).toBeInstanceOf(OrderCreateServiceError)
  })

  test('Load order from MySQL', async () => {
    const orderService = new OrderService()
    const clientService = new ClientService()
    const productService = new ProductService()

    const clientEntity = new ClientEntity({
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age'}),
      cpf: '111111111'
    })
    
    const productEntity: ProductEntity = {
      name: faker.name.fullName(),
      active: true
    }

    const clientCreated = await clientService.create(clientEntity)
    const productCreated = await productService.create(productEntity)
    const { idCliente } = clientCreated.value as ClientCreateResponseModel
    const { idProduct } = productCreated.value as ProductCreateResponseModel

    const orderEntity: OrderEntity = {
      idClient: idCliente,
      idProduct: idProduct!,
      purchasesPrice: parseFloat(faker.commerce.price()),
      purchasesCount: faker.datatype.number({ min: 1, max: 5}),
      purchasesTotalPrice: 0
    }

    const orderCreated = await orderService.create(orderEntity)

    if(orderCreated.isLeft()) throw orderCreated.value
    const orderLoaded = await orderService.load()

    if(orderLoaded.isLeft()) throw orderLoaded.value


    expect(orderLoaded.value[0].idTransaction).not.toBeUndefined()
    expect(orderLoaded.value.length).toBeGreaterThan(0)
  })

  test.todo('Error to load order from MySQL')
})