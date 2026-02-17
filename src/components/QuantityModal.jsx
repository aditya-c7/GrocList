import { useState, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { QUANTITY_PRESETS, UNIT_OPTIONS } from '../data/categories';
import BottomSheet from './ui/BottomSheet';
import './QuantityModal.css';

export default function QuantityModal({ item, isOpen, onClose }) {
    const { addItem } = useApp();
    const addingRef = useRef(false);
    const unit = item?.defaultUnit || 'kg';
    const presets = QUANTITY_PRESETS[unit] || QUANTITY_PRESETS.pcs;

    const [selectedQuantity, setSelectedQuantity] = useState(presets[0]);
    const [customValue, setCustomValue] = useState('');
    const [customUnit, setCustomUnit] = useState(unit);
    const [isCustom, setIsCustom] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

    const handlePresetSelect = useCallback((val) => {
        setSelectedQuantity(val);
        setIsCustom(false);
        const idx = presets.indexOf(val);
        setSliderValue(idx >= 0 ? idx : 0);
    }, [presets]);

    const handleSliderChange = useCallback((e) => {
        const idx = parseInt(e.target.value);
        setSliderValue(idx);
        setSelectedQuantity(presets[idx]);
        setIsCustom(false);
    }, [presets]);

    const handleCustomToggle = useCallback(() => {
        setIsCustom(true);
        setCustomValue('');
        setCustomUnit(unit);
    }, [unit]);

    const finalQuantity = isCustom ? parseFloat(customValue) || 0 : selectedQuantity;
    const finalUnit = isCustom ? customUnit : unit;

    const handleAdd = useCallback(() => {
        if (finalQuantity <= 0 || !item || addingRef.current) return;
        addingRef.current = true;

        let displayUnit = finalUnit;
        let displayQty = finalQuantity;

        if (displayUnit === 'g' && displayQty >= 1000) {
            displayQty = displayQty / 1000;
            displayUnit = 'kg';
        } else if (displayUnit === 'ml' && displayQty >= 1000) {
            displayQty = displayQty / 1000;
            displayUnit = 'L';
        }

        addItem({
            itemId: item.id,
            name: item.name,
            icon: item.icon,
            quantity: displayQty,
            unit: displayUnit,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            categoryColor: item.categoryColor,
            isCustom: item.isCustom || false,
        });

        // Reset state and close immediately
        setSelectedQuantity(presets[0]);
        setSliderValue(0);
        setIsCustom(false);
        setCustomValue('');
        addingRef.current = false;
        onClose();
    }, [finalQuantity, finalUnit, item, addItem, onClose, presets]);

    if (!item) return null;

    const formatQty = (val, u) => {
        const useUnit = u || unit;
        if (useUnit === 'kg' && val < 1) return `${val * 1000} g`;
        if (useUnit === 'g' && val >= 1000) return `${val / 1000} kg`;
        if (useUnit === 'ml' && val >= 1000) return `${val / 1000} L`;
        return `${val} ${useUnit}`;
    };

    const handleCustomInput = (e) => {
        const val = e.target.value;
        // Allow only numbers and dots
        if (val === '' || /^\d*\.?\d*$/.test(val)) {
            setCustomValue(val);
        }
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title={`${item.icon} ${item.name}`}>
            <div className="qty-modal">
                {/* Preset Buttons */}
                <div className="qty-presets">
                    {presets.map(val => (
                        <button
                            key={val}
                            className={`qty-preset-btn ${!isCustom && selectedQuantity === val ? 'active' : ''}`}
                            onClick={() => handlePresetSelect(val)}
                        >
                            {formatQty(val)}
                        </button>
                    ))}
                </div>

                {/* Slider */}
                <div className="qty-slider-section">
                    <input
                        type="range"
                        min="0"
                        max={presets.length - 1}
                        step="1"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="qty-slider"
                    />
                    <div className="qty-slider-label">
                        {formatQty(presets[sliderValue])}
                    </div>
                </div>

                {/* Custom input */}
                <div className="qty-custom-section">
                    <button
                        className={`qty-custom-toggle ${isCustom ? 'active' : ''}`}
                        onClick={handleCustomToggle}
                    >
                        Custom Amount
                    </button>
                    {isCustom && (
                        <div className="qty-custom-row animate-slide-up">
                            <div className="qty-custom-input-wrap">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    className="qty-custom-input"
                                    placeholder="Enter value"
                                    value={customValue}
                                    onChange={handleCustomInput}
                                    autoFocus
                                />
                            </div>
                            <select
                                className="qty-unit-select"
                                value={customUnit}
                                onChange={e => setCustomUnit(e.target.value)}
                            >
                                {UNIT_OPTIONS.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="qty-actions">
                    <button className="qty-cancel-btn" onClick={onClose}>
                        Back
                    </button>
                    <button
                        className="qty-add-btn"
                        onClick={handleAdd}
                        disabled={finalQuantity <= 0}
                    >
                        Add {finalQuantity > 0 ? formatQty(finalQuantity, finalUnit) : ''} to List
                    </button>
                </div>
            </div>
        </BottomSheet>
    );
}
