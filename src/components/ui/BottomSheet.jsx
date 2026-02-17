import { useState, useEffect, useRef } from 'react';
import './BottomSheet.css';

export default function BottomSheet({ isOpen, onClose, title, children }) {
    const [isVisible, setIsVisible] = useState(false);
    const sheetRef = useRef(null);
    const startY = useRef(0);
    const currentY = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setIsVisible(false);
    };

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        isDragging.current = true;
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        currentY.current = e.touches[0].clientY;
        const diff = currentY.current - startY.current;
        if (diff > 0 && sheetRef.current) {
            sheetRef.current.style.transform = `translateY(${diff}px)`;
            sheetRef.current.style.transition = 'none';
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = currentY.current - startY.current;
        if (sheetRef.current) {
            sheetRef.current.style.transition = '';
            sheetRef.current.style.transform = '';
        }
        if (diff > 60) {
            onClose();
        }
        startY.current = 0;
        currentY.current = 0;
    };

    if (!isVisible) return null;

    return (
        <div
            className={`bottom-sheet-overlay ${isOpen ? 'open' : 'closing'}`}
            onClick={onClose}
            onAnimationEnd={handleAnimationEnd}
        >
            <div
                ref={sheetRef}
                className={`bottom-sheet ${isOpen ? 'open' : 'closing'}`}
                onClick={e => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="bottom-sheet-handle" />
                {title && (
                    <div className="bottom-sheet-header">
                        <h3 className="bottom-sheet-title">{title}</h3>
                        <button className="bottom-sheet-close" onClick={onClose} aria-label="Close">✕</button>
                    </div>
                )}
                <div className="bottom-sheet-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
