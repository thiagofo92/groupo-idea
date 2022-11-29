import * as Yup from 'yup'
import { Request, Response, NextFunction } from 'express'
import { badRequest } from '@/controllers/helpers/http-respnse'

const schema = Yup.object().shape({
  nome: Yup.string().required(),
  cpf: Yup.string().required().matches(/^([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})$/g),
  dtNascimento: Yup.date()
})

export async function clientCreateMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    const isValid = await schema.validate(request.body, { abortEarly: false })
    console.log(isValid)
    
    next()
  } catch (error: any) {
    const params = error.inner.map((item: any) => item.path).join(', ')
    const message = `Invalid parameter ${params}`
    const result = badRequest(message)
    response.status(result.statusCode).json(result.data)
  }
}