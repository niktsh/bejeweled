
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, guestAllowed = false }) => {
    const { currentUser, isGuest } = useContext(AuthContext);
    const location = useLocation();

    if ((!currentUser && !isGuest) || (!guestAllowed && isGuest)) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;