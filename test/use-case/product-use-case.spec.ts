import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { left } from '@/shared/errors/Either'
import { ProductUseCase } from '@/use-case'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { ProductServiceMock } from '../mock/service'
import { ProductModel } from './model/product-model'

function factoryClienUseCase() {
  const productService = new ProductServiceMock()
  const sut = new ProductUseCase(productService)
  const productMock: ProductModel = {
    name: faker.commerce.product(),
    active: true,
  }

  return { sut, productService, productMock }
}

describe('# Use case create a product', () => {
  test('# Create a product', async () => {
    const { sut, productMock } = factoryClienUseCase()

    const result = await sut.create(productMock)
    
    if(result.isLeft()) throw result.value

    const { value } = result
    expect(value.idProduct).not.toBeUndefined()
    expect(value.name).toStrictEqual(productMock.name)
  })

  test('Fail to create the product', async () => {
    const { sut, productService, productMock } = factoryClienUseCase()
  
    vi.spyOn(productService, 'create').mockResolvedValueOnce(left(new ProductCreateServiceError('Test mock service')))

    const result = await sut.create(productMock)

    expect(result.value).instanceOf(ProductCreateServiceError)
  })

  test('# Load a product', async () => {
    const { sut, productMock } = factoryClienUseCase()

    const createdClient = await sut.create(productMock)
    if(createdClient.isLeft()) throw createdClient.value

    const loadClient = await sut.load()

    if(loadClient.isLeft()) throw loadClient.value

    const { value } = loadClient

    expect(value.length).toBeGreaterThan(0)
  })

  test('Fail to load the product', async () => {
    const { sut, productService } = factoryClienUseCase()
    vi.spyOn(productService, 'load').mockResolvedValueOnce(left(new ProductLoadServiceError('Test mock service')))
    const loadClient = await sut.load()
    expect(loadClient.value).instanceOf(ProductLoadServiceError)
  })
})