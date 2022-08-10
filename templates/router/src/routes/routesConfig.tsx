import { lazy } from 'react';

const routesConfig = [
  {
    path: '/index',
    component: lazy(() => import('./Index/index')),
    exact: true,
  },
];

export default routesConfig;
