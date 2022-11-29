interface Client {
  name: string
  cpf: string
  birthday: Date
}

export class ClientEntity {
  idClient?: number
  name: string
  cpf: string
  birthday: Date
  active: boolean

  constructor({ name, cpf, birthday }: Client) {
    this.name = name
    this.cpf = cpf
    this.birthday = new Date(birthday)
    this.active = true
  }

  legalAge(): boolean {
    if(new Date().getFullYear() - this.birthday.getFullYear() >= 18) return true

    return false
  }
}