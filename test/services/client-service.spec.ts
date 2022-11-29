import { describe, test, expect, beforeEach, vi } from 'vitest'
import { ClientService } from '@/services/client-service'
import { ClientEntity } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { ClientCreateServiceError } from '@/services/error'

describe('# Service client test', () => {
  test('Create client in MySQL', async () => {
    const clientService = new ClientService()
    const clientEntity = new ClientEntity({
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age'}),
      cpf: '111111111'
    })
    const clientCreated = await clientService.create(clientEntity)

    if(clientCreated.isLeft()) throw clientCreated.value
    
    expect(clientCreated.value.idCliente).not.toBeUndefined()
  })

  test('Error to create client in MySQL', async () => {
    const clientService = new ClientService()
    const clientCreated = await clientService.create(null as any)

    expect(clientCreated.value).toBeInstanceOf(ClientCreateServiceError)
  })

  test('Load client from MySQL', async () => {
    const clientService = new ClientService()
    const clientEntity = new ClientEntity({
      name: faker.name.fullName(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age'}),
      cpf: '111111111'
    })
    const clientCreated = await clientService.create(clientEntity)

    if(clientCreated.isLeft()) throw clientCreated.value
    const clientLoaded = await clientService.load()

    if(clientLoaded.isLeft()) throw clientLoaded.value


    expect(clientLoaded.value[0].idCliente).not.toBeUndefined()
    expect(clientLoaded.value.length).toBeGreaterThan(0)
  })

  test.todo('Error to load client from MySQL')
})