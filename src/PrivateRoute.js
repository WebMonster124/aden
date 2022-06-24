import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated, isVerified,getAuthUser } from './auth';


function PrivateRoute({ children }) {
    return isAuthenticated() &&  getAuthUser().roles && getAuthUser().roles < 2 ? children : <Navigate replace to="/home" />;
  }

export default PrivateRoute;