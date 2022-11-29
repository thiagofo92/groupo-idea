# API de investimento

## Descriação do Projeto
  Uma API para simular o investimento de um usuários, todos os investimentos são apenas salvos no banco de dados, a API não tem interação com serviços externos.
  Os clientes podem ser cadastros e novos produtos podem ser inseridos na base de dados

## Como utilizar o projeto
  * Instalar o [NodeJS](https://nodejs.org/en/) (**versão utilizada no projeto v16.15.0**)
  * Usar o gerênciador de pacotes de sua preferência para instalar os pacotes node, use o comando **npm install ou yarn**
  * Instalar o [Docker](https://www.docker.com/)
  * Instalar o [Docker compose](https://docs.docker.com/compose/install/)
  * Depois ter feito as etapas anteriores execute o comando **npx docker:up ou yarn docker:up** para criar o container do **MySQL**
  * Renomeie o arquivo .env.example para .env
  * Execute o comando **npx migrate:create ou yarn migrate:create** para criar as tabelas no banco de dados
  * Execute o comando **npx test ou yarn test** para verificar se está tudo funcionando
  * Execute o comando **npx dev:server ou yarn dev:server** para iniciar o servidor
  * Após o servidor ter sido iniciado acesse [Swagger API](https://localhost:4500/api-docs) para efetuar os testes


## Utilizar a API
  Acesse a página do [Swagger API](https://localhost:4500/api-docs) para visualizar todas as rotas disponiveis e os dados para criação de dados de retorno.
  O projeto também contém um arquivo do [Postman](https://www.postman.com/) para caso prefira utilizar o postman para efetuar as consultas.
  A API possui um rate limit de 50 requisições por minuto

## Padrões usados
  * SRP [Single Responsiblity Principle](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
  * DIP [Dependency Inversion Principle](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
  * MVC [Model View Controller](https://www.google.com/search?q=mvc&oq=mvc&aqs=chrome..69i57.1874j0j9&sourceid=chrome&ie=UTF-8)
  * Port And Adapter [Arquitetura Hexagonal](https://medium.com/bemobi-tech/ports-adapters-architecture-ou-arquitetura-hexagonal-b4b9904dad1a)
  * Either handler error [Either](https://livebook.manning.com/concept/functional-programming/either)