import React, { useState } from 'react';
import Gem from './Gem';

export function GameBoard({ gameData, onSwap, gameState }) {
    const [selectedTile, setSelectedTile] = useState(null);

    const handleTileClick = (row, col) => {
        if (gameState !== 'Playing') return;
        if (selectedTile === null) {
            setSelectedTile({ row, col });
        } else {
            onSwap(selectedTile.row, selectedTile.col, row, col);
            setSelectedTile(null);
        }
    };

    if (!gameData || !gameData.tiles) return <div>Загрузка...</div>;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px',
            perspective: '1000px'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gameData.columns || 8}, 60px)`,
                gridTemplateRows: `repeat(${gameData.rows || 8}, 60px)`,
                gap: '5px',
                backgroundColor: '#333',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                transform: 'rotateX(5deg)'
            }}>
                {gameData.tiles.map((row, rowIndex) =>
                    row.map((tile, colIndex) => {
                        const isSelected =
                            selectedTile &&
                            selectedTile.row === rowIndex &&
                            selectedTile.col === colIndex;

                        return (
                            <Gem
                                key={`${rowIndex}-${colIndex}`}
                                symbol={tile.symbol ? tile.symbol : '@'} // Используем полный символ из JSON
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                                isSelected={isSelected}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default GameBoard;