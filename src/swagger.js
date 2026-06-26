module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'HelpDesk Academico API',
    version: '1.0.0',
    description: 'API REST para gerenciamento de usuarios, categorias, chamados e atribuicoes.',
  },
  servers: [
    {
      url: 'http://localhost',
      description: 'Nginx reverse proxy',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'admin@helpdesk.local' },
          password: { type: 'string', example: '123456' },
        },
      },
      User: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Maria Silva' },
          email: { type: 'string', example: 'maria@email.com' },
          password: { type: 'string', example: '123456' },
          role: { type: 'string', enum: ['admin', 'agent', 'requester'], example: 'agent' },
        },
      },
      Category: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Infraestrutura' },
          description: { type: 'string', example: 'Chamados de ambiente, Docker e rede.' },
        },
      },
      Ticket: {
        type: 'object',
        required: ['title', 'description', 'categoryId'],
        properties: {
          title: { type: 'string', example: 'Banco indisponivel' },
          description: { type: 'string', example: 'PostgreSQL nao aceitou conexao da API.' },
          status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'], example: 'open' },
          priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'high' },
          categoryId: { type: 'integer', example: 1 },
          createdById: { type: 'integer', example: 1 },
        },
      },
      TicketAssignment: {
        type: 'object',
        required: ['ticketId', 'userId'],
        properties: {
          ticketId: { type: 'integer', example: 1 },
          userId: { type: 'integer', example: 2 },
        },
      },
    },
  },
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Realiza login e gera JWT',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } },
        },
        responses: { 200: { description: 'Token JWT gerado' }, 401: { description: 'Credenciais invalidas' } },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Cria um usuario inicial sem JWT',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
        },
        responses: { 201: { description: 'Usuario criado' } },
      },
    },
    ...crudPaths('/api/users', 'Users', '#/components/schemas/User'),
    ...crudPaths('/api/categories', 'Categories', '#/components/schemas/Category'),
    ...crudPaths('/api/tickets', 'Tickets', '#/components/schemas/Ticket'),
    ...crudPaths('/api/ticket-assignments', 'TicketAssignments', '#/components/schemas/TicketAssignment'),
  },
};

function crudPaths(basePath, tag, schemaRef) {
  return {
    [basePath]: {
      get: {
        tags: [tag],
        security: [{ bearerAuth: [] }],
        summary: `Lista ${tag}`,
        responses: { 200: { description: 'Lista retornada' } },
      },
      post: {
        tags: [tag],
        security: [{ bearerAuth: [] }],
        summary: `Cria ${tag}`,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: schemaRef } } },
        },
        responses: { 201: { description: 'Registro criado' } },
      },
    },
    [`${basePath}/{id}`]: {
      get: {
        tags: [tag],
        security: [{ bearerAuth: [] }],
        summary: `Busca ${tag} por ID`,
        parameters: [idParam()],
        responses: { 200: { description: 'Registro encontrado' }, 404: { description: 'Registro nao encontrado' } },
      },
      put: {
        tags: [tag],
        security: [{ bearerAuth: [] }],
        summary: `Atualiza ${tag} por ID`,
        parameters: [idParam()],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: schemaRef } } },
        },
        responses: { 200: { description: 'Registro atualizado' }, 404: { description: 'Registro nao encontrado' } },
      },
      delete: {
        tags: [tag],
        security: [{ bearerAuth: [] }],
        summary: `Remove ${tag} por ID`,
        parameters: [idParam()],
        responses: { 204: { description: 'Registro removido' }, 404: { description: 'Registro nao encontrado' } },
      },
    },
  };
}

function idParam() {
  return {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'integer' },
  };
}
