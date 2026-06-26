# prova-sistemas

## Overview
`prova-sistemas` É uma aplicação Node.js que fornece uma infraestrutura de backend para o gerenciamento de usuários, projetos e tarefas. Ela utiliza o Express como framework de servidor, o Sequelize como ORM com PostgreSQL e inclui funcionalidades de autenticação.

## Estrutura do Projeto
```
prova-sistemas
├── src
│   ├── server.js
│   ├── app.js
│   ├── config
│   │   ├── config.js
│   │   └── sequelize.js
│   ├── models
│   │   ├── index.js
│   │   ├── user.js
│   │   └── role.js
│   ├── migrations
│   │   └── 20250601-create-user.js
│   ├── seeders
│   │   └── 20250601-seed-users.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── userController.js
│   ├── routes
│   │   ├── index.js
│   │   ├── auth.js
│   │   └── users.js
│   ├── middlewares
│   │   └── auth.js
│   ├── services
│   │   └── authService.js
│   └── utils
│       └── logger.js
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── nginx
│   └── nginx.conf
├── command.js
├── .sequelizerc
├── .env.example
├── package.json
└── README.md
```

## Primeiros Passos

### Pré-requisitos
- Node.js (versão 14 ou superior)
- PostgreSQL
- Docker (opcional, para configuração em containers)

### Instalação
1. Clone o repositório:
   ```
   git clone <repository-url>
   cd prova-sistemas
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis ​​de ambiente:
   - Copie o arquivo `.env.example` para `.env` e preencha os valores necessários.

### Executando a Aplicação
Para executar a aplicação localmente:
```
npm start
```

Para executar a aplicação usando Docker:
```
docker-compose up --build
```

### Migrações e Seeders do Banco de Dados
Para executar as migrações e popular o banco de dados (seed):
```
node command.js migrate
node command.js seed
```

### Endpoints da API
- **Autenticação**
  - `POST /api/auth/login`: Realiza login e retorna um token JWT.
  
- **Usuários**
  - `GET /api/users`: Lista todos os usuários.
  - `POST /api/users`: Cria um novo usuário.
  - `GET /api/users/:id`: Busca um usuário pelo ID.
  - `PUT /api/users/:id`: Atualiza um usuário pelo ID.
  - `DELETE /api/users/:id`: Remove um usuário pelo ID.

## Contribuição
Contribuições são bem-vindas! Por favor, abra uma *issue* ou envie um *pull request* para quaisquer melhorias ou correções de bugs.

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.
