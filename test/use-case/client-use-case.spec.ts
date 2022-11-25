import { describe, vi, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'


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

    if(dtNascimento.getFullYear() - new Date().getFullYear() < 18) {
    }

    this.nome = nome
    this.cpf = cpf
    this.dtNascimento = dtNascimento
    this.ativo = ativo
  }
}


interface BaseUseCaseContract<T, K> {
  create: (data: T) => Promise<any>
  load: () => Promise<K[]>
}

interface ClientUseCaseContract extends BaseUseCaseContract <ClientEntity, ClientModel> {
  create: (data: ClientEntity) => Promise<ClientModel>
  load: () => Promise<[]>
}


export class ClientUseCase implements ClientUseCaseContract {
  async create (data: ClientEntity): Promise<ClientModel> {
    return true
  }

  async load(): Promise<any> {

  }

}

describe('# Use case create a client', () => {
  test('# Create a client', async () => {
    const sut = new ClientUseCase()
    const client: ClientEntity = {
      nome: faker.name.fullName(),
      dtNascimento: faker.date.birthdate({ min: 18, max: 70, mode: 'age'}),
      cpf: '11122233344',
      ativo: true
    }
    const result = await sut.create(client)

    expect(result.idClient).not.toBeUndefined()
    expect(result.nome).toStrictEqual(client.nome)
  })
  test.todo('')
})