import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { CATEGORIES, getAllItems } from '../data/categories';

const AppContext = createContext(null);

const STORAGE_KEY = 'groc_app_state';

const defaultPreferences = {
    mode: 'supermarket', // 'kirana' | 'supermarket'
    elderMode: false,
    hasSeenOnboarding: false,
};

const initialState = {
    user: null,
    currentList: [], // [{ itemId, name, icon, quantity, unit, categoryId, categoryName, categoryColor, isCustom }]
    customItems: [], // [{ id, name, icon, categoryId, defaultUnit }]
    hiddenItems: [], // item IDs hidden via edit mode
    history: [], // [{ id, name, date, items, mode }]
    preferences: defaultPreferences,
    isAuthenticated: false,
};

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...initialState, ...parsed, isAuthenticated: !!parsed.user };
        }
    } catch (e) {
        console.warn('Failed to load state:', e);
    }
    return initialState;
}

function saveState(state) {
    try {
        const toSave = {
            user: state.user,
            currentList: state.currentList,
            customItems: state.customItems,
            hiddenItems: state.hiddenItems,
            history: state.history,
            preferences: state.preferences,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
        console.warn('Failed to save state:', e);
    }
}

function appReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };

        case 'LOGOUT':
            return { ...initialState };

        case 'ADD_ITEM': {
            const exists = state.currentList.find(i => i.itemId === action.payload.itemId);
            if (exists) {
                return {
                    ...state,
                    currentList: state.currentList.map(i =>
                        i.itemId === action.payload.itemId
                            ? { ...i, quantity: action.payload.quantity, unit: action.payload.unit }
                            : i
                    )
                };
            }
            return { ...state, currentList: [...state.currentList, action.payload] };
        }

        case 'REMOVE_ITEM':
            return { ...state, currentList: state.currentList.filter(i => i.itemId !== action.payload) };

        case 'UPDATE_ITEM_QUANTITY':
            return {
                ...state,
                currentList: state.currentList.map(i =>
                    i.itemId === action.payload.itemId
                        ? { ...i, quantity: action.payload.quantity, unit: action.payload.unit }
                        : i
                )
            };

        case 'CLEAR_LIST':
            return { ...state, currentList: [] };

        case 'LOAD_LIST':
            return { ...state, currentList: action.payload };

        case 'SAVE_TO_HISTORY': {
            const entry = {
                id: 'hist-' + Date.now(),
                name: action.payload.name || `List - ${new Date().toLocaleDateString('en-IN')}`,
                date: new Date().toISOString(),
                items: [...state.currentList],
                mode: state.preferences.mode,
                itemCount: state.currentList.length,
            };
            return { ...state, history: [entry, ...state.history] };
        }

        case 'DELETE_HISTORY':
            return { ...state, history: state.history.filter(h => h.id !== action.payload) };

        case 'RENAME_HISTORY':
            return {
                ...state,
                history: state.history.map(h =>
                    h.id === action.payload.id ? { ...h, name: action.payload.name } : h
                )
            };

        case 'ADD_CUSTOM_ITEM': {
            const item = {
                id: 'custom-' + Date.now(),
                ...action.payload,
                isCustom: true,
            };
            return { ...state, customItems: [...state.customItems, item] };
        }

        case 'REMOVE_CUSTOM_ITEM':
            return { ...state, customItems: state.customItems.filter(i => i.id !== action.payload) };

        case 'HIDE_ITEM':
            if (state.hiddenItems.includes(action.payload)) return state;
            return { ...state, hiddenItems: [...state.hiddenItems, action.payload] };

        case 'UNHIDE_ITEM':
            return { ...state, hiddenItems: state.hiddenItems.filter(id => id !== action.payload) };

        case 'EDIT_CUSTOM_ITEM':
            return {
                ...state,
                customItems: state.customItems.map(i =>
                    i.id === action.payload.id ? { ...i, ...action.payload } : i
                )
            };

        case 'SET_PREFERENCE':
            return {
                ...state,
                preferences: { ...state.preferences, [action.payload.key]: action.payload.value }
            };

        case 'SET_PREFERENCES':
            return { ...state, preferences: { ...state.preferences, ...action.payload } };

        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, null, loadState);

    // Save to localStorage on state change
    useEffect(() => {
        saveState(state);
    }, [state]);

    // Apply elder mode class
    useEffect(() => {
        if (state.preferences.elderMode) {
            document.body.classList.add('elder-mode');
        } else {
            document.body.classList.remove('elder-mode');
        }
    }, [state.preferences.elderMode]);

    const actions = useMemo(() => ({
        login: (user) => dispatch({ type: 'LOGIN', payload: user }),
        logout: () => {
            localStorage.removeItem(STORAGE_KEY);
            dispatch({ type: 'LOGOUT' });
        },
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
        removeItem: (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: itemId }),
        updateQuantity: (itemId, quantity, unit) => dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { itemId, quantity, unit } }),
        clearList: () => dispatch({ type: 'CLEAR_LIST' }),
        loadList: (items) => dispatch({ type: 'LOAD_LIST', payload: items }),
        saveToHistory: (name) => dispatch({ type: 'SAVE_TO_HISTORY', payload: { name } }),
        deleteHistory: (id) => dispatch({ type: 'DELETE_HISTORY', payload: id }),
        renameHistory: (id, name) => dispatch({ type: 'RENAME_HISTORY', payload: { id, name } }),
        addCustomItem: (item) => dispatch({ type: 'ADD_CUSTOM_ITEM', payload: item }),
        removeCustomItem: (id) => dispatch({ type: 'REMOVE_CUSTOM_ITEM', payload: id }),
        editCustomItem: (item) => dispatch({ type: 'EDIT_CUSTOM_ITEM', payload: item }),
        hideItem: (id) => dispatch({ type: 'HIDE_ITEM', payload: id }),
        unhideItem: (id) => dispatch({ type: 'UNHIDE_ITEM', payload: id }),
        setPreference: (key, value) => dispatch({ type: 'SET_PREFERENCE', payload: { key, value } }),
        setPreferences: (prefs) => dispatch({ type: 'SET_PREFERENCES', payload: prefs }),
    }), []);

    // Merged items (base + custom)
    const allItems = useMemo(() => {
        const base = getAllItems();
        const custom = state.customItems.map(ci => {
            const cat = CATEGORIES.find(c => c.id === ci.categoryId);
            return {
                ...ci,
                categoryName: cat?.name || 'Other',
                categoryColor: cat?.color || '#888',
            };
        });
        return [...base, ...custom];
    }, [state.customItems]);

    // Categories with custom items merged in
    const categoriesWithCustom = useMemo(() => {
        return CATEGORIES.map(cat => ({
            ...cat,
            items: [
                ...cat.items,
                ...state.customItems.filter(ci => ci.categoryId === cat.id)
            ]
        }));
    }, [state.customItems]);

    const value = useMemo(() => ({
        ...state,
        ...actions,
        allItems,
        categoriesWithCustom,
    }), [state, actions, allItems, categoriesWithCustom]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}

export default AppContext;
