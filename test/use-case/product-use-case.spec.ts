import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { left } from '@/shared/errors/Either'
import { ProductEntity } from '@/domain/entities'
import { ProductUseCase } from '@/use-case'
import { ProductCreateServiceError, ProductLoadServiceError } from '@/services/error'
import { ProductServiceMock } from '../mock/service'


function factoryClienUseCase() {
  const productService = new ProductServiceMock()
  const sut = new ProductUseCase(productService)
  return { sut, productService }
}

describe('# Use case create a product', () => {
  test('# Create a product', async () => {
    const { sut } = factoryClienUseCase()
    const clientMock = {
      nome: faker.name.fullName(),
      dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
      cpf: '11122233344',
      ativo: true
    }
    const client = new ClientEntity(clientMock)
    const result = await sut.create(client)
    
    if(result.isLeft()) throw result.value

    const { value } = result

    expect(value.idClient).not.toBeUndefined()
    expect(value.nome).toStrictEqual(client.name)
  })

  // test('Fail to create the product', async () => {
  //   const { sut, productService } = factoryClienUseCase()
  //   const clientMock = {
  //     nome: faker.name.fullName(),
  //     dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
  //     cpf: '11122233344',
  //     ativo: true
  //   }
  //   vi.spyOn(productService, 'create').mockResolvedValueOnce(left(new ClientCreateServiceError('Test mock service')))
  //   const client = new ClientEntity(clientMock)
  //   const result = await sut.create(client)

  //   expect(result.value).instanceOf(ClientCreateServiceError)
  // })


  // test('# Load a product', async () => {
  //   const { sut } = factoryClienUseCase()
  //   const clientMock = {
  //     nome: faker.name.fullName(),
  //     dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
  //     cpf: '11122233344',
  //     ativo: true
  //   }
  //   const client = new ClientEntity(clientMock)
  //   const createdClient = await sut.create(client)
  //   if(createdClient.isLeft()) throw createdClient.value

  //   const loadClient = await sut.load()

  //   if(loadClient.isLeft()) throw loadClient.value

  //   const { value } = loadClient

  //   expect(value.length).toBeGreaterThan(0)
  //   expect(value[0].idClient).not.toBeUndefined()
  //   expect(value[0].nome).toStrictEqual(client.name)
  // })

  // test('Fail to load the product', async () => {
  //   const { sut, productService } = factoryClienUseCase()
  //   vi.spyOn(productService, 'load').mockResolvedValueOnce(left(new ClientLoadServiceError('Test mock service')))
  //   const loadClient = await sut.load()
  //   expect(loadClient.value).instanceOf(ClientLoadServiceError)
  // })
})