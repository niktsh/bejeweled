import React from "react";

export const TimerDisplay = ({ timeLeft }) => {
    const isLow = timeLeft <= 10;
    return (
        <span className={`time-value${isLow ? ' time-value-low' : ''}`}>{timeLeft}s</span>
    );
};
