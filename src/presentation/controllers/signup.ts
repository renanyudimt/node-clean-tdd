import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from './../errors/missing-params-error'
export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    } else {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
