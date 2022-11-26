import { ClientEntity } from '@/domain/entities'
import { ClientCreateModel } from '@/use-case/model'

export class ClientViews {
  fromEntity(client: ClientEntity): ClientCreateModel {
    return {
      idClient: client.idClient!,
      nome: client.name
    }
  }
}