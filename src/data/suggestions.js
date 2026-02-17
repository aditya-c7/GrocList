// Item pairing suggestions: when user adds key item, suggest related items
export const SUGGESTION_RULES = [
    { id: 's-1', trigger: ['sg-1', 'sg-2'], suggest: ['sg-4', 'ss-1', 'ce-1'], message: 'Making rice? Don\'t forget dal & oil!' },
    { id: 's-2', trigger: ['sg-3'], suggest: ['fp-1', 'ss-1', 'ce-4'], message: 'Rotis need onion, turmeric & sugar for dough?' },
    { id: 's-3', trigger: ['d-1'], suggest: ['ce-9', 'ce-4'], message: 'Milk goes great with tea & sugar!' },
    { id: 's-4', trigger: ['fp-1', 'fp-2'], suggest: ['fp-4', 'fp-5', 'fp-6'], message: 'Add ginger, garlic & chillies for cooking!' },
    { id: 's-5', trigger: ['d-3'], suggest: ['fp-10', 'fp-1', 'ce-1'], message: 'Paneer dish? Add capsicum, onion & oil!' },
    { id: 's-6', trigger: ['sg-14', 'sg-15'], suggest: ['ce-7', 'ce-8'], message: 'Pasta/noodles? Get soy sauce & ketchup!' },
    { id: 's-7', trigger: ['ce-9'], suggest: ['d-1', 'ce-4', 'fp-4'], message: 'Chai needs milk, sugar & ginger!' },
    { id: 's-8', trigger: ['d-8'], suggest: ['fp-1', 'fp-2', 'ce-1'], message: 'Eggs with onion, tomato & oil = omelette!' },
    { id: 's-9', trigger: ['sg-10'], suggest: ['ce-4', 'sg-11', 'ce-1'], message: 'Rava for upma? Add sugar, besan & oil!' },
    { id: 's-10', trigger: ['pc-4'], suggest: ['pc-5'], message: 'New toothpaste? Maybe a toothbrush too!' },
    { id: 's-11', trigger: ['la-1', 'la-2'], suggest: ['la-3', 'la-5'], message: 'Laundry day! Softener & washing bar?' },
    { id: 's-12', trigger: ['cs-1'], suggest: ['ca-1', 'ca-2'], message: 'Dish soap pairs with sponge & scrub!' },
    { id: 's-13', trigger: ['sn-1'], suggest: ['ce-9', 'd-1'], message: 'Biscuits with chai & milk? Perfect!' },
    { id: 's-14', trigger: ['fp-15', 'fp-16', 'fp-17'], suggest: ['d-2'], message: 'Fruits go well with curd!' },
];

/**
 * Get suggestions based on the current list items.
 * @param {Array} currentList - Array of list item objects with itemId property
 * @returns {Array} Suggestion objects with id, message, and items properties
 */
export function getSuggestions(currentList) {
    if (!currentList || currentList.length === 0) return [];

    const addedSet = new Set(currentList.map(i => i.itemId || i));
    const suggestions = [];

    for (const rule of SUGGESTION_RULES) {
        const hasTriggered = rule.trigger.some(id => addedSet.has(id));
        if (hasTriggered) {
            const newSuggestions = rule.suggest.filter(id => !addedSet.has(id));
            if (newSuggestions.length > 0) {
                suggestions.push({
                    id: rule.id,
                    message: rule.message,
                    items: newSuggestions,
                });
            }
        }
    }

    // Deduplicate suggestions by item ID
    const seen = new Set();
    const deduped = [];
    for (const s of suggestions) {
        const freshItems = s.items.filter(id => {
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
        });
        if (freshItems.length > 0) {
            deduped.push({ ...s, items: freshItems });
        }
    }

    return deduped.slice(0, 3);
}
