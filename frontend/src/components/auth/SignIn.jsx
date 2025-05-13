import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signInWithGoogle, signInAsGuest, error } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [activeField, setActiveField] = useState(null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;
        setLoading(true);
        const success = await signIn(email, password);
        setLoading(false);
        if (success) navigate(from, { replace: true });
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const success = await signInWithGoogle();
        setLoading(false);
        if (success) navigate(from, { replace: true });
    };

    const handleGuestSignIn = () => {
        signInAsGuest('Guest');
        navigate('/game');
    };

    const hasValue = (field) => {
        return field && field.trim() !== '';
    };

    return (
        <div className="login-card">
            <div className="login-card-inner">
                <div className="card-background">
                    <div className="bg-shape shape-1"></div>
                    <div className="bg-shape shape-2"></div>
                    <div className="bg-shape shape-3"></div>
                    <div className="bg-shape shape-4"></div>
                </div>
                
                <div className="card-content">
                    <div className="login-header">
                        <h1 className="login-title">Bejeweled</h1>
                        <p className="login-subtitle">Enter your credentials to access your account</p>
                    </div>
                    
                    {error && (
                        <div className="error-container">
                            <div className="error-icon">!</div>
                            <div className="error-message">{error}</div>
                        </div>
                    )}
                    
                    <form className="login-form" onSubmit={handleSignIn}>
                        <div className={`form-field ${activeField === 'email' ? 'active' : ''} ${hasValue(email) ? 'has-value' : ''}`}>
                            <label htmlFor="email">
                                <span className="field-icon email-icon"></span>
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setActiveField('email')}
                                onBlur={() => setActiveField(null)}
                                autoComplete="email"
                            />
                            <span className="field-bar"></span>
                        </div>
                        
                        <div className={`form-field ${activeField === 'password' ? 'active' : ''} ${hasValue(password) ? 'has-value' : ''}`}>
                            <label htmlFor="password">
                                <span className="field-icon password-icon"></span>
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setActiveField('password')}
                                onBlur={() => setActiveField(null)}
                                autoComplete="current-password"
                            />
                            <span className="field-bar"></span>
                        </div>
                        
                        <button
                            type="submit"
                            className={`submit-button ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            <span className="button-text">Sign In</span>
                            <span className="button-arrow">→</span>
                            <span className="button-loader"></span>
                        </button>
                    </form>
                    
                    <div className="or-divider">
                        <div className="divider-line"></div>
                        <div className="divider-text">or</div>
                        <div className="divider-line"></div>
                    </div>
                    
                    <div className="alternative-login">
                        <button
                            className="google-button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <span className="google-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                        
                        <button
                            className="guest-button"
                            onClick={handleGuestSignIn}
                            disabled={loading}
                        >
                            <span className="guest-icon"></span>
                            Continue as Guest
                        </button>
                    </div>
                    
                    <div className="signup-prompt">
                        <span>Don't have an account?</span>
                        <Link to="/signup" className="signup-link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;