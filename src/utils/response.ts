export type NotFoundResponse = {
  _tag: 'NotFoundResponse'
  code: 404
  body: string
}

export type SuccessfulResponse = {
  _tag: 'SuccessfulResponse'
  code: 200
  body: string
}

export type Response =
  | NotFoundResponse
  | SuccessfulResponse
