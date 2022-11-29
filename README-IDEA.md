
# Backend | Desafio Técnico

## Sobre a oportunidade
    Temos vagas em aberto para diferentes níveis de conhecimento e achamos que um desafio poderá nos ajudar a te conhecer melhor.
    Fique a vontade para implementar o que você conhece ou o que entende como necesário para o projeto mas desde que siga nossos requisitos.
    
## Desafio Técnico
  ### O que precisa ser feito?
    Elaborar uma Api Rest ou Graphql com Nodejs (javascript ou typescript) que irá permitir a realização de um investimento.
    Necessário disponibilizar os métodos para Inclusão de Cliente, Produto e Ordem (Não é necessário os métodos para excluir/alterar/inativar)
    Incluir validações necessárias para cada método
    E se achar necessário fique a vontade para criar novos campos
  
  ### Métodos que devem ser criados
  - Inclusão de Cliente
  - Inclusão de Produto
  - Inclusão de Ordem
  - Consulta de Ordem

  ### Será um diferencial as implementações de
  - Testes
  - Documentação
  - Manual para instalação/execução

  ### Detalhes técnicos
    Cliente
  | Field | Type |
  |-|-|
  | idCliente | Numérico |
  | nome | Texto |
  | cpf | Texto |
  | dtNascimento | Data |
  | ativo | Boolean |


    Produtos
  | Field | Type |
  |-|-|
  | idProduto | Numérico |
  | nome | Texto |
  | ativo | Boolean |

    Ordens
  | Field | Type |
  |-|-|
  | idTransacao | Numérico |
  | idCliente | Numérico |
  | idProduto | Texto |
  | valorCompra | Numérico |
  | qtdCompra | Numérico |
  | totalCompra | Numérico |
  | dataOrdem | Data |

### Nossa avaliação será baseada em
  * Código desenvolvido (Pode caprichar nos comentários caso seja necessário)
  * Script de banco (Migration também vale se quiser)
  * Boas práticas de mercado
  * Criação e organização dos arquivos da solução

### Como enviar o desafio
  * Faça o fork desse desafio
  * Crie um repositório privado no seu github para o projeto e adicione como colaborador o usuário que enviamos
  * Após concluir seu trabalho faça um push e nos avise por e-mail para o recrutador
  
