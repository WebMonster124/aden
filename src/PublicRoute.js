import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PublicRoute = ({children}) => {
    console.log(isAuthenticated())
   if (!isAuthenticated())
        return <Navigate to="/login" replace/>
    return children ? children : <Outlet/>
};

export default PublicRoute;