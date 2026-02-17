import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Copy, Edit3, Search, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

export default function HistoryPage() {
    const { history, loadList, deleteHistory, renameHistory, currentList } = useApp();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredHistory = useMemo(() => {
        if (!searchQuery) return history;
        return history.filter(h =>
            h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [history, searchQuery]);

    const handleLoadList = (items) => {
        if (currentList.length > 0 && !confirm('This will replace your current list. Continue?')) return;
        loadList(items);
        navigate('/list');
    };

    const handleDuplicate = (entry) => {
        loadList(entry.items);
        navigate('/list');
    };

    const handleRename = (entry) => {
        const name = prompt('Rename list:', entry.name);
        if (name !== null && name.trim()) {
            renameHistory(entry.id, name.trim());
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this list from history?')) {
            deleteHistory(id);
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="history-page">
            <header className="history-header">
                <h1 className="history-title">History</h1>
                <p className="history-subtitle">{history.length} saved list{history.length !== 1 ? 's' : ''}</p>
            </header>

            {history.length > 0 && (
                <div className="history-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search lists..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            )}

            {history.length > 0 && (
                <button className="use-last-btn" onClick={() => handleLoadList(history[0].items)}>
                    <Clock size={18} />
                    <div>
                        <span className="use-last-label">Use Last List</span>
                        <span className="use-last-info">{history[0].name} • {history[0].itemCount} items</span>
                    </div>
                </button>
            )}

            {filteredHistory.length === 0 ? (
                <div className="empty-state animate-fade-in">
                    <p className="empty-icon">📋</p>
                    <p className="empty-text">{history.length === 0 ? 'No saved lists yet' : 'No matching lists'}</p>
                    <p className="empty-subtext">{history.length === 0 ? 'Save your current list to see it here' : 'Try a different search'}</p>
                </div>
            ) : (
                <div className="history-list">
                    {filteredHistory.map(entry => (
                        <div key={entry.id} className="history-card animate-slide-up">
                            <div className="history-card-header">
                                <div>
                                    <h3 className="history-card-name">{entry.name}</h3>
                                    <p className="history-card-date">
                                        {formatDate(entry.date)} • {formatTime(entry.date)} • {entry.itemCount} items
                                    </p>
                                </div>
                            </div>

                            <div className="history-card-preview">
                                {entry.items.slice(0, 5).map(item => (
                                    <span key={item.itemId} className="history-preview-tag">
                                        {item.icon} {item.name}
                                    </span>
                                ))}
                                {entry.items.length > 5 && (
                                    <span className="history-preview-more">+{entry.items.length - 5} more</span>
                                )}
                            </div>

                            <div className="history-card-actions">
                                <button className="history-action" onClick={() => handleLoadList(entry.items)}>
                                    Open
                                </button>
                                <button className="history-action" onClick={() => handleDuplicate(entry)}>
                                    <Copy size={13} /> Duplicate
                                </button>
                                <button className="history-action" onClick={() => handleRename(entry)}>
                                    <Edit3 size={13} /> Rename
                                </button>
                                <button className="history-action danger" onClick={() => handleDelete(entry.id)}>
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
