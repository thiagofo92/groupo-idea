import * as Yup from 'yup'
import { Request, Response, NextFunction } from 'express'
import { badRequest } from '@/controllers/helpers/http-respnse'

const schema = Yup.object().shape({
  idClient: Yup.number().required(),
  idProduct: Yup.number().required(),
  purchasesPrice: Yup.number().required().transform(verifyIfValueIsAPrice),
  purchasesCount: Yup.number().required()
})

function verifyIfValueIsAPrice(item: any) {
  const price: string = item.toString()
  if(!price.includes('.')) return false

  const priceSplited = price.split('.')

  if(priceSplited.length !== 2) return false

  if(priceSplited[1].length !== 2) return false

  return item
}

export async function orderCreateMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    await schema.validate(request.body, { abortEarly: false })

    next()
  } catch (error: any) {
    const params = error.inner.map((item: any) => item.path).join(', ')
    const message = `Invalid parameter ${params}`
    const result = badRequest(message)
    response.status(result.statusCode).json(result.data)
  }
}