import { ClientEntity } from '@/domain/entities'
import { ClientModel } from '@/use-case/model'

export class ClientViews {
  fromEntity(client: ClientEntity): ClientModel {
    return {
      idClient: client.idCliente!,
      nome: client.nome
    }
  }
}