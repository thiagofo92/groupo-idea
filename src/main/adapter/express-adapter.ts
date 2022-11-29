import { Request, Response } from 'express'
import { RequestContract, ResponseContract } from '../contracts/http-contract'
type FunctionController = (
  request: RequestContract,
) => Promise<ResponseContract>


export function ExpressAdapter(controller: FunctionController) {
  return async function(request: Request, response: Response): Promise<void> {
    try {
      const { body, params, query } = request

      const result = await controller({ body, params, query }) 

      response.status(result.statusCode).json(result.data)
    } catch (error) {
      response.status(500).json({ message: 'Internal Error'})
    }
  }
}