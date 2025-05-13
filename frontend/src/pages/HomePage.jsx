import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './HomePage.css';

const HomePage = () => {
    const { currentUser, isGuest } = useContext(AuthContext);

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1 className="hero-title">Welcome to Bejeweled!</h1>
                <p className="hero-subtitle">
                    A classic puzzle game with dazzling gems. Swap adjacent gems to form lines of three or more of the same kind!
                </p>
                {currentUser || isGuest ? (
                    <Link to="/game" className="cta-button">
                        Play Now
                    </Link>
                ) : null}
            </section>

            <section className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🎮</div>
                    <h2 className="feature-title">Exciting Gameplay</h2>
                    <p className="feature-description">
                        Simple rules but captivating challenges. Test your strategy and observation skills!
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🏆</div>
                    <h2 className="feature-title">Leaderboard</h2>
                    <p className="feature-description">
                        Compete with other players and aim to reach the top 10 best Bejeweled masters!
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">💬</div>
                    <h2 className="feature-title">Feedback & Ratings</h2>
                    <p className="feature-description">
                        Leave your feedback, rate the game, and share your experience with others!
                    </p>
                </div>
            </section>

            <section className="how-to-play">
                <h2 className="how-to-play-title">How to Play</h2>
                <ol className="steps">
                    <li className="step">
                        <strong>Objective:</strong> Match 3 or more identical gems in a row or column.
                    </li>
                    <li className="step">
                        <strong>Move:</strong> Swap adjacent gems (horizontally or vertically) to form a line.
                    </li>
                    <li className="step">
                        <strong>Points:</strong> Earn points for each match. The longer the line, the more points you score!
                    </li>
                    <li className="step">
                        <strong>Time:</strong> You have limited time. Score as many points as possible before time runs out!
                    </li>
                </ol>
            </section>
        </div>
    );
};

export default HomePage;
