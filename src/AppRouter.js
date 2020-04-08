import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route, Switch, Link
    // Link, NavLink, Redirect, BrowserRouter, Switch
} from 'react-router-dom';
import App from './App'
import PrivateRoute from "./auth/PrivateRoute";
import app from "./fire";
import {Loader, Dimmer} from 'semantic-ui-react';

import LogIn from "./auth/LogIn";
import LogOut from "./auth/LogOut";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import Dashboard from './Dashboard';
import Data from './Data';
import NotFoundPage from './NotFoundPage';
import FileView from './FileView';

class AppRouter extends Component {
    state = {
        loading: true,
        authenticated: false,
        user: null
    };

    componentWillMount() {
        app.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({authenticated: true, currentUser: user, loading: false });
                } else {
                    this.setState({authenticated: false, currentUser: null, loading: false });
                }
            });
    }

    render() {
        const {authenticated, loading} = this.state;

        if (loading) {
            return (
            <div className="h-screen">
                <Dimmer active>
                    <Loader size='mini'>Launching...</Loader>
                </Dimmer>
                </div>
            );
        }
        return (
            // <BrowserRouter>
            //     <div>
            //         <header className="h-24 bg-pink-darker mb-6 p-6 shadow-lg text-center">
            //             <div className="inline-flex justify-between">
            //                 <div className="rounded mr-4"><img src="/TaRGET_logo.png" alt="logo" height="42" width="84"/></div>
            //                 <div>
            //                     <h1 className="text-grey-lightest font text-3xl">
            //                         New Metadata Registration</h1>
            //                 </div>
            //             </div>
            //         </header>
            //         <Switch>
            //             <Route path="/" component={App} exact={true}/> {/* <Route path="/update/:id" component={App}/>
            //     <Route
            //         path="/overview/atac-seq"
            //         render={() => window.location = "https://targetepigenomics.org/overview/atac-seq"}/> */}
            //             <Route component={NotFoundPage}/>
            //         </Switch>
            //     </div>
            // </BrowserRouter>
            
            <Router>
                <div>
                    <header className="h-24 bg-pink-darker mb-6 p-6 shadow-lg text-center">
                        <div className="inline-flex justify-between">
                            <div className="rounded mr-4"><img src="/TaRGET_logo.png" alt="logo" height="42" width="84"/></div>
                            <div>
                                <h1 className="text-grey-lightest font text-3xl">
                                    Submission System</h1>
                            </div>
                            <Link className='text-white outline-none' to="/">
                                <button className="outline-none ml-8 h-12 shadow bg-pink-darker hover:bg-grey-darker text-white font-bold py-2 px-4 rounded">
                                    Home
                                </button>
                            </Link>
                            {(this.state.authenticated) ? <LogOut/>: null }
                            
                        </div>
                    </header>
            <Switch>
                    
                    <PrivateRoute
                        exact
                        path="/metadata"
                        component={App}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={Dashboard}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/data"
                        component={Data}
                        authenticated={authenticated}
                    />
                    <PrivateRoute
                        exact
                        path="/submission/:id"
                        component={FileView}
                        authenticated={authenticated}
                    />
                    <Route exact path="/login" component={LogIn} authenticated={authenticated}/>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/forgot" component={ForgotPassword} />
                    <Route component={NotFoundPage}/>
            </Switch>
            </div>
            </Router>
        )
    };
}

export default AppRouter;