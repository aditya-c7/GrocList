import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Mail, User } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
    const { login, setPreferences } = useApp();
    const [mode, setMode] = useState('welcome');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const handleEmailLogin = () => {
        setError('');
        if (!name.trim()) { setError('Please enter your name'); return; }
        if (!validateEmail(email)) { setError('Please enter a valid email'); return; }
        if (password.length < 4) { setError('Password must be at least 4 characters'); return; }

        login({ id: 'email-' + email.toLowerCase(), name: name.trim(), email: email.trim(), provider: 'email' });
        setPreferences({ hasSeenOnboarding: false });
    };

    const handleGuestLogin = () => {
        login({ id: 'guest-' + Date.now(), name: 'Guest', provider: 'guest' });
        setPreferences({ hasSeenOnboarding: false });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleEmailLogin();
    };

    return (
        <div className="login-page">
            <div className="login-card animate-fade-in">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <ShoppingCart size={28} />
                    </div>
                    <h1 className="login-app-name">GrocList</h1>
                    <p className="login-subtitle">Smart Grocery & Household Manager</p>
                </div>

                {mode === 'welcome' ? (
                    <div className="login-methods animate-fade-in">
                        <button className="login-btn primary" onClick={() => setMode('email')}>
                            <Mail size={16} />
                            <span>Login with Email</span>
                        </button>

                        <div className="login-divider"><span>or</span></div>

                        <button className="login-btn secondary" onClick={handleGuestLogin}>
                            <User size={16} />
                            <span>Continue as Guest</span>
                        </button>

                        <p className="guest-note">Guest data is temporary and stored locally only.</p>
                    </div>
                ) : (
                    <div className="login-email-form animate-fade-in" onKeyDown={handleKeyDown}>
                        {error && <div className="login-error">{error}</div>}

                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Your name"
                                value={name}
                                onChange={e => { setName(e.target.value); setError(''); }}
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(''); }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                            />
                        </div>
                        <button
                            className="login-btn primary"
                            onClick={handleEmailLogin}
                            disabled={!email.trim() || !name.trim() || !password.trim()}
                        >
                            Get Started
                        </button>
                        <button className="back-btn" onClick={() => { setMode('welcome'); setError(''); }}>
                            ← Back
                        </button>
                    </div>
                )}

                <p className="login-footer">Your data is stored securely on your device</p>
            </div>
        </div>
    );
}
