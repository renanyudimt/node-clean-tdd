import {
  Controller,
  EmailValidator,
  HttpResponse,
  HttpRequest
} from '../protocols'
import {
  MissingParamError,
  InvalidParamError
} from './../errors'
import {
  badRequest,
  serverError
} from '../helpers'
import { AddAccount } from './../../domain/usecases'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'confirmPassword']
      const { name, email, password, confirmPassword } = httpRequest.body

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      return badRequest(new Error())
    } catch (error) {
      return serverError()
    }
  }
}
