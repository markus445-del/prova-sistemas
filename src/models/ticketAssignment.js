module.exports = (sequelize, DataTypes) => {
  const TicketAssignment = sequelize.define('TicketAssignment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'ticket_assignments',
  });

  TicketAssignment.associate = (models) => {
    TicketAssignment.belongsTo(models.Ticket, {
      foreignKey: 'ticketId',
      as: 'ticket',
    });

    TicketAssignment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return TicketAssignment;
};
