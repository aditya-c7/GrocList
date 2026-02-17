import { memo } from 'react';
import './ItemCard.css';

const ItemCard = memo(function ItemCard({ item, isSelected, onSelect, selectedQty, editMode, onRemove }) {
    const handleClick = () => {
        if (editMode) return; // don't select items in edit mode
        onSelect(item);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        onRemove(item.id);
    };

    return (
        <button
            className={`item-card ${isSelected ? 'card-active selected' : ''} ${editMode ? 'edit-mode' : ''}`}
            onClick={handleClick}
        >
            {editMode && (
                <span className="item-card-remove" onClick={handleRemove} aria-label="Hide item">✕</span>
            )}
            <span className="item-card-icon">{item.icon}</span>
            <span className="item-card-name">{item.name}</span>
            {!editMode && isSelected && selectedQty && (
                <span className="item-card-qty">{selectedQty.quantity} {selectedQty.unit}</span>
            )}
            {!editMode && isSelected && <div className="item-card-check">✓</div>}
        </button>
    );
});

export default ItemCard;
