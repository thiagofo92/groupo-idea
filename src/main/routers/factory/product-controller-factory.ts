import { ProductController } from '@/controllers'
import { ProductService } from '@/services'
import { ProductUseCase } from '@/use-case'

export function productControllerFactory() {
  const service = new ProductService()
  const usecase = new ProductUseCase(service)
  const controller = new ProductController(usecase)

  return controller
}