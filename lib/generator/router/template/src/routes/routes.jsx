import React, { useEffect } from 'react';
import { Switch, Route, Redirect, <% if(routerMode){ %>BrowserRouter as Router<% } else{ %>HashRouter as Router<% } %> } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { useSelector } from 'react-redux';

const Routes = () => {
    <% if(needRedux){ %>let hasToken = useSelector(state => state.hasToken);<% } %>
    return (
        <Router>
            <Switch>
                {routesConfig.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        <% if(needRedux){ %>render={props =>
                            hasToken ? <route.component {...props} /> : <Redirect to="/login" />
                        }<% } else{ %>render={props => <route.component {...props} />}<% } %>
                    ></Route>
                ))}
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
};

export default Routes;
