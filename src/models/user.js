const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'agent', 'requester'),
      allowNull: false,
      defaultValue: 'requester',
    },
  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Ticket, {
      foreignKey: 'createdById',
      as: 'createdTickets',
    });

    User.belongsToMany(models.Ticket, {
      through: models.TicketAssignment,
      foreignKey: 'userId',
      otherKey: 'ticketId',
      as: 'assignedTickets',
    });
  };

  return User;
};
