import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import ShareExport from '../components/ShareExport';
import QuantityModal from '../components/QuantityModal';
import { ChevronDown, Edit3, Trash2, Save, Share2, XCircle } from 'lucide-react';
import './ListPage.css';

export default function ListPage() {
    const { currentList, preferences, setPreference, removeItem, saveToHistory, clearList } = useApp();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState({});
    const [showShare, setShowShare] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const mode = preferences.mode || 'supermarket';

    const grouped = useMemo(() => {
        if (mode !== 'supermarket') return {};
        const groups = {};
        currentList.forEach(item => {
            const cat = item.categoryName || 'Other';
            if (!groups[cat]) groups[cat] = { items: [], color: item.categoryColor || '#8b949e' };
            groups[cat].items.push(item);
        });
        return groups;
    }, [currentList, mode]);

    const toggleCollapse = useCallback((cat) => {
        setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));
    }, []);

    const handleSave = useCallback(() => {
        const name = prompt('Name this list:', `Shopping ${new Date().toLocaleDateString('en-IN')}`);
        if (name !== null && name.trim()) {
            saveToHistory(name.trim());
        }
    }, [saveToHistory]);

    const handleClear = useCallback(() => {
        if (confirm('Clear your current list?')) clearList();
    }, [clearList]);

    const handleCloseQuantityEdit = useCallback(() => {
        setEditingItem(null);
    }, []);

    if (currentList.length === 0) {
        return (
            <div className="list-page">
                <header className="list-header">
                    <h1 className="list-title">Your List</h1>
                </header>
                <div className="list-empty">
                    <span className="list-empty-icon">📝</span>
                    <p>Your list is empty</p>
                    <button className="go-add-btn" onClick={() => navigate('/')}>Add Items</button>
                </div>
            </div>
        );
    }

    let serial = 0;

    return (
        <div className="list-page">
            <header className="list-header">
                <h1 className="list-title">Your List</h1>
                <p className="list-subtitle">{currentList.length} item{currentList.length !== 1 ? 's' : ''}</p>
            </header>

            {/* Mode Toggle */}
            <div className="mode-toggle-wrap">
                <button
                    className={`mode-btn ${mode === 'kirana' ? 'active' : ''}`}
                    onClick={() => setPreference('mode', 'kirana')}
                >Kirana</button>
                <button
                    className={`mode-btn ${mode === 'supermarket' ? 'active' : ''}`}
                    onClick={() => setPreference('mode', 'supermarket')}
                >Supermarket</button>
            </div>

            {/* Kirana Mode */}
            {mode === 'kirana' && (
                <div className="simple-list">
                    {currentList.map(item => {
                        serial++;
                        return (
                            <div key={item.itemId} className="list-item-row">
                                <span className="item-serial">{serial}.</span>
                                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                <div className="item-info">
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-qty-display">{item.quantity} {item.unit}</div>
                                </div>
                                <div className="item-actions">
                                    <button className="item-action-btn" onClick={() => setEditingItem(item)}>
                                        <Edit3 size={14} />
                                    </button>
                                    <button className="item-action-btn delete" onClick={() => removeItem(item.itemId)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Supermarket Mode */}
            {mode === 'supermarket' && (
                <div className="grouped-list">
                    {Object.entries(grouped).map(([catName, { items, color }]) => (
                        <div key={catName} className="list-category-section">
                            <div className="category-header" onClick={() => toggleCollapse(catName)}>
                                <div className="category-header-left">
                                    <span className="cat-dot" style={{ background: color }} />
                                    {catName}
                                </div>
                                <span className="category-count">{items.length}</span>
                                <ChevronDown size={16} className={`chevron ${!collapsed[catName] ? 'open' : ''}`} />
                            </div>
                            {!collapsed[catName] && (
                                <div className="category-items-list">
                                    {items.map(item => {
                                        serial++;
                                        return (
                                            <div key={item.itemId} className="list-item-row">
                                                <span className="item-serial">{serial}.</span>
                                                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                                <div className="item-info">
                                                    <div className="item-name">{item.name}</div>
                                                    <div className="item-qty-display">{item.quantity} {item.unit}</div>
                                                </div>
                                                <div className="item-actions">
                                                    <button className="item-action-btn" onClick={() => setEditingItem(item)}>
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button className="item-action-btn delete" onClick={() => removeItem(item.itemId)}>
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="list-actions">
                <button className="list-action-btn primary" onClick={handleSave}>
                    <Save size={14} /> Save
                </button>
                <button className="list-action-btn secondary" onClick={() => setShowShare(true)}>
                    <Share2 size={14} /> Share
                </button>
                <button className="list-action-btn danger" onClick={handleClear}>
                    <XCircle size={14} /> Clear
                </button>
            </div>

            {showShare && <ShareExport onClose={() => setShowShare(false)} />}

            {editingItem && (
                <QuantityModal
                    item={{
                        id: editingItem.itemId,
                        name: editingItem.name,
                        icon: editingItem.icon,
                        defaultUnit: editingItem.unit,
                        categoryId: editingItem.categoryId,
                        categoryName: editingItem.categoryName,
                        categoryColor: editingItem.categoryColor,
                    }}
                    isOpen={true}
                    onClose={handleCloseQuantityEdit}
                />
            )}
        </div>
    );
}
