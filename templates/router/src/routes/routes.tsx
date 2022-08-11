import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import routesConfig from './routesConfig';
import { useSelector } from 'react-redux';

const Routes = () => {
  const hasToken = useSelector(state => state.hasToken);
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Switch>
          {hasToken &&
            routesConfig.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              ></Route>
            ))}
          <Route path="/login" exact component={lazy(() => import('./Login'))} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
