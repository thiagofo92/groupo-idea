import { describe, vi, expect, test } from 'vitest'

describe('# Use case create a client', () => {
  test.todo('# Create a client', async () => {
    const sut = new ClientUseCase()
    const result = await sut.create()

    expect(result).toStrictEqual(true)
  })
  test.todo('')
})