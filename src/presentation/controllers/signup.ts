import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from './../errors/missing-params-error'
import { badRequest } from '../helpers/http-helpers'
export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'confirmPassword']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return badRequest(new Error())
  }
}
