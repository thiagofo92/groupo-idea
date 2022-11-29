import { ClientController } from '@/controllers'
import { ClientService } from '@/services'
import { ClientUseCase } from '@/use-case'

export function clientControllerFactory() {
  const service = new ClientService()
  const usecase = new ClientUseCase(service)
  const controller = new ClientController(usecase)

  return controller
}