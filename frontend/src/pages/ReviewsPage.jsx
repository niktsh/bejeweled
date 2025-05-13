import React from 'react';
import './ReviewsPage.css';
import CommentsSection from '../components/game/CommentsSection';
import RatingSection from '../components/game/RatingSection';

const ReviewsPage = () => {
    return (
        <div className="reviews-container">
            <div className="reviews-header">
                <h1 className="reviews-title">Reviews and Ratings</h1>
                <p className="reviews-description">
                    Share your opinion about the game and see what other players think
                </p>
            </div>

            <div className="reviews-list">
                <div className="review-card">
                    <RatingSection />
                </div>

                <div className="review-card">
                    <CommentsSection />
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
