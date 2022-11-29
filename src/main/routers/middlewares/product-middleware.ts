import * as Yup from 'yup'
import { Request, Response, NextFunction } from 'express'
import { badRequest } from '@/controllers/helpers/http-respnse'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  active: Yup.boolean().required()
})

export async function productCreateMiddleware(request: Request, response: Response, next: NextFunction) {
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