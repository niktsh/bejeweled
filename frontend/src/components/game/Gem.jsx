import React, { useState, useEffect } from 'react';
import './Game.css';

function Gem({ symbol, onClick, onMouseDown, onMouseEnter, isSelected }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const getGemProperties = () => {
        switch(symbol) {
            case '@': return {
                color: '#e53935',
                gradientLight: '#ff5252',
                gradientDark: '#b71c1c',
                shape: 'diamond',
                glow: 'rgba(229, 57, 53, 0.7)'
            };
            case '#': return {
                color: '#43a047',
                gradientLight: '#66bb6a',
                gradientDark: '#2e7d32',
                shape: 'hexagon',
                glow: 'rgba(67, 160, 71, 0.7)'
            };
            case '!': return {
                color: '#1e88e5',
                gradientLight: '#42a5f5',
                gradientDark: '#0d47a1',
                shape: 'star',
                glow: 'rgba(30, 136, 229, 0.7)'
            };
            case '*': return {
                color: '#fdd835',
                gradientLight: '#ffee58',
                gradientDark: '#f9a825',
                shape: 'square',
                glow: 'rgba(253, 216, 53, 0.7)'
            };
            case '$': return {
                color: '#8e24aa',
                gradientLight: '#ab47bc',
                gradientDark: '#6a1b9a',
                shape: 'octagon',
                glow: 'rgba(142, 36, 170, 0.7)'
            };
            case '?': return {
                color: '#ec407a',
                gradientLight: '#f06292',
                gradientDark: '#c2185b',
                shape: 'circle',
                glow: 'rgba(236, 64, 122, 0.7)'
            };
            case '%': return {
                color: '#ff7043',
                gradientLight: '#ff9e80',
                gradientDark: '#e64a19',
                shape: 'triangle',
                glow: 'rgba(255, 112, 67, 0.7)'
            };
            default: return {
                color: '#757575',
                gradientLight: '#9e9e9e',
                gradientDark: '#424242',
                shape: 'circle',
                glow: 'rgba(117, 117, 117, 0.7)'
            };
        }
    };

    const props = getGemProperties();

    const baseStyle = {
        width: '90%',
        height: '90%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'scale(1)' : 'scale(0.5) rotate(-15deg)',
    };

    const getShapeStyle = () => {
        const commonStyle = {
            ...baseStyle,
            backgroundColor: props.color,
            boxShadow: isSelected
                ? `0 0 25px 10px ${props.glow}, inset 0 0 15px rgba(255,255,255,0.8)`
                : isHovered
                    ? `0 8px 16px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.7)`
                    : `0 5px 10px rgba(0,0,0,0.3), inset 0 0 8px rgba(255,255,255,0.6)`,
            transform: isSelected
                ? 'scale(1.15) translateY(-2px)'
                : isHovered
                    ? 'scale(1.08) translateY(-1px)'
                    : isLoaded ? 'scale(1)' : 'scale(0.5) rotate(-15deg)',
            backgroundImage: `radial-gradient(circle at 30% 30%, ${props.gradientLight} 0%, ${props.color} 45%, ${props.gradientDark} 100%)`,
            width: '100%',
            height: '100%',
            margin: 0,
        };

        switch(props.shape) {
            case 'diamond':
                return {
                    ...commonStyle,
                    transform: `${commonStyle.transform} scale(0.75) rotate(45deg)`,
                    borderRadius: '15%',
                };
            case 'hexagon':
                return { ...commonStyle, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' };
            case 'star':
                return { ...commonStyle, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' };
            case 'square':
                return { ...commonStyle, borderRadius: '12%' };
            case 'octagon':
                return { ...commonStyle, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' };
            case 'circle':
                return { ...commonStyle, borderRadius: '50%' };
            case 'triangle':
                return { ...commonStyle, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' };
            default:
                return commonStyle;
        }
    };

    const gemStyle = getShapeStyle();

    return (
        <div
            style={gemStyle}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '15%',    
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                filter: 'blur(2px)',
            }} />

        </div>
    );
}

export default Gem;