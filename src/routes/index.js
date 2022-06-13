import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import PageNotFound from '../pages/PageNotFound';

export const RoutePaths = {
    LOGIN: '/login',
    MAIN: '/',
    PAGE_NOT_FOUND: '/404',
};

const commonRoutes = [
    {path: RoutePaths.MAIN, element: <Main />},
    {path: RoutePaths.PAGE_NOT_FOUND, element: <PageNotFound />},
];

export const publicRoutes = [...commonRoutes, {path: RoutePaths.LOGIN, element: <Login />}];
export const privateRoutes = [...commonRoutes, {path: RoutePaths.LOGIN, element: <Navigate to={RoutePaths.MAIN} />}];
