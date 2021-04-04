import React from 'react';
import { Switch, Route, Redirect, WithRouter } from 'react-router-dom';
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
    );
};

export default WithRouter(Routes);