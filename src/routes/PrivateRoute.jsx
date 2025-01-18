import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({children}) => {
    const { loader, user } = useContext(AuthContext)
    const loacation = useLocation()
  
    if (loader) {
      <LoadingSpinner></LoadingSpinner>
    }
  
    if (user) {
      return children;
    }
  
    return (
      <div>
        <Navigate to='/signin' state={{from: loacation}} replace ></Navigate>
      </div>
    );
};

export default PrivateRoute;