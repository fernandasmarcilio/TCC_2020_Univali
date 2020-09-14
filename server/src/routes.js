const express = require('express');

const UsersController = require('./controllers/UsersController');
const ProjectsController = require('./controllers/ProjectsController');

const routes = express.Router();

routes.get('/user', UsersController.findUser);
routes.post('/users', UsersController.create);
routes.delete('/users', UsersController.delete);

routes.get('/projects', ProjectsController.index);
routes.post('/projects', ProjectsController.create);
routes.delete('/projects/:id', ProjectsController.delete);

module.exports = routes;