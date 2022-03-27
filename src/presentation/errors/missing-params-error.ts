export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing Params: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
