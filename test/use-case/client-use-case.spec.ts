import { describe, vi, expect, test } from 'vitest'



interface BaseUseCaseContract<T, K> {
  create: (data: T) => Promise<any>
  load: () => Promise<K[]>
}

interface ClientUseCaseContract extends BaseUseCaseContract <any, any> {
  create: (data: any) => Promise<boolean>
  load: () => Promise<[]>
}


export class ClientUseCase implements ClientUseCaseContract {
  async create (data: any): Promise<boolean> {
    return true
  }

  async load(): Promise<any> {

  }

}

describe('# Use case create a client', () => {
  test('# Create a client', async () => {
    const sut = new ClientUseCase()
    const result = await sut.create()

    expect(result).toStrictEqual(true)
  })
  test.todo('')
})