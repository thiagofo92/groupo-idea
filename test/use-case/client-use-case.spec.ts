import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { left } from '@/shared/errors/Either'
import { ClientUseCase } from '@/use-case'
import { ClientCreateUseCaseError } from '@/use-case/error'
import { ClientCreateServiceError, ClientLoadServiceError } from '@/services/error'
import { ClientServiceMock } from '../mock/service'


function factoryClienUseCase() {
  const clientService = new ClientServiceMock()
  const sut = new ClientUseCase(clientService)
  const clientMock = {
    nome: faker.name.fullName(),
    dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
    cpf: '11122233344'
  }
  return { sut, clientService, clientMock }
}

describe('# Use case create a client', () => {
  test('# Create a client', async () => {
    const { sut, clientMock } = factoryClienUseCase()

    const result = await sut.create(clientMock)
    
    if(result.isLeft()) throw result.value

    const { value } = result

    expect(value.idCliente).not.toBeUndefined()
    expect(value.nome).toStrictEqual(clientMock.nome)
  })

  test('Fail to create the user', async () => {
    const { sut, clientService, clientMock } = factoryClienUseCase()
    vi.spyOn(clientService, 'create').mockResolvedValueOnce(left(new ClientCreateServiceError('Test mock service')))

    const result = await sut.create(clientMock)

    expect(result.value).instanceOf(ClientCreateServiceError)
  })

  test('Fail to create the user, because the client does not is of legal age', async () => {
    const { sut } = factoryClienUseCase()
    const clientMock = {
      nome: faker.name.fullName(),
      dtNascimento: faker.date.birthdate({ min: 16, max: 17, mode: 'age'}),
      cpf: '11122233344'
    }

    const result = await sut.create(clientMock)

    expect(result.value).instanceOf(ClientCreateUseCaseError)
  })

  test('# Load a client', async () => {
    const { sut, clientMock } = factoryClienUseCase()
    const createdClient = await sut.create(clientMock)
    if(createdClient.isLeft()) throw createdClient.value

    const loadClient = await sut.load()

    if(loadClient.isLeft()) throw loadClient.value

    const { value } = loadClient

    expect(value.length).toBeGreaterThan(0)
  })

  test('Fail to load the client', async () => {
    const { sut, clientService } = factoryClienUseCase()
    vi.spyOn(clientService, 'load').mockResolvedValueOnce(left(new ClientLoadServiceError('Test mock service')))
    const loadClient = await sut.load()
    expect(loadClient.value).instanceOf(ClientLoadServiceError)
  })
})