# prova-sistemas

## Overview
`prova-sistemas` is a Node.js application that provides a backend infrastructure for managing users, projects, and tasks. It utilizes Express for the server framework, Sequelize for ORM with PostgreSQL, and includes authentication features.

## Project Structure
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

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL
- Docker (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd prova-sistemas
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

### Running the Application
To run the application locally:
```
npm start
```

To run the application using Docker:
```
docker-compose up --build
```

### Database Migrations and Seeders
To run migrations and seed the database:
```
node command.js migrate
node command.js seed
```

### API Endpoints
- **Authentication**
  - `POST /api/auth/login`: Login and receive a JWT token.
  
- **Users**
  - `GET /api/users`: Retrieve all users.
  - `POST /api/users`: Create a new user.
  - `GET /api/users/:id`: Retrieve a user by ID.
  - `PUT /api/users/:id`: Update a user by ID.
  - `DELETE /api/users/:id`: Delete a user by ID.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.