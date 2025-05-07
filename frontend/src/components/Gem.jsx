import React from 'react';

// Используем стилизованные div вместо 3D-объектов
function Gem({ symbol, onClick, isSelected }) {
    // Определяем цвета и стили для разных типов гемов
    const getGemStyle = () => {
        const baseStyle = {
            width: '100%',
            height: '100%',
            borderRadius: '15%',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isSelected
                ? '0 0 15px 5px gold, inset 0 0 10px rgba(255,255,255,0.8)'
                : '0 3px 6px rgba(0,0,0,0.3), inset 0 0 5px rgba(255,255,255,0.5)',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.8)'
        };

        // Символы из JSON: @, #, !, ?, $, *, %
        switch (symbol) {
            case '@': // Красный - ромб (Red)
                return {
                    ...baseStyle,
                    backgroundColor: '#f44336',
                    transform: `${baseStyle.transform} rotate(45deg)`,
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '#': // Зеленый - шестиугольник (Green)
                return {
                    ...baseStyle,
                    backgroundColor: '#4CAF50',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '!': // Синий - звезда (Blue)
                return {
                    ...baseStyle,
                    backgroundColor: '#2196F3',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '*': // Желтый - квадрат (Yellow)
                return {
                    ...baseStyle,
                    backgroundColor: '#FFEB3B',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '$': // Фиолетовый - восьмиугольник (Violet)
                return {
                    ...baseStyle,
                    backgroundColor: '#9C27B0',
                    borderRadius: '12px',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '?': // Розовый - круг (Pink)
                return {
                    ...baseStyle,
                    backgroundColor: '#E91E63', // Розовый
                    borderRadius: '50%',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            case '%': // Оранжевый - треугольник (Empty/Default)
                return {
                    ...baseStyle,
                    backgroundColor: '#FF9800',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
            default:
                return {
                    ...baseStyle,
                    backgroundColor: '#757575', // Серый для неизвестных символов
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
                };
        }
    };

    const gemStyle = getGemStyle();

    // Определяем символ для отображения внутри гема
    const getGemSymbol = () => {
        switch (symbol) {
            case '@': return 'R'; // Red
            case '#': return 'G'; // Green
            case '!': return 'B'; // Blue
            case '*': return 'Y'; // Yellow
            case '$': return 'V'; // Violet
            case '?': return 'P'; // Pink
            case '%': return 'O'; // Orange
            default: return '?';
        }
    };

    return (
        <div
            style={gemStyle}
            onClick={onClick}
        >
            {/* Отображаем буквенное обозначение в гемах */}
            <span style={{
                position: 'relative',
                zIndex: 3,
                transform: symbol === '@' ? 'rotate(-45deg)' : 'none' // Для ромба поворачиваем символ обратно
            }}>{getGemSymbol()}</span>

            {/* Дополнительный внутренний эффект для каждого гема */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '15%',
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                zIndex: 2
            }}></div>
        </div>
    );
}

export default Gem;
