import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import BottomSheet from './ui/BottomSheet';
import './CustomItemModal.css';

export default function CustomItemModal({ isOpen, onClose, editItem, defaultCategoryId }) {
    const { addCustomItem, editCustomItem } = useApp();
    const [name, setName] = useState(editItem?.name || '');
    const [categoryId, setCategoryId] = useState(editItem?.categoryId || defaultCategoryId || CATEGORIES[0].id);
    const [icon, setIcon] = useState(editItem?.icon || '📦');
    const [defaultUnit, setDefaultUnit] = useState(editItem?.defaultUnit || 'kg');

    const handleSave = () => {
        if (!name.trim()) return;

        if (editItem) {
            editCustomItem({ id: editItem.id, name: name.trim(), icon, categoryId, defaultUnit });
        } else {
            addCustomItem({ name: name.trim(), icon, categoryId, defaultUnit });
        }
        setName('');
        setIcon('📦');
        onClose();
    };

    const commonIcons = ['📦', '🛒', '🧴', '🍽️', '🥫', '🧃', '🫙', '🧊', '🌾', '🍶', '🧹', '💊', '🪥', '🧻', '🔋', '🪣'];
    const units = ['g', 'kg', 'ml', 'L', 'pcs'];

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title={editItem ? 'Edit Item' : 'Add Custom Item'}>
            <div className="custom-item-form">
                <div className="form-group">
                    <label className="form-label">Item Name</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., Coconut Milk"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Icon</label>
                    <div className="icon-grid">
                        {commonIcons.map(ic => (
                            <button
                                key={ic}
                                className={`icon-btn ${icon === ic ? 'active' : ''}`}
                                onClick={() => setIcon(ic)}
                            >
                                {ic}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Default Unit</label>
                    <div className="unit-row">
                        {units.map(u => (
                            <button
                                key={u}
                                className={`unit-btn ${defaultUnit === u ? 'active' : ''}`}
                                onClick={() => setDefaultUnit(u)}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={!name.trim()}
                >
                    {editItem ? 'Save Changes' : 'Add Item'}
                </button>
            </div>
        </BottomSheet>
    );
}
