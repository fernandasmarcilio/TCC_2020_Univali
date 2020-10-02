import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import MethodList from './pages/MethodList';
import MetricList from './pages/MetricList';
import Project from './pages/Project';
import ProjectList from './pages/ProjectList';
import RequirementList from './pages/RequirementList';


function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />

            <Route exact path="/projects" component={ProjectList} />
            <Route path="/projects/:id" component={Project} />

            <Route exact path="/requirements" component={RequirementList} />
            <Route path="/requirements/:id" component={Project} />

            <Route exact path="/metrics" component={MetricList} />
            <Route path="/metrics/:id" component={Project} />

            <Route exact path="/methods" component={MethodList} />
            <Route path="/methods/:id" component={Project} />
        </BrowserRouter>
    );
}

export default Routes;