import { Sequelize } from 'sequelize';
import config from '../config/sequelize';
import User from './user';
import Role from './role';
// Import other models as needed

const sequelize = new Sequelize(config);

const models = {
  User: User(sequelize),
  Role: Role(sequelize),
  // Add other models here
};

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;