import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {startNewGame, makeSwap, getScore, restartGame, endGame, getTopScores, getComments, submitComment, getRating, getUserRating, submitRating} from '../services/api';

export const GameContext = createContext();

const START_TIME = 60;

export const GameProvider = ({ children }) => {
    const { playerName, isGuest } = useContext(AuthContext);

    const [gameData, setGameData] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(START_TIME);
    const [gameState, setGameState] = useState('Menu'); // Menu, Loading, Playing, Solved
    const [topScores, setTopScores] = useState([]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [error, setError] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [gameMode, setGameMode] = useState('timed');

    useEffect(() => {
        if (gameState === 'Menu' && playerName) {
            (async () => {
                setGameState('Loading');
                try {
                    const data = await startNewGame(playerName);
                    setGameData(data);
                    setScore(0);
                    setTimeLeft(START_TIME);
                    setTimerActive(false);
                    setGameState('Menu');
                    await fetchTopScores();
                } catch (err) {
                    setError(`Initialization error: ${err.message}`);
                    setGameState('Menu');
                }
            })();
        }
    }, [playerName]);

    useEffect(() => {
        if (gameMode === 'timed' && timerActive && gameState === 'Playing' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (gameMode === 'timed' && timeLeft === 0 && gameState === 'Playing') {
            handleEndGame();
        }
    }, [timerActive, gameState, timeLeft, gameMode]);

    useEffect(() => {
        if (gameState === 'Playing' || gameState === 'Solved') {
            fetchTopScores();
        }
    }, [gameState]);

    const startGame = async () => {
        if (!playerName) return;
        try {
            setGameState('Loading');
            setError(null);
            const data = await startNewGame(playerName);
            setGameData(data);
            setScore(0);
            setTimeLeft(START_TIME);
            setTimerActive(gameMode === 'timed');
            setGameState('Playing');
            fetchCurrentScore();
        } catch (err) {
            setError(`Error when starting the game: ${err.message}`);
            setGameState('Menu');
        }
    };

    const handleSwap = async (row1, col1, row2, col2) => {
        if (!gameData || gameState !== 'Playing') return;
        
        try {
            const data = await makeSwap(row1, col1, row2, col2);
            setGameData(data);
            fetchCurrentScore();
        } catch (err) {
            setError(`Ошибка хода: ${err.message}`);
        }
    };

    const fetchCurrentScore = async () => {
        try {
            const data = await getScore();
            setScore(data.score);
        } catch (err) {
            setError(`Error receiving invoice: ${err.message}`);
        }
    };

    const handleRestartGame = async () => {
        try {
            setGameState('Loading');
            setError(null);
            const data = await restartGame();
            setGameData(data);
            setScore(0);
            setTimeLeft(START_TIME);
            setTimerActive(false);
            setGameState('Menu');
            fetchCurrentScore();
        } catch (err) {
            setError(`Game restart error: ${err.message}`);
        }
    };

    const handleEndGame = async () => {
        try {
            setTimerActive(false);
            if (gameMode === 'timed') {
                await endGame(playerName, 'Bejeweled', score, isGuest);
                await fetchTopScores();
            }
            setGameState('Solved');
        } catch (err) {
            setError(`Game End Error: ${err.message}`);
        }
    };

    const fetchTopScores = async () => {
        try {
            const scores = await getTopScores('Bejeweled');
            setTopScores(scores);
        } catch (err) {
            setError(`Error loading points: ${err.message}`);
        }
    };

    const fetchComments = async () => {
        try {
            const comments = await getComments('Bejeweled');
            setComments(comments);
        } catch (err) {
            setError(`Error loading comments: ${err.message}`);
        }
    };

    const addComment = async (text) => {
        if (isGuest || !playerName) {
            setError('Only authorized users can leave comments.');
            return;
        }
        try {
            await submitComment('Bejeweled', playerName, text);
            await fetchComments();
        } catch (err) {
            setError(`Error sending comment: ${err.message}`);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const avg = await getRating('Bejeweled');
            setAverageRating(avg);
        } catch (err) {
            setError(`Error loading average rating: ${err.message}`);
        }
    };

    const fetchUserRating = async () => {
        if (isGuest || !playerName) {
            setUserRating(null);
            return;
        }

        try {
            const rate = await getUserRating('Bejeweled', playerName);
            setUserRating(rate);
        } catch (err) {
            setError(`Error loading your rating: ${err.message}`);
        }
    };

    const setRating = async (value) => {
        if (isGuest || !playerName) {
            setError('Only authorized users can rate.');
            return;
        }

        try {
            await submitRating('Bejeweled', playerName, value);
            await Promise.all([fetchAverageRating(), fetchUserRating()]);
        } catch (err) {
            setError(`Error sending rating: ${err.message}`);
        }
    };

    const value = {
        gameData,
        score,
        timeLeft,
        gameState,
        topScores,
        comments,
        averageRating,
        userRating,
        error,
        startGame,
        handleSwap,
        handleRestartGame,
        handleEndGame,
        addComment,
        setRating,
        timerActive,
        gameMode,
        setGameMode
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};