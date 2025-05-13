import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getComments, submitComment } from '../../services/api';

const styles = {
    title: {
        fontSize: '1.5rem',
        color: 'white',
        marginBottom: '20px',
        fontWeight: '600'
    },
    commentsList: {
        maxHeight: '500px',
        overflowY: 'auto',
        marginBottom: '20px',
        paddingRight: '10px'
    },
    commentItem: {
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'transform 0.2s ease',
    },
    commentItemHover: {
        transform: 'translateX(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    playerName: {
        fontWeight: '600',
        color: 'white'
    },
    commentDate: {
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.5)'
    },
    commentText: {
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '1.5',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap'
    },
    inputSection: {
        marginTop: '20px'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        marginBottom: '10px',
        fontSize: '1rem',
        color: 'white',
        resize: 'vertical',
        minHeight: '120px',
        maxHeight: '400px',
        transition: 'border-color 0.3s ease'
    },
    textareaFocus: {
        borderColor: '#3268f1',
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(50, 104, 241, 0.2)'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#3268f1',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
    },
    buttonHover: {
        backgroundColor: '#2a5bd9',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.3)',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none'
    },
    loginMessage: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.9rem',
        marginTop: '10px',
        fontStyle: 'italic'
    },
    noComments: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
    }
};

const CommentsSection = ({ gameId = 'Bejeweled' }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { currentUser, isGuest, playerName } = useContext(AuthContext);

    useEffect(() => {
        loadComments();
    }, [gameId]);

    const loadComments = async () => {
        try {
            const data = await getComments(gameId);
            setComments(data);
        } catch (err) {
            console.error('Failed to load comments:', err);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        if (isGuest || !currentUser) {
            alert('Only registered users can leave comments.');
            return;
        }

        try {
            await submitComment(gameId, playerName, newComment);
            setNewComment('');
            await loadComments();
        } catch (err) {
            console.error('Failed to submit comment:', err);
        }
    };

    return (
        <div>
            <h3 style={styles.title}>Comments</h3>

            <div style={styles.commentsList}>
                {comments.length === 0 ? (
                    <div style={styles.noComments}>
                        No comments yet. Be the first to leave feedback!
                    </div>
                ) : (
                    comments.map((comment, index) => (
                        <div
                            key={index}
                            style={styles.commentItem}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.commentItemHover)}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                            }}
                        >
                            <div style={styles.commentContent}>
                                <div style={styles.commentHeader}>
                                    <span style={styles.playerName}>{comment.player}</span>
                                    <span style={styles.commentDate}>
                                        {new Date(comment.commentedOn).toLocaleString()}
                                    </span>
                                </div>
                                <p style={styles.commentText}>{comment.comment}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div style={styles.inputSection}>
                <textarea
                    style={{
                        ...styles.textarea,
                        ...(document.activeElement === document.querySelector('textarea') ? styles.textareaFocus : {})
                    }}
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isGuest || !currentUser}
                />
                <button
                    style={{
                        ...styles.button,
                        ...(isGuest || !currentUser || !newComment.trim() ? styles.buttonDisabled : {})
                    }}
                    onClick={handleAddComment}
                    disabled={isGuest || !currentUser || !newComment.trim()}
                    onMouseOver={(e) => {
                        if (!isGuest && currentUser && newComment.trim()) {
                            Object.assign(e.target.style, styles.buttonHover);
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isGuest && currentUser && newComment.trim()) {
                            e.target.style.backgroundColor = '#3268f1';
                            e.target.style.transform = 'none';
                            e.target.style.boxShadow = 'none';
                        }
                    }}
                >
                    Submit
                </button>
                {(isGuest || !currentUser) && (
                    <p style={styles.loginMessage}>
                        Please sign in to leave a comment
                    </p>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;