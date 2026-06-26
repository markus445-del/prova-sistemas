module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
  }, {
    tableName: 'tickets',
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    Ticket.belongsTo(models.User, {
      foreignKey: 'createdById',
      as: 'createdBy',
    });

    Ticket.belongsToMany(models.User, {
      through: models.TicketAssignment,
      foreignKey: 'ticketId',
      otherKey: 'userId',
      as: 'assignees',
    });
  };

  return Ticket;
};
