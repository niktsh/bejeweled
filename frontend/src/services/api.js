const API_BASE_URL = 'http://localhost:8080';

//request processing
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        let errorData = {};

        try {
            errorData = JSON.parse(errorText);
        } catch (_) {
        }

        throw new Error(errorData.error || `HTTP error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }

    return null;
};

export const startNewGame = async (userName) => {
    const response = await fetch(`${API_BASE_URL}/bejeweled/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            rows: 8,
            cols: 8,
            userName
        }),
    });

    return handleResponse(response);
};

export const makeSwap = async (row1, col1, row2, col2) => {
    const response = await fetch(`${API_BASE_URL}/bejeweled/swap`, {
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

    return handleResponse(response);
};

export const getScore = async () => {
    const response = await fetch(`${API_BASE_URL}/bejeweled/score`, {
        credentials: 'include'
    });

    return handleResponse(response);
};

export const restartGame = async () => {
    const response = await fetch(`${API_BASE_URL}/bejeweled/restart`, {
        method: 'POST',
        credentials: 'include'
    });

    return handleResponse(response);
};

export const endGame = async (player, gameName, points, isGuest) => {
    if (!isGuest && player) {
        try {
            await fetch(`${API_BASE_URL}/api/score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player,
                    game: gameName,
                    points,
                    playedOn: new Date()
                })
            });
        } catch (error) {
            console.error('Error saving result:', error);
        }
    }

    const response = await fetch(`${API_BASE_URL}/bejeweled/gameover`, {
        method: 'POST',
        credentials: 'include'
    });

    return handleResponse(response);
};


export const getTopScores = async (gameName) => {
    const response = await fetch(`${API_BASE_URL}/api/score/${gameName}`);
    return handleResponse(response);
};

export const getComments = async (gameName) => {
    const response = await fetch(`${API_BASE_URL}/api/comment/${gameName}`);
    return handleResponse(response);
};

export const submitComment = async (gameName, player, comment) => {
    const response = await fetch(`${API_BASE_URL}/api/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            game: gameName,
            player,
            comment,
            commentedOn: new Date()
        })
    });

    return handleResponse(response);
};

export const getRating = async (gameName) => {
    const response = await fetch(`${API_BASE_URL}/api/rating/${gameName}`);
    return handleResponse(response);
};

export const getUserRating = async (gameName, player) => {
    const response = await fetch(`${API_BASE_URL}/api/rating/${gameName}/${player}`);
    return handleResponse(response);
};

export const submitRating = async (gameName, player, rating) => {
    const response = await fetch(`${API_BASE_URL}/api/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            game: gameName,
            player,
            rating,
            ratedOn: new Date().toISOString()
        })
    });

    return handleResponse(response);
};

