import { describe, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { ClientEntity } from '@/domain/entities/client-entity'

describe('# Use case create a client', () => {
  test('Client has the major age', async () => {
    const clientMock = {
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 18, max: 125, mode: 'age'}),
      cpf: '11122233344',
      active: true
    }

    const client = new ClientEntity(clientMock)

    expect(client.legalAge()).toStrictEqual(true)
  })

  test('Error to create the client that is under eighteen years old', async () => {
    const clientMock = {
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 10, max: 16, mode: 'age'}),
      cpf: '11122233344',
      active: true
    }

    const client = new ClientEntity(clientMock)

    expect(client.legalAge()).toStrictEqual(false)
  })
})