import { describe, test, expect, beforeEach, vi } from 'vitest'
import { ProductService } from '@/services/product-service'
import { ProductEntity } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { ProductCreateServiceError } from '@/services/error'

describe('# Service product test', () => {

  test('Create product in MySQL', async () => {
    const productService = new ProductService()
    const productEntity: ProductEntity = {
      name: faker.name.fullName(),
      active: true
    }

    const productCreated = await productService.create(productEntity)

    if(productCreated.isLeft()) throw productCreated.value
    
    expect(productCreated.value.idProduct).not.toBeUndefined()
  })

  test('Error to create product in MySQL', async () => {
    const productService = new ProductService()
    const productCreated = await productService.create(null as any)

    expect(productCreated.value).toBeInstanceOf(ProductCreateServiceError)
  })

  test('Load product from MySQL', async () => {
    const productService = new ProductService()
    const productEntity: ProductEntity = {
      name: faker.name.fullName(),
      active: true
    }
    const productCreated = await productService.create(productEntity)

    if(productCreated.isLeft()) throw productCreated.value
    const productLoaded = await productService.load()

    if(productLoaded.isLeft()) throw productLoaded.value


    expect(productLoaded.value[0].idProduct).not.toBeUndefined()
    expect(productLoaded.value.length).toBeGreaterThan(0)
  })

  test('Load product from MySQL', async () => {
    const productService = new ProductService()
    const productEntity: ProductEntity = {
      name: faker.name.fullName(),
      active: true
    }
    const productCreated = await productService.create(productEntity)

    if(productCreated.isLeft()) throw productCreated.value
    const productLoaded = await productService.load()

    if(productLoaded.isLeft()) throw productLoaded.value


    expect(productLoaded.value[0].idProduct).not.toBeUndefined()
    expect(productLoaded.value.length).toBeGreaterThan(0)
  })

  test('Product not found in MySQL', async () => {
    const productService = new ProductService()
    const loadedProduct = await productService.loadById(0)

    expect(loadedProduct.value).toBeNull()
  })

  test.todo('Error to load product from MySQL')
})