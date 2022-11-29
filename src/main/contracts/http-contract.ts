export type RequestParams = 'body' | 'params' | 'query'

export type RequestContract<T = any> = Record<RequestParams, T>
export interface ResponseContract { statusCode: number, data: any }