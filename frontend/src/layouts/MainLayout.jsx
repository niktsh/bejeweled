import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './MainLayout.css';

const MainLayout = () => {
    const { playerName, isGuest, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        navigate('/signin');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="main-container">
            <header className="main-header">
                <Link to="/" className="logo">Bejeweled</Link>

                <nav className="main-nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/game"
                        className={`nav-link ${isActive('/game') ? 'active' : ''}`}
                    >
                        Game
                    </Link>
                    <Link
                        to="/reviews"
                        className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}
                    >
                        Reviews
                    </Link>
                    <Link
                        to="/topplayers"
                        className={`nav-link ${isActive('/topplayers') ? 'active' : ''}`}
                    >
                        Top Players
                    </Link>
                </nav>

                <div className="user-section">
                    <div className="user-info">
                        <span className="user-name">{playerName}</span>
                        {isGuest && <span className="guest-badge">Guest</span>}
                    </div>
                    <button className="sign-out-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="main-footer">
                <p>© 2025 Bejeweled. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MainLayout;