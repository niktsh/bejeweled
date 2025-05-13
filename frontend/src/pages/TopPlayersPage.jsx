import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import TopScores from '../components/game/TopScores';
import './TopPlayersPage.css';

const TopPlayersPage = () => {
    const { topScores } = useContext(GameContext);

    return (
        <div className="top-players-page-container">
            <div className="sidebar">
                <div className="sidebar-title">Top 10 Players</div>
                <TopScores scores={topScores} />
            </div>
        </div>
    );
};

export default TopPlayersPage; 