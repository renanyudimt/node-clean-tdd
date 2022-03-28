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

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'confirmPassword']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.confirmPassword) {
        return badRequest(new MissingParamError('confirmPassword'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return badRequest(new Error())
    } catch (error) {
      return serverError()
    }
  }
}
