import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import MethodList from './pages/MethodList';
import MetricList from './pages/MetricList';
import Project from './pages/Project';
import ProjectList from './pages/ProjectList';
import RequirementList from './pages/RequirementList';
import ReportProject from './pages/ReportProject';
import ReportPDF from './component/ReportPDF';

function Routes() {
    return (
        <div className="pages-route-container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />

                    <Route exact path="/projects" component={ProjectList} />
                    <Route exact path="/projects/:id" component={Project} />
                    <Route exact path="/projects/:id/report" component={ReportProject} />
                    <Route path="/projects/:id/report/pdf" component={ReportPDF} />

                    <Route exact path="/requirements" component={RequirementList} />
                    <Route path="/requirements/:id" component={Project} />

                    <Route exact path="/metrics" component={MetricList} />
                    <Route path="/metrics/:id" component={Project} />

                    <Route exact path="/methods" component={MethodList} />
                    <Route path="/methods/:id" component={Project} />


                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes;