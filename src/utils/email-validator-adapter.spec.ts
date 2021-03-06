import validator from 'validator'

import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail () {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false when validator return false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBeFalsy()
  })

  test('Should return true when validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBeTruthy()
  })

  test('Should call validator with email correct', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
