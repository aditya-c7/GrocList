import './SuggestionCard.css';
import { getItemById } from '../data/categories';

export default function SuggestionCard({ suggestion, onAdd, onDismiss }) {
    return (
        <div className="suggestion-card animate-slide-up">
            <div className="suggestion-text">
                <span className="suggestion-icon">💡</span>
                <p>{suggestion.message}</p>
            </div>
            <div className="suggestion-items">
                {suggestion.items.map(itemId => {
                    const item = getItemById(itemId);
                    if (!item) return null;
                    return (
                        <button
                            key={itemId}
                            className="suggestion-item-btn"
                            onClick={() => onAdd(item)}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                            <span className="suggestion-add">+</span>
                        </button>
                    );
                })}
            </div>
            <button className="suggestion-dismiss" onClick={onDismiss}>
                Dismiss
            </button>
        </div>
    );
}
