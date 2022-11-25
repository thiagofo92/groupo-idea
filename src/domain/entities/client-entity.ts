interface Client {
  nome: string
  cpf: string
  dtNascimento: Date
  ativo: boolean
}

export class ClientEntity {
  idCliente?: number
  nome: string
  cpf: string
  dtNascimento: Date
  ativo: boolean

  constructor({nome, cpf, dtNascimento, ativo}: Client) {
    this.nome = nome
    this.cpf = cpf
    this.dtNascimento = dtNascimento
    this.ativo = ativo
  }

  legalAge(): boolean {
    if(new Date().getFullYear() - this.dtNascimento.getFullYear() >= 18) return true

    return false
  }
}