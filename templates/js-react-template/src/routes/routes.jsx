import React from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './routes.scss';
import { ValidatingRoutesList, NonValidatingRoutesList } from './routesConfig';
// import useForbidScalable from '../hooks/useForbidScalable';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
};

const Routes = () => {
    const location = useLocation();
    const history = useHistory();
    let hasToken = useSelector(state => state.hasToken);

    /**
     * back to top when routes are changed
     */
    useEffect(() => {
        if (document) {
            if (document?.documentElement || document?.body) {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            }
        }
    }, [history?.location?.pathname]);

    return (
        <>
            {/* <TransitionGroup
                // style={{ position: 'relative' }}
                className={'router-wrapper'}
                // childFactory={child =>
                //     React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
                // }
            >
                <CSSTransition key={location.pathname} timeout={500}> */}
            <Switch location={location}>
                {NonValidatingRoutesList.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    ></Route>
                ))}
                {hasToken &&
                    ValidatingRoutesList.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        ></Route>
                    ))}
                <Redirect to="/login" />
            </Switch>
            {/* </CSSTransition>
            </TransitionGroup> */}
        </>
    );
};

export default Routes;
