import { OrderController, ProductController } from '@/controllers'
import { ClientService, OrderService, ProductService } from '@/services'
import { OrderUseCase } from '@/use-case'

export function orderControllerFactory() {
  const orderService = new OrderService()
  const clientService = new ClientService()
  const producService = new ProductService()
  const usecase = new OrderUseCase(orderService, clientService, producService)
  const controller = new OrderController(usecase)

  return controller
}