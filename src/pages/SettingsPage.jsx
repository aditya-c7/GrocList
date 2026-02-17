import { useApp } from '../context/AppContext';
import { Type, LogOut, Trash2, Info } from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPage() {
    const { user, preferences, setPreference, logout } = useApp();

    const handleClearData = () => {
        if (confirm('This will clear all your data including lists, history, and custom items. Are you sure?')) {
            localStorage.clear();
            logout();
        }
    };

    return (
        <div className="settings-page">
            <header className="settings-header">
                <h1 className="settings-title">Settings</h1>
            </header>

            {user && (
                <section className="settings-section">
                    <h2 className="settings-section-title">Account</h2>
                    <div className="settings-card">
                        <div className="settings-user">
                            <div className="settings-avatar">{user.name?.[0] || '?'}</div>
                            <div>
                                <p className="settings-user-name">{user.name || 'User'}</p>
                                <p className="settings-user-email">{user.email || 'Guest'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="settings-section">
                <h2 className="settings-section-title">Preferences</h2>
                <div className="settings-card">
                    <div className="settings-row">
                        <div className="settings-row-info">
                            <Type size={18} />
                            <div>
                                <p className="settings-row-label">Elder-Friendly Mode</p>
                                <p className="settings-row-desc">Larger text and buttons</p>
                            </div>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={preferences.elderMode}
                                onChange={e => setPreference('elderMode', e.target.checked)}
                            />
                            <span className="toggle-slider" />
                        </label>
                    </div>

                    <div className="settings-row">
                        <div className="settings-row-info">
                            <Info size={18} />
                            <div>
                                <p className="settings-row-label">Default List Mode</p>
                                <p className="settings-row-desc">How your shopping list appears</p>
                            </div>
                        </div>
                        <select
                            className="settings-select"
                            value={preferences.mode}
                            onChange={e => setPreference('mode', e.target.value)}
                        >
                            <option value="supermarket">Supermarket</option>
                            <option value="kirana">Kirana</option>
                        </select>
                    </div>

                    <div className="settings-row">
                        <div className="settings-row-info">
                            <Info size={18} />
                            <div>
                                <p className="settings-row-label">Show Onboarding</p>
                                <p className="settings-row-desc">See the app walkthrough again</p>
                            </div>
                        </div>
                        <button
                            className="settings-mini-btn"
                            onClick={() => setPreference('hasSeenOnboarding', false)}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h2 className="settings-section-title">Danger Zone</h2>
                <div className="settings-card">
                    <button className="settings-danger-btn" onClick={handleClearData}>
                        <Trash2 size={16} />
                        Clear All Data
                    </button>
                    <button className="settings-danger-btn logout" onClick={logout}>
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </section>

            <footer className="settings-footer">
                <p>GrocList v1.0</p>
                <p>Smart Grocery & Household List Manager</p>
            </footer>
        </div>
    );
}
