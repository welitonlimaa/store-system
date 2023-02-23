# Store System (Back-End)

Nesse projeto foi desenvolvido uma API RESTful utilizando a arquitetura MSC (model-service-controller).

A API é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco MySQL para a gestão de dados.

<details>
  <summary><strong>‼️ Acessando Localmente</strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git clone`.
  - Entre na pasta do repositório que você acabou de clonar

  2. Com Docker

**:warning: seu docker-compose precisa estar na versão 1.29 ou superior.

> :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

- Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
- Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
- A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

> :information_source: Opção 1: Use o comando `docker-compose run node npm test`, ou para acessar o container e executar lá:

> :information_source: Opção 2: Use o comando `docker exec -it store_manager bash` e sigas passos abaixo.

- Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

> :information_source: Instale as dependências [**Caso existam**] com `npm install`

</details>
