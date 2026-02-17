import { NavLink, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Clock, Settings, ShoppingCart, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Sidebar.css';

const navItems = [
    { path: '/', icon: Home, label: 'Browse Items' },
    { path: '/list', icon: ClipboardList, label: 'My List' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
    const location = useLocation();
    const { user, currentList, logout } = useApp();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <ShoppingCart size={20} />
                    <span>GrocList</span>
                </div>
                {user && (
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">{user.name?.[0] || '?'}</div>
                        <span className="sidebar-username">{user.name || user.email}</span>
                    </div>
                )}
            </div>

            <nav className="sidebar-nav">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={`sidebar-nav-item ${location.pathname === path ? 'active' : ''}`}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                        {path === '/list' && currentList.length > 0 && (
                            <span className="sidebar-badge">{currentList.length}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-nav-item logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
