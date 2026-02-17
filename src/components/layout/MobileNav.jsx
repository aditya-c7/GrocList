import { NavLink, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Clock, Settings } from 'lucide-react';
import './MobileNav.css';

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/list', icon: ClipboardList, label: 'My List' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav() {
    const location = useLocation();

    return (
        <nav className="mobile-nav">
            {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={`mobile-nav-item ${location.pathname === path ? 'active' : ''}`}
                >
                    <Icon size={20} strokeWidth={location.pathname === path ? 2.5 : 1.8} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
