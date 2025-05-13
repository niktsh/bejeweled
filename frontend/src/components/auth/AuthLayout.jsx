import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Auth.css';

const AuthLayout = () => {
    const { currentUser, isGuest } = useContext(AuthContext);
    const location = useLocation();

    if (currentUser || isGuest) {
        const from = location.state?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    return (
        <div className="login-container">
            <Outlet />
        </div>
    );
};

export default AuthLayout;