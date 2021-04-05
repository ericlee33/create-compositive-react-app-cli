import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    WithRouter,
    <% if(routerMode){ %>BrowserRouter as Router<% } else{ %>HashRouter as Router<% } %>
 } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Routes = ({ location, history }) => {
    let hasToken = useSelector(state => state.hasToken);

    /**
     * back to top when routes are changed
     */
    // useEffect(() => {
    //     if (document) {
    //         if (document?.documentElement || document?.body) {
    //             document.documentElement.scrollTop = document.body.scrollTop = 0;
    //         }
    //     }
    // }, [history?.location?.pathname]);

    return (
        <Router>
            <Switch location={location}>
                {routesConfig.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={hasToken ? <route.component /> : <Redirect to="login" />}
                    ></Route>
                ))}
            </Switch>
        </Router>
    );
};

export default WithRouter(Routes);
