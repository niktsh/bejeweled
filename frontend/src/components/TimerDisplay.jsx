// components/TimerDisplay.jsx
import React, { useEffect, useState } from "react";

export const TimerDisplay = ({ timeLeft, onTimeUp }) => {
    return (
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: timeLeft <= 10 ? 'red' : 'black' }}>
            Time Left: {timeLeft}s
        </div>
    );
};
