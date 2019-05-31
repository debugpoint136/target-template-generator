import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    NavLink,
    Redirect
} from 'react-router-dom';
import App from './App'
import NotFoundPage from './NotFoundPage';

const ExperimentDesigner = () => (
    <BrowserRouter>
        <div>
            <header className="h-24 bg-purple-darker mb-6 p-6 shadow-lg text-center">
                <div className="inline-flex justify-between">
                    <div className="rounded mr-4"><img src="/TaRGET_logo.png" alt="logo" height="42" width="84"/></div>
                    <div>
                        <h1 className="text-grey-lightest font text-3xl">
                            New Submission</h1>
                    </div>
                </div>
            </header>
            <Switch>
                <Route path="/" component={App} exact={true}/>
                <Route path="/update/:id" component={App}/>
                <Route
                    path="/overview/atac-seq"
                    render={() => window.location = "https://targetepigenomics.org/overview/atac-seq"}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default ExperimentDesigner;