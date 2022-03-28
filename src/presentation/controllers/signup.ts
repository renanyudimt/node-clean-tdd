import {
  Controller,
  EmailValidator,
  HttpResponse,
  HttpRequest
} from './../protocols'
import { AddAccount } from './../../domain/usecases/add-accounts'
import {
  MissingParamError,
  InvalidParamError
} from './../errors'
import {
  badRequest,
  serverError,
  ok
} from '../helpers'
export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
