// This file sets up middleware, routes, and error handling for the Express application.

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes setup
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;