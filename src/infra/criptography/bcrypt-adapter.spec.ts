import Bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should calls Bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(Bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should returns a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw when Bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(Bcrypt, 'hash').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
