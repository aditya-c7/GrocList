import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Onboarding.css';

const slides = [
    {
        icon: '🛒',
        title: 'Welcome to GrocList',
        description: 'Your smart grocery and household list manager. Tap items to add them to your list with the perfect quantity.',
    },
    {
        icon: '📱',
        title: 'Easy Item Selection',
        description: 'Browse by category, search for items, or create your own custom items. Choose quantities with preset options or a smooth slider.',
    },
    {
        icon: '📋',
        title: 'Smart List Modes',
        description: 'Switch between Kirana mode (simple list) and Supermarket mode (organized by category). Save, share via WhatsApp, or export as PDF!',
    },
    {
        icon: '💡',
        title: 'Smart Suggestions',
        description: 'Get smart item pairing suggestions as you build your list. Never forget the essentials again!',
    },
];

export default function Onboarding() {
    const { setPreference } = useApp();
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < slides.length - 1) {
            setCurrent(current + 1);
        } else {
            setPreference('hasSeenOnboarding', true);
        }
    };

    const handleSkip = () => {
        setPreference('hasSeenOnboarding', true);
    };

    const slide = slides[current];

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card" key={current}>
                <button className="onboarding-skip" onClick={handleSkip}>Skip</button>

                <div className="onboarding-content animate-fade-in">
                    <span className="onboarding-icon">{slide.icon}</span>
                    <h2 className="onboarding-title">{slide.title}</h2>
                    <p className="onboarding-desc">{slide.description}</p>
                </div>

                <div className="onboarding-dots">
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`onboarding-dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>

                <button className="onboarding-next" onClick={handleNext}>
                    {current === slides.length - 1 ? 'Get Started' : 'Next'}
                </button>
            </div>
        </div>
    );
}
