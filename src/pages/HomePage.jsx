import { useState, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getAllItems } from '../data/categories';
import { getSuggestions } from '../data/suggestions';
import { useDebounce } from '../hooks/useDebounce';
import ItemCard from '../components/ItemCard';
import QuantityModal from '../components/QuantityModal';
import CustomItemModal from '../components/CustomItemModal';
import SuggestionCard from '../components/SuggestionCard';
import { Search, Plus } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
    const { currentList, user, allItems, addItem, hiddenItems, hideItem } = useApp();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [customModalCategoryId, setCustomModalCategoryId] = useState(null);
    const [dismissedSuggestions, setDismissedSuggestions] = useState([]);
    const [editingCategories, setEditingCategories] = useState({});
    const tappedRef = useRef(false);

    const debouncedSearch = useDebounce(searchQuery, 200);
    const hiddenSet = useMemo(() => new Set(hiddenItems || []), [hiddenItems]);

    const categories = useMemo(() => {
        const cats = CATEGORIES.map(c => {
            const customItems = (allItems || []).filter(i => i.categoryId === c.id && i.isCustom);
            return {
                ...c,
                items: [...c.items.map(item => ({ ...item, categoryId: c.id, categoryName: c.name, categoryColor: c.color })), ...customItems]
            };
        });
        return cats;
    }, [allItems]);

    const filteredItems = useMemo(() => {
        if (debouncedSearch) {
            const all = categories.flatMap(c => c.items);
            return all.filter(i =>
                i.name.toLowerCase().includes(debouncedSearch.toLowerCase()) && !hiddenSet.has(i.id)
            );
        }
        if (activeCategory === 'all') return null;
        const cat = categories.find(c => c.id === activeCategory);
        return cat ? cat.items.filter(i => !hiddenSet.has(i.id)) : [];
    }, [debouncedSearch, activeCategory, categories, hiddenSet]);

    const suggestions = useMemo(() => {
        const s = getSuggestions(currentList);
        return s.filter(sg => !dismissedSuggestions.includes(sg.id));
    }, [currentList, dismissedSuggestions]);

    const getSelectedQty = useCallback((itemId) => {
        return currentList.find(i => i.itemId === itemId);
    }, [currentList]);

    const handleItemSelect = useCallback((item) => {
        if (tappedRef.current) return;
        tappedRef.current = true;
        setTimeout(() => { tappedRef.current = false; }, 300);
        setSelectedItem(item);
    }, []);

    const handleCloseQuantity = useCallback(() => {
        setSelectedItem(null);
    }, []);

    const handleSuggestionAdd = useCallback((item) => {
        addItem({
            itemId: item.id,
            name: item.name,
            icon: item.icon,
            quantity: 1,
            unit: item.defaultUnit,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            categoryColor: item.categoryColor,
        });
    }, [addItem]);

    const handleDismissSuggestion = useCallback((id) => {
        setDismissedSuggestions(prev => [...prev, id]);
    }, []);

    const toggleEditMode = useCallback((catId) => {
        setEditingCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
    }, []);

    const handleHideItem = useCallback((itemId) => {
        hideItem(itemId);
    }, [hideItem]);

    const handleAddItemInCategory = useCallback((catId) => {
        setCustomModalCategoryId(catId);
        setShowCustomModal(true);
    }, []);

    const handleCloseCustomModal = useCallback(() => {
        setShowCustomModal(false);
        setCustomModalCategoryId(null);
    }, []);

    const renderItems = (items, catId) => {
        const isEditing = editingCategories[catId];
        // In normal mode, filter out hidden items; in edit mode, show all
        const visibleItems = isEditing ? items : items.filter(i => !hiddenSet.has(i.id));

        return (
            <div className="item-grid">
                {visibleItems.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        isSelected={!!getSelectedQty(item.id)}
                        selectedQty={getSelectedQty(item.id)}
                        onSelect={handleItemSelect}
                        editMode={isEditing}
                        onRemove={handleHideItem}
                    />
                ))}
                {isEditing && (
                    <button
                        className="add-item-card"
                        onClick={() => handleAddItemInCategory(catId)}
                    >
                        <Plus size={20} strokeWidth={1.5} />
                        <span>Add Item</span>
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="home-page">
            {/* Header */}
            <header className="home-header">
                <div className="home-top-row">
                    <h1 className="home-greeting">
                        Hi, {user?.name?.split(' ')[0] || 'there'}
                    </h1>
                    {currentList.length > 0 && (
                        <span className="home-list-count">{currentList.length} items</span>
                    )}
                </div>
                <div className="home-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* Category Tabs */}
            {!debouncedSearch && (
                <div className="category-tabs">
                    <button
                        className={`cat-tab ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >All</button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Suggestions */}
            {suggestions.slice(0, 3).map(s => (
                <SuggestionCard
                    key={s.id}
                    suggestion={s}
                    onAdd={handleSuggestionAdd}
                    onDismiss={() => handleDismissSuggestion(s.id)}
                />
            ))}

            {/* Item Grid */}
            <div className="home-content">
                {debouncedSearch ? (
                    filteredItems.length === 0 ? (
                        <div className="empty-items">
                            <p>No items found for "{debouncedSearch}"</p>
                        </div>
                    ) : (
                        <div className="item-grid">
                            {filteredItems.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    isSelected={!!getSelectedQty(item.id)}
                                    selectedQty={getSelectedQty(item.id)}
                                    onSelect={handleItemSelect}
                                />
                            ))}
                        </div>
                    )
                ) : activeCategory === 'all' ? (
                    categories.map(cat => (
                        <div key={cat.id} className="category-section">
                            <div className="category-header-row">
                                <span className="category-label">{cat.name}</span>
                                <button
                                    className={`edit-toggle-btn ${editingCategories[cat.id] ? 'active' : ''}`}
                                    onClick={() => toggleEditMode(cat.id)}
                                >
                                    {editingCategories[cat.id] ? 'Done' : 'Edit'}
                                </button>
                            </div>
                            {renderItems(
                                cat.items.map(item => ({ ...item, categoryId: cat.id, categoryName: cat.name, categoryColor: cat.color })),
                                cat.id
                            )}
                        </div>
                    ))
                ) : (
                    (() => {
                        const cat = categories.find(c => c.id === activeCategory);
                        if (!cat) return renderItems([], activeCategory);
                        return (
                            <div className="category-section">
                                <div className="category-header-row">
                                    <span className="category-label">{cat.name}</span>
                                    <button
                                        className={`edit-toggle-btn ${editingCategories[cat.id] ? 'active' : ''}`}
                                        onClick={() => toggleEditMode(cat.id)}
                                    >
                                        {editingCategories[cat.id] ? 'Done' : 'Edit'}
                                    </button>
                                </div>
                                {renderItems(
                                    cat.items.map(item => ({ ...item, categoryId: cat.id, categoryName: cat.name, categoryColor: cat.color })),
                                    cat.id
                                )}
                            </div>
                        );
                    })()
                )}
            </div>

            {/* FAB */}
            <button className="fab" onClick={() => { setCustomModalCategoryId(null); setShowCustomModal(true); }} aria-label="Add custom item">
                <Plus size={22} />
            </button>

            {/* Modals */}
            <QuantityModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={handleCloseQuantity}
            />

            {showCustomModal && (
                <CustomItemModal
                    isOpen={true}
                    onClose={handleCloseCustomModal}
                    defaultCategoryId={customModalCategoryId}
                />
            )}
        </div>
    );
}
