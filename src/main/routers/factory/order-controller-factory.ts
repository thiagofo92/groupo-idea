import { OrderController } from '@/controllers'
import { OrderService } from '@/services'
import { OrderUseCase } from '@/use-case'

export function orderControllerFactory() {
  const service = new OrderService()
  const usecase = new OrderUseCase(service)
  const controller = new OrderController(usecase)

  return controller
}