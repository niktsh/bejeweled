import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import StartMenu from './StartMenu';
import { TimerDisplay } from './components/TimerDisplay';

const START_TIME = 20;

const App = () => {
    const [gameData, setGameData] = useState(null);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState(null);
    const [timeLeft, setTimeLeft] = useState(START_TIME);
    const [gameState, setGameState] = useState('Menu');

    useEffect(() => {
        if (gameState === 'Playing' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'Playing') {
            endGame();
        }
    }, [gameState, timeLeft]);


    const startGame = async (userName) => {
        try {
            const response = await fetch('http://localhost:8080/bejeweled/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    rows: 8,
                    cols: 8,
                    userName: userName
                }),
            });

            if (!response.ok) throw new Error("Failed to start game");

            const data = await response.json();
            setGameData(data);
            setPlayerName(userName);
            setTimeLeft(START_TIME);
            setGameState('Playing');
            setTimeout(fetchScore, 0);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    };

    const handleSwap = async (row1, col1, row2, col2) => {
        if (!gameData || gameState !== 'Playing') return;

        try {
            const response = await fetch('http://localhost:8080/bejeweled/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    x1: row1,
                    y1: col1,
                    x2: row2,
                    y2: col2
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setGameData(data);
                fetchScore();
            } else {
                console.error('Invalid move:', data.error);
            }
        } catch (error) {
            console.error('Error during swap:', error);
        }
    };

    async function fetchScore() {
        if (!gameData) return;
        try {
            const response = await fetch('http://localhost:8080/bejeweled/score', {
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Unknown error");

            setScore(data.score);
        } catch (error) {
            console.error("Error fetching score:", error.message);
        }
    }

    const restartGame = async () => {
        try {
            const response = await fetch('http://localhost:8080/bejeweled/restart', {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) throw new Error("Failed to restart game");

            const data = await response.json();
            setGameData(data);
            setScore(0);
            setTimeLeft(START_TIME);
            setGameState('Playing');
            setTimeout(fetchScore, 0);
        } catch (error) {
            console.error("Error restarting game:", error.message);
        }
    };

    const endGame = async () => {
        try {
            await fetch('http://localhost:8080/bejeweled/gameover', {
                method: 'POST',
                credentials: 'include'
            });
            setGameState('Solved');
        } catch (error) {
            console.error("Ошибка завершения игры:", error);
        }
    };

    return (
        <div>
            {!playerName || gameState === 'Menu' ? (
                <StartMenu onStartGame={startGame} />
            ) : (
                <div>
                    <div style={{ margin: '10px' }}>
                        <h2>Player: {playerName}</h2>
                        <h2>Score: {score}</h2>
                        <TimerDisplay timeLeft={timeLeft} />
                        {gameState === 'Solved' && (
                            <div>
                                <h3 style={{ color: 'gray' }}>Game Over</h3>
                                <button onClick={restartGame}>Restart</button>
                            </div>
                        )}
                    </div>
                    {gameData && (
                        <GameBoard
                            gameData={gameData}
                            onSwap={handleSwap}
                            gameState={gameState}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;