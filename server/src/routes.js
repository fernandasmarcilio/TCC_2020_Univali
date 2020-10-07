const express = require('express');

const UsersController = require('./controllers/UsersController');
const ProjectsController = require('./controllers/ProjectsController');
const RequirementsController = require('./controllers/RequirementsController');
const MetricsController = require('./controllers/MetricsController');
const MethodsController = require('./controllers/MethodsController');

const ProjectRequirementsController = require('./controllers/ProjectRequirementsController');
const RequirementMetricsController = require('./controllers/RequirementMetricsController');
const MetricMethodsController = require('./controllers/MetricMethodsController');

const routes = express.Router();

routes.get('/users/:usuario', UsersController.findUser);
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

routes.get('/methods', MethodsController.index);
routes.post('/methods', MethodsController.create);
routes.delete('/methods/:id', MethodsController.delete);

routes.get('/projectrequirements', ProjectRequirementsController.index);
routes.post('/projectrequirements', ProjectRequirementsController.create);
routes.delete('/projectrequirements/:id', ProjectRequirementsController.delete);

routes.get('/requirementmetrics', RequirementMetricsController.index);
routes.post('/requirementmetrics', RequirementMetricsController.create);
routes.delete('/requirementmetrics/:id', RequirementMetricsController.delete);

routes.get('/metricmethods', MetricMethodsController.index);
routes.post('/metricmethods', MetricMethodsController.create);
routes.delete('/metricmethods/:id', MetricMethodsController.delete);


module.exports = routes;