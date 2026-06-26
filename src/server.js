const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Banco de dados conectado.');

    app.listen(port, () => {
      console.log(`Servidor Node privado ouvindo na porta ${port}.`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicacao:', error);
    process.exit(1);
  }
};

startServer();
