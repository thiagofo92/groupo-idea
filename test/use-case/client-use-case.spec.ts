import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { Either, right } from '@/shared/errors/Either'


interface ClientModel {
  idClient: number
  nome: string
}

interface Client {
  nome: string
  cpf: string
  dtNascimento: Date
  ativo: boolean
}

class ClientEntity {
  idCliente?: number
  nome: string
  cpf: string
  dtNascimento: Date
  ativo: boolean

  constructor({nome, cpf, dtNascimento, ativo}: Client) {
    this.nome = nome
    this.cpf = cpf
    this.dtNascimento = dtNascimento
    this.ativo = ativo
  }

  legalAge(): boolean {
    if(new Date().getFullYear() - this.dtNascimento.getFullYear() >= 18) return true

    return false
  }
}

interface BaseUseCaseContract<T, K> {
  create: (data: T) => Promise<Either<Error, any>>
  load: () => Promise<Either<Error, K[]>>
}

interface ClientUseCaseContract extends BaseUseCaseContract <ClientEntity, ClientModel> {
  create: (data: ClientEntity) => Promise<Either<ClientCreateUseCaseError, ClientModel>>
  load: () => Promise<Either<Error, []>>
}

export class ClientCreateUseCaseError extends Error {
  constructor(message: string ) {
    super(message)
    this.name = 'ClientCreateUseCaseError'
  }
}

export class ClientUseCase implements ClientUseCaseContract {
  async create (data: ClientEntity): Promise<Either<ClientCreateUseCaseError, ClientModel>> {
    const client: ClientModel = {
      idClient: 1,
      nome: data.nome
    }
    return right(client)
  }

  async load(): Promise<Either<Error, any[]>> {
    return {} as any
  }

}

function factoryClienUseCase() {
  const sut = new ClientUseCase()
  return { sut }
}

describe('# Use case create a client', () => {
  test('# Create a client', async () => {
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

    expect(client.legalAge()).toStrictEqual(true)
    expect(value.idClient).not.toBeUndefined()
    expect(value.nome).toStrictEqual(client.nome)
  })

  test('Fail to create the user', async () => {
    const { sut } = factoryClienUseCase()
    const clientMock = {
      nome: faker.name.fullName(),
      dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
      cpf: '11122233344',
      ativo: true
    }

    const client = new ClientEntity(clientMock)
    const result = await sut.create(client)

    expect(result.idClient).not.toBeUndefined()
    expect(result.nome).toStrictEqual(client.nome)
  })

  test('Error to create the client that is under eighteen years old', async () => {
    const { sut } = factoryClienUseCase()
    const clientMock = {
      nome: faker.name.fullName(),
      dtNascimento: faker.date.birthdate({ min: 10, max: 16, mode: 'age'}),
      cpf: '11122233344',
      ativo: true
    }

    const client = new ClientEntity(clientMock)
    const result = await sut.create(client)

    expect(client.legalAge()).toStrictEqual(false)
  })
})