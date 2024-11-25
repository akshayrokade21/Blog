import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminRoute = ({ children }) => {
    const { userRole } = useAuth();
    if (userRole !== '1') {
        return <Navigate to="/" />;
    }
    return children;
};

export default AdminRoute;
