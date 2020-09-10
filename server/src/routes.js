const express = require('express');

const UsersController = require('./controllers/UsersController');

const routes = express.Router();

routes.post('/users', UsersController.create);

module.exports = routes;