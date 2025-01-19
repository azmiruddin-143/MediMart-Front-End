import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/Shared/LoadingSpinner';


const PrivateRoute = ({children}) => {
    const { loader, user } = useContext(AuthContext)
    const loacation = useLocation()
  
    if (loader) {
     return  <LoadingSpinner></LoadingSpinner>
    }
  
    if (user) {
      return children;
    }
  
    return (
      <div>
        <Navigate to='/signin' state={{from: loacation}} replace></Navigate>
      </div>
    );
};

export default PrivateRoute;