import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './components/auth/AuthLayout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ReviewsPage from './pages/ReviewsPage';
import NotFoundPage from './pages/NotFoundPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import TopPlayersPage from './pages/TopPlayersPage';

const Router = () => {
    return (
        <GameProvider>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game" element={
                        <ProtectedRoute guestAllowed>
                            <GamePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/reviews" element={
                        <ProtectedRoute guestAllowed>
                            <ReviewsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/topplayers" element={<TopPlayersPage />} />
                </Route>

                <Route path="/index.html" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </GameProvider>
    );
};

export default Router;