const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Admin HelpDesk',
        email: 'admin@helpdesk.local',
        password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Agente Suporte',
        email: 'agente@helpdesk.local',
        password,
        role: 'agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Aluno Solicitante',
        email: 'aluno@helpdesk.local',
        password,
        role: 'requester',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Infraestrutura',
        description: 'Problemas com rede, Docker, servidor e ambiente.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Aplicacao',
        description: 'Erros de API, regras de negocio e integracoes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('tickets', [
      {
        id: 1,
        title: 'Nginx nao responde',
        description: 'A aplicacao sobe, mas o proxy reverso retorna erro 502.',
        status: 'open',
        priority: 'high',
        categoryId: 1,
        createdById: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Criar endpoint de categorias',
        description: 'Adicionar CRUD completo para categorias da API.',
        status: 'in_progress',
        priority: 'medium',
        categoryId: 2,
        createdById: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('ticket_assignments', [
      {
        ticketId: 1,
        userId: 2,
        assignedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ticketId: 2,
        userId: 1,
        assignedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ticket_assignments', null, {});
    await queryInterface.bulkDelete('tickets', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
