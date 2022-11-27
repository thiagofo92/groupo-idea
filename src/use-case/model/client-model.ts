export interface ClientCreateModel {
  cpf: string
  dtNascimento: Date
  nome: string
}

export interface ClientCreateResponseModel {
  idCliente: number
  nome: string
}