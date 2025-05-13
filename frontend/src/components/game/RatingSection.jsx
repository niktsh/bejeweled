import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getRating, getUserRating, submitRating } from '../../services/api';

const styles = {
    title: {
        fontSize: '1.5rem',
        color: 'white',
        marginBottom: '20px',
        fontWeight: '600'
    },
    averageRating: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '25px',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
    },
    averageScore: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#4caf50'
    },
    starsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    star: {
        fontSize: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: '#ffd700'
    },
    starHover: {
        transform: 'scale(1.2)'
    },
    starEmpty: {
        color: 'rgba(255, 255, 255, 0.2)'
    },
    userRating: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
    },
    userRatingTitle: {
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '10px'
    },
    loginMessage: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.9rem',
        marginTop: '10px',
        fontStyle: 'italic'
    }
};

const RatingSection = ({ gameId = 'Bejeweled' }) => {
    const [averageRating, setAverageRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);
    const { currentUser, isGuest, playerName } = useContext(AuthContext);

    useEffect(() => {
        loadRatings();
    }, [gameId, currentUser]);

    const loadRatings = async () => {
        try {
            const avg = await getRating(gameId);
            setAverageRating(avg);

            if (!isGuest && currentUser && playerName) {
                const userRate = await getUserRating(gameId, playerName);
                setUserRating(userRate);
            } else {
                setUserRating(null);
            }
        } catch (err) {
            console.error('Error loading ratings:', err);
        }
    };

    const handleSetRating = async (value) => {
        if (isGuest || !currentUser) {
            alert('Only authenticated users can rate the game.');
            return;
        }

        try {
            await submitRating(gameId, playerName, value);
            setUserRating(value);
            await loadRatings();
        } catch (err) {
            console.error('Error submitting rating:', err);
        }
    };

    const renderStars = (rating, isInteractive = false) => {
        return [1, 2, 3, 4, 5].map((star) => {
            const isFilled = isInteractive
                ? (hoverRating ? star <= hoverRating : star <= (userRating || 0))
                : star <= rating;
            return (
                <span
                    key={star}
                    style={{
                        ...styles.star,
                        ...(isFilled ? {} : styles.starEmpty),
                        ...(isInteractive && hoverRating === star ? styles.starHover : {})
                    }}
                    onMouseEnter={() => isInteractive && setHoverRating(star)}
                    onMouseLeave={() => isInteractive && setHoverRating(0)}
                    onClick={() => isInteractive && handleSetRating(star)}
                >
                    ★
                </span>
            );
        });
    };

    return (
        <div>
            <h3 style={styles.title}>Game Rating</h3>

            <div style={styles.averageRating}>
                <div style={styles.averageScore}>
                    {averageRating ? averageRating.toFixed(1) : '0.0'}
                </div>
                <div style={styles.starsContainer}>
                    {renderStars(averageRating)}
                </div>
            </div>

            {!isGuest && currentUser && (
                <div style={styles.userRating}>
                    <div style={styles.userRatingTitle}>Your Rating:</div>
                    <div style={styles.starsContainer}>
                        {renderStars(userRating || 0, true)}
                    </div>
                </div>
            )}

            {(isGuest || !currentUser) && (
                <p style={styles.loginMessage}>
                    Log in to rate the game
                </p>
            )}
        </div>
    );
};

export default RatingSection;