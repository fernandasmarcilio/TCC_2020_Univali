const express = require('express');

const UsersController = require('./controllers/UsersController');
const ProjectsController = require('./controllers/ProjectsController');
const RequirementsController = require('./controllers/RequirementsController');
const MetricsController = require('./controllers/MetricsController');
const MethodsController = require('./controllers/MethodsController');
const StatusController = require('./controllers/StatusController');

const routes = express.Router();

routes.get('/users/', UsersController.show);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

routes.get('/projects', ProjectsController.index);
routes.get('/projects/:id', ProjectsController.show);
routes.post('/projects', ProjectsController.create);
routes.put('/projects/:id', ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

routes.get('/user/:id/requirements', RequirementsController.index);
routes.get('/requirements/:id', RequirementsController.show);
routes.post('/requirements', RequirementsController.create);
routes.put('/requirements/:id', RequirementsController.update);
routes.delete('/requirements/:id', RequirementsController.delete);

routes.get('/user/:id/metrics/', MetricsController.index);
routes.get('/metrics/:id', MetricsController.show);
routes.post('/metrics', MetricsController.create);
routes.put('/metrics/:id', MetricsController.update);
routes.delete('/metrics/:id', MetricsController.delete);

routes.get('/user/:id/methods', MethodsController.index);
routes.get('/methods/:id', MethodsController.show);
routes.post('/methods', MethodsController.create);
routes.put('/methods/:id', MethodsController.update);
routes.delete('/methods/:id', MethodsController.delete);

routes.get('/projects/:id/status', StatusController.index);
routes.get('/projects/status/:id', StatusController.show);
routes.post('/projects/:id/status', StatusController.create);
routes.put('/projects/:idProject/status/:idStatus', StatusController.update);
//routes.delete('/projects/status/:id', StatusController.delete);



module.exports = routes;