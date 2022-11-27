import { ClientEntity } from '@/domain/entities'
import { ClientCreateResponseModel } from '@/use-case/model'

export class ClientViews {
  fromEntity(client: ClientEntity): ClientCreateResponseModel {
    return {
      idCliente: client.idClient!,
      nome: client.name
    }
  }
}