# API de gerenciamento de transações

## Sobre o Projeto

Essa API de gerenciamento de transações monetária foi desenvolvida com NodeJS tendo o intuito de melhorar minhas habilidades em Fastify, migrations, cookies, CRUD, testes unitários, middlewares e gerenciamento de sessões

## 🛠️ Construído com

* [Typescript](https://www.typescriptlang.org/) - A linguagem de programação usada
* [Fastify](https://fastify.dev/) - O framework web usado
* [Knex](https://knexjs.org/) - ORM utilizada
* [SQLite](https://www.sqlite.org/) - Banco de dados usado


## Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

## Requisitos não funcionais

- [x] A transação pode ser do tipo crédito que somará ao valor total ou débito que vai subtrair;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;
