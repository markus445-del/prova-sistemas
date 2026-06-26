const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('./user')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Ticket = require('./ticket')(sequelize, DataTypes);
const TicketAssignment = require('./ticketAssignment')(sequelize, DataTypes);

const models = {
  sequelize,
  User,
  Category,
  Ticket,
  TicketAssignment,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
