import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>

                <p className="text-xl text-gray-600 mb-8">
                    Oops! It looks like you've gotten lost. The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Back to Home
                    </Link>

                    <Link
                        to="/game"
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Play Bejeweled
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
