// src/components/StartMenu.jsx
import React, { useState } from 'react';

const StartMenu = ({ onStartGame }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.trim()) {
            onStartGame(name);  // Вызываем функцию при отправке формы, передаем имя
        } else {
            alert('Please enter your name');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Bejeweled!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Start Game</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'lightblue',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default StartMenu;
