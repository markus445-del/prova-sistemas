const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'
    ? 400
    : 500;

  return res.status(status).json({
    message: status === 400 ? 'Dados invalidos.' : 'Erro interno do servidor.',
    details: error.errors ? error.errors.map((item) => item.message) : error.message,
  });
};

module.exports = { errorHandler };
