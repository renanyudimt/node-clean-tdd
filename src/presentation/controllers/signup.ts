import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from './../errors/missing-params-error'
import { badRequest } from '../helpers/http-helpers'
export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    } else {
      return badRequest(new MissingParamError('email'))
    }
  }
}
