import React from 'react';
import './TopScores.css';

const TopScores = ({ scores }) => {
    if (!scores || scores.length === 0) {
        return (
            <div className="empty-scores">
                No scores yet. Be the first to play!
            </div>
        );
    }

    return (
        <div className="top-scores">
            <table className="top-scores-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>
                                <div className="player-name">
                                    <span className={`player-rank ${index < 3 ? `top-${index + 1}` : ''}`}>
                                        {index + 1}
                                    </span>
                                    {score.player}
                                </div>
                            </td>
                            <td>
                                <span className="score-value">{score.points}</span>
                            </td>
                            <td>
                                <span className="date-value">
                                    {new Date(score.playedOn).toLocaleDateString()}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopScores;