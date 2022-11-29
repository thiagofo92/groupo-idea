import { ClientEntity } from '@/domain/entities'
import { Either, left, right } from '@/shared/errors/Either'
import { ClientCreateResponseModel } from '@/use-case/model'
import { ClientServiceContract } from './contract/client-contract'
import { ClientCreateServiceError, ClientLoadServiceError } from './error'
import { Prisma } from './db/prisma'

export class ClientService implements ClientServiceContract  {
  async create(data: ClientEntity): Promise<Either<ClientCreateServiceError, ClientCreateResponseModel>> {
    try {
      const createdClient = await Prisma.client.create({
        data: {
          name: data.name,
          cpf: data.cpf,
          birthday: data.birthday,
          active: data.active
        }
      })
      const formatedClient: ClientCreateResponseModel = {
        idCliente: createdClient.id,
        nome: createdClient.name
      }

      return right(formatedClient)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }

  async load(): Promise<Either<ClientLoadServiceError, ClientCreateResponseModel[]>> {
    try {
      const clients = await Prisma.client.findMany()
      const formated = clients.map<ClientCreateResponseModel>(item => ({
        idCliente: item.id,
        nome: item.name
      }))
      return right(formated)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }

  async loadById(id: number): Promise<Either<ClientLoadServiceError, ClientCreateResponseModel | null>> {
    try {
      const clients = await Prisma.client.findUnique({
        where: {
          id
        }
      })

      if(!clients) return right(null)

      const formatedClient: ClientCreateResponseModel = {
        idCliente: clients.id,
        nome: clients.name
      }

      return right(formatedClient)
    } catch (error: any) {
      return left(new ClientCreateServiceError(error.message))
    }
  }
}