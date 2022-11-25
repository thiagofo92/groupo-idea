interface Client {
  name: string
  cpf: string
  birthday: Date
  active: boolean
}

export class ClientEntity {
  idClient?: number
  name: string
  cpf: string
  birthday: Date
  active: boolean

  constructor({name, cpf, birthday, active}: Client) {
    this.name = name
    this.cpf = cpf
    this.birthday = birthday
    this.active = active
  }

  legalAge(): boolean {
    if(new Date().getFullYear() - this.birthday.getFullYear() >= 18) return true

    return false
  }
}