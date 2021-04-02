import Login from '../pages/login/login';

const ValidatingRoutesList = [
    {
        path: '/start',
        component: Login,
        exact: true,
    },
];

/** 不需要鉴权 */
const NonValidatingRoutesList = [
    {
        path: '/login',
        component: Login,
        exact: true,
    },
];

export { ValidatingRoutesList, NonValidatingRoutesList };
