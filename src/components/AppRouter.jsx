import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, RoutePaths } from '../routes';

const AppRouter = () => {
    const { isAuth } = useSelector(state => state.auth);
    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            {routes.map(route => 
                <Route {...route} key={route.path} />
            )}
            <Route path="*" element={<Navigate to={RoutePaths.PAGE_NOT_FOUND} />} />
        </Routes>
    );
};

export default AppRouter;