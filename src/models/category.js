module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'categories',
  });

  Category.associate = (models) => {
    Category.hasMany(models.Ticket, {
      foreignKey: 'categoryId',
      as: 'tickets',
    });
  };

  return Category;
};
