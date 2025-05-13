import React, { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import { AuthContext } from '../contexts/AuthContext';
import GameBoard from '../components/game/GameBoard';
import { TimerDisplay } from '../components/game/TimerDisplay';
import '../components/game/Game.css';

const RestartIcon = () => (
    <svg className="restart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="#3268f1"/>
    </svg>
);

const StopIcon = () => (
    <svg className="stop-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="12" height="12" rx="2" fill="#f44336" />
    </svg>
);

const GamePage = () => {
    const {
        gameData,
        score,
        timeLeft,
        gameState,
        startGame,
        handleSwap,
        handleRestartGame,
        handleEndGame,
        gameMode,
        setGameMode
    } = useContext(GameContext);

    const { isGuest } = useContext(AuthContext);

    useEffect(() => {
        const gameArea = document.querySelector('.game-container');
        if (gameArea) {
            gameArea.focus();
        }
    }, [gameData]);

    return (
        <div className="game-page-centered">
            <div className="game-top-panel-horizontal">
                <div className="top-btn-group">
                    {(gameState === 'Menu' || gameState === 'Solved') && (
                        <div className="top-btn mode-toggle">
                            <label className="mode-label">
                                <input
                                    type="radio"
                                    name="game-mode"
                                    value="timed"
                                    checked={gameMode === 'timed'}
                                    onChange={() => setGameMode('timed')}
                                />
                                Timed
                            </label>
                            <label className="mode-label">
                                <input
                                    type="radio"
                                    name="game-mode"
                                    value="free"
                                    checked={gameMode === 'free'}
                                    onChange={() => setGameMode('free')}
                                />
                                Free
                            </label>
                        </div>
                    )}
                    <div className="top-btn score-btn">
                        <span className="top-btn-label">Score</span>
                        <span className="top-btn-value">{score}</span>
                    </div>
                    {gameMode === 'timed' && (
                        <div className="top-btn time-btn">
                            <span className="top-btn-label">Time</span>
                            <span className="top-btn-value"><TimerDisplay timeLeft={timeLeft} /></span>
                        </div>
                    )}
                    {gameMode === 'free' && (
                        <div className="top-btn time-btn">
                            <span className="top-btn-label">Time</span>
                            <span className="top-btn-value">∞</span>
                        </div>
                    )}
                    <button
                        className="top-btn restart-btn"
                        onClick={gameState === 'Menu' ? startGame : handleRestartGame}
                        title={gameState === 'Menu' ? 'Start Game' : 'Restart Game'}
                        aria-label={gameState === 'Menu' ? 'Start Game' : 'Restart Game'}
                    >
                        <RestartIcon />
                    </button>
                    <button
                        className="top-btn stop-btn"
                        onClick={handleEndGame}
                        title="Stop Game"
                        aria-label="Stop Game"
                        disabled={gameState === 'Menu'}
                    >
                        <StopIcon />
                    </button>
                </div>
            </div>

            <div className="game-info game-centered-info">
                {gameData && (
                    <GameBoard
                        gameData={gameData}
                        onSwap={handleSwap}
                        gameState={gameState}
                        onStartGame={startGame}
                        score={score}
                    />
                )}
            </div>
        </div>
    );
};

export default GamePage;