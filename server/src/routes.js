const express = require('express');

const UsersController = require('./controllers/UsersController');
const ProjectsController = require('./controllers/ProjectsController');
const RequirementsController = require('./controllers/RequirementsController');
const MetricsController = require('./controllers/MetricsController');
const RequirementMetricsController = require('./controllers/RequirementMetricsController');

const routes = express.Router();

routes.get('/users', UsersController.findUser);
routes.post('/users', UsersController.create);
routes.delete('/users/:id', UsersController.delete);

routes.get('/projects', ProjectsController.index);
routes.post('/projects', ProjectsController.create);
routes.delete('/projects/:id', ProjectsController.delete);

routes.get('/requirements', RequirementsController.index);
routes.post('/requirements', RequirementsController.create);
routes.delete('/requirements/:id', RequirementsController.delete);

routes.get('/metrics', MetricsController.index);
routes.post('/metrics', MetricsController.create);
routes.delete('/metrics/:id', MetricsController.delete);

routes.get('/requirementmetrics', RequirementMetricsController.index);
routes.post('/requirementmetrics', RequirementMetricsController.create);
routes.delete('/requirementmetrics/:id', RequirementMetricsController.delete);

module.exports = routes;