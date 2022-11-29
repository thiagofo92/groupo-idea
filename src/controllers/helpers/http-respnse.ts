import { HttpResponse } from '../contracts/http-responde'

export function success (data: any): HttpResponse {
  return {
    statusCode: 200,
    data
  }
}

export function successToCreate (data: any): HttpResponse {
  return {
    statusCode: 201,
    data
  }
}

export function notContent (data: any): HttpResponse {
  return {
    statusCode: 204,
    data
  }
}

export function badRequest (data: any): HttpResponse {
  return {
    statusCode: 400,
    data
  }
}

export function notAuthorized (data: any): HttpResponse {
  return {
    statusCode: 401,
    data
  }
}

export function notFound (data: any): HttpResponse {
  return {
    statusCode: 404,
    data
  }
}

export function internalError (data: any): HttpResponse {
  return {
    statusCode: 500,
    data
  }
}
