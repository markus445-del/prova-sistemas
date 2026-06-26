const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const swaggerDocument = require('./swagger');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    service: 'HelpDesk Academico API',
    docs: '/api-docs',
    health: '/api/health',
  });
});

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});

app.get('/api-docs', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>HelpDesk Academico API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>SwaggerUIBundle({ url: '/api-docs.json', dom_id: '#swagger-ui' });</script>
</body>
</html>`);
});

app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
