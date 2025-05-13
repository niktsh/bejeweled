import React, { useState, useEffect, useRef } from 'react';
import Gem from './Gem';
import './Game.css';

export function GameBoard({ gameData, onSwap, gameState, onStartGame, score }) {
    const [dragStartTile, setDragStartTile] = useState(null);
    const [clickSelectedTile, setClickSelectedTile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [animationInProgress, setAnimationInProgress] = useState(false);
    const animationRef = useRef(null);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
            setDragStartTile(null);
        };
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    const handleMouseDown = (row, col) => {
        if (gameState !== 'Playing' || animationInProgress) return;
        setDragStartTile({ row, col });
        setIsDragging(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!isDragging || !dragStartTile || animationInProgress) return;

        const dRow = Math.abs(row - dragStartTile.row);
        const dCol = Math.abs(col - dragStartTile.col);
        const isNeighbor = dRow + dCol === 1;

        if (isNeighbor) {
            onSwap(dragStartTile.row, dragStartTile.col, row, col);
            setDragStartTile(null);
            setIsDragging(false);
        }
    };

    const handleClick = (row, col) => {
        if (gameState !== 'Playing' || animationInProgress) return;

        if (!clickSelectedTile) {
            setClickSelectedTile({ row, col });
        } else {
            const dRow = Math.abs(row - clickSelectedTile.row);
            const dCol = Math.abs(col - clickSelectedTile.col);
            const isNeighbor = dRow + dCol === 1;

            if (isNeighbor) {
                onSwap(clickSelectedTile.row, clickSelectedTile.col, row, col);
            }

            setClickSelectedTile(null);
        }
    };

    if (!gameData || !gameData.tiles) return <div>Loading...</div>;

    const getGemStyle = (rowIndex, colIndex) => {
        const isNewGem = gameData.tiles[rowIndex][colIndex].isNew;
        const isMatched = gameData.tiles[rowIndex][colIndex].isMatched;

        if (isNewGem || isMatched) {
            return {
                animation: isNewGem ? 'rotate-in 4s ease-out' : 'rotate-out 1.1s ease-in',
            };
        }
        return {};
    };

    return (
        <div className="game-container">
            <div className="board-container">
                <div className="game-board">
                    {gameData.tiles.map((row, rowIndex) =>
                        row.map((tile, colIndex) => {
                            const isSelected =
                                clickSelectedTile &&
                                clickSelectedTile.row === rowIndex &&
                                clickSelectedTile.col === colIndex;

                            const customStyle = getGemStyle(rowIndex, colIndex);
                            const isNewGem = tile.isNew;
                            const isFading = tile.isMatched;

                            let className = 'cell';
                            if (isSelected) className += ' selected';
                            if (isNewGem) className += ' fadeIn';
                            if (isFading) className += ' fadeOut';

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={className}
                                    style={customStyle}
                                >
                                    {tile.symbol && (
                                        <Gem
                                            symbol={tile.symbol || '@'}
                                            isSelected={isSelected}
                                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                            onClick={() => handleClick(rowIndex, colIndex)}
                                        />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {gameState === 'Menu' && (
                <div className="game-over-overlay">
                    <div className="game-over-card">
                        <button
                            className="play-again-button"
                            onClick={onStartGame}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}
            {gameState === 'Solved' && (
                <div className="game-over-overlay">
                    <div className="game-over-card">
                        <h3 className="game-over-text">Game Over!</h3>
                        <p>Your final score: <strong>{score}</strong></p>
                        <button
                            className="play-again-button"
                            onClick={onStartGame}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameBoard;