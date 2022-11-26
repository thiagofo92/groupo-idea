export interface ClientCreateModel {
  cpf: string
  dtNascimento: Date
  nome: string
}

export interface ClientCreateResponseModel {
  idClient: number
  nome: string
}