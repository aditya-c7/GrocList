export const CATEGORIES = [
  {
    id: 'staples-grains',
    name: 'Staples & Grains',
    icon: 'Wheat',
    color: '#d29922',
    items: [
      { id: 'sg-1', name: 'Rice (Basmati)', icon: '🍚', defaultUnit: 'kg' },
      { id: 'sg-2', name: 'Rice (Sona Masoori)', icon: '🍚', defaultUnit: 'kg' },
      { id: 'sg-3', name: 'Wheat Flour (Atta)', icon: '🌾', defaultUnit: 'kg' },
      { id: 'sg-4', name: 'Toor Dal', icon: '🫘', defaultUnit: 'kg' },
      { id: 'sg-5', name: 'Chana Dal', icon: '🫘', defaultUnit: 'kg' },
      { id: 'sg-6', name: 'Moong Dal', icon: '🫘', defaultUnit: 'kg' },
      { id: 'sg-7', name: 'Urad Dal', icon: '🫘', defaultUnit: 'kg' },
      { id: 'sg-8', name: 'Masoor Dal', icon: '🫘', defaultUnit: 'kg' },
      { id: 'sg-9', name: 'Poha', icon: '🍚', defaultUnit: 'kg' },
      { id: 'sg-10', name: 'Rava (Sooji)', icon: '🌾', defaultUnit: 'kg' },
      { id: 'sg-11', name: 'Besan', icon: '🌾', defaultUnit: 'kg' },
      { id: 'sg-12', name: 'Maida', icon: '🌾', defaultUnit: 'kg' },
      { id: 'sg-13', name: 'Oats', icon: '🥣', defaultUnit: 'kg' },
      { id: 'sg-14', name: 'Pasta', icon: '🍝', defaultUnit: 'g' },
      { id: 'sg-15', name: 'Noodles', icon: '🍜', defaultUnit: 'g' },
      { id: 'sg-16', name: 'Bread', icon: '🍞', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'spices-seasonings',
    name: 'Spices & Seasonings',
    icon: 'Flame',
    color: '#f85149',
    items: [
      { id: 'ss-1', name: 'Turmeric', icon: '🟡', defaultUnit: 'g' },
      { id: 'ss-2', name: 'Red Chilli Powder', icon: '🌶️', defaultUnit: 'g' },
      { id: 'ss-3', name: 'Coriander Powder', icon: '🟤', defaultUnit: 'g' },
      { id: 'ss-4', name: 'Cumin Powder', icon: '🟤', defaultUnit: 'g' },
      { id: 'ss-5', name: 'Garam Masala', icon: '🫙', defaultUnit: 'g' },
      { id: 'ss-6', name: 'Cumin Seeds', icon: '🌱', defaultUnit: 'g' },
      { id: 'ss-7', name: 'Mustard Seeds', icon: '🌱', defaultUnit: 'g' },
      { id: 'ss-8', name: 'Salt', icon: '🧂', defaultUnit: 'kg' },
      { id: 'ss-9', name: 'Black Pepper', icon: '⚫', defaultUnit: 'g' },
      { id: 'ss-10', name: 'Bay Leaves', icon: '🍃', defaultUnit: 'g' },
      { id: 'ss-11', name: 'Cinnamon', icon: '🟤', defaultUnit: 'g' },
      { id: 'ss-12', name: 'Cloves', icon: '🟤', defaultUnit: 'g' },
      { id: 'ss-13', name: 'Cardamom', icon: '🟢', defaultUnit: 'g' },
      { id: 'ss-14', name: 'Biryani Masala', icon: '🫙', defaultUnit: 'g' },
      { id: 'ss-15', name: 'Kitchen King', icon: '🫙', defaultUnit: 'g' },
    ]
  },
  {
    id: 'dairy',
    name: 'Dairy',
    icon: 'Milk',
    color: '#58a6ff',
    items: [
      { id: 'd-1', name: 'Milk', icon: '🥛', defaultUnit: 'L' },
      { id: 'd-2', name: 'Curd', icon: '🥛', defaultUnit: 'kg' },
      { id: 'd-3', name: 'Paneer', icon: '🧀', defaultUnit: 'g' },
      { id: 'd-4', name: 'Butter', icon: '🧈', defaultUnit: 'g' },
      { id: 'd-5', name: 'Ghee', icon: '🫙', defaultUnit: 'L' },
      { id: 'd-6', name: 'Cheese', icon: '🧀', defaultUnit: 'g' },
      { id: 'd-7', name: 'Cream', icon: '🥛', defaultUnit: 'ml' },
      { id: 'd-8', name: 'Eggs', icon: '🥚', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'snacks',
    name: 'Snacks',
    icon: 'Cookie',
    color: '#d29922',
    items: [
      { id: 'sn-1', name: 'Biscuits', icon: '🍪', defaultUnit: 'pcs' },
      { id: 'sn-2', name: 'Chips', icon: '🍟', defaultUnit: 'g' },
      { id: 'sn-3', name: 'Namkeen', icon: '🥜', defaultUnit: 'g' },
      { id: 'sn-4', name: 'Peanuts', icon: '🥜', defaultUnit: 'g' },
      { id: 'sn-5', name: 'Cashews', icon: '🥜', defaultUnit: 'g' },
      { id: 'sn-6', name: 'Almonds', icon: '🥜', defaultUnit: 'g' },
      { id: 'sn-7', name: 'Raisins', icon: '🍇', defaultUnit: 'g' },
      { id: 'sn-8', name: 'Chocolate', icon: '🍫', defaultUnit: 'pcs' },
      { id: 'sn-9', name: 'Cake Rusk', icon: '🍞', defaultUnit: 'pcs' },
      { id: 'sn-10', name: 'Popcorn', icon: '🍿', defaultUnit: 'g' },
    ]
  },
  {
    id: 'cooking-essentials',
    name: 'Cooking Essentials',
    icon: 'ChefHat',
    color: '#d29922',
    items: [
      { id: 'ce-1', name: 'Cooking Oil', icon: '🫗', defaultUnit: 'L' },
      { id: 'ce-2', name: 'Mustard Oil', icon: '🫗', defaultUnit: 'L' },
      { id: 'ce-3', name: 'Olive Oil', icon: '🫒', defaultUnit: 'ml' },
      { id: 'ce-4', name: 'Sugar', icon: '🍬', defaultUnit: 'kg' },
      { id: 'ce-5', name: 'Jaggery', icon: '🟤', defaultUnit: 'kg' },
      { id: 'ce-6', name: 'Vinegar', icon: '🫙', defaultUnit: 'ml' },
      { id: 'ce-7', name: 'Soy Sauce', icon: '🫙', defaultUnit: 'ml' },
      { id: 'ce-8', name: 'Tomato Ketchup', icon: '🍅', defaultUnit: 'g' },
      { id: 'ce-9', name: 'Tea (Chai)', icon: '🍵', defaultUnit: 'g' },
      { id: 'ce-10', name: 'Coffee', icon: '☕', defaultUnit: 'g' },
      { id: 'ce-11', name: 'Baking Soda', icon: '🫙', defaultUnit: 'g' },
      { id: 'ce-12', name: 'Corn Flour', icon: '🌽', defaultUnit: 'g' },
    ]
  },
  {
    id: 'cleaning-supplies',
    name: 'Cleaning Supplies',
    icon: 'SprayCan',
    color: '#3fb950',
    items: [
      { id: 'cs-1', name: 'Dish Soap', icon: '🧴', defaultUnit: 'ml' },
      { id: 'cs-2', name: 'Floor Cleaner', icon: '🧴', defaultUnit: 'L' },
      { id: 'cs-3', name: 'Glass Cleaner', icon: '🧴', defaultUnit: 'ml' },
      { id: 'cs-4', name: 'Toilet Cleaner', icon: '🧴', defaultUnit: 'ml' },
      { id: 'cs-5', name: 'Bleach', icon: '🧴', defaultUnit: 'ml' },
      { id: 'cs-6', name: 'Phenyl', icon: '🧴', defaultUnit: 'L' },
      { id: 'cs-7', name: 'Disinfectant', icon: '🧴', defaultUnit: 'ml' },
    ]
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: 'Shirt',
    color: '#a371f7',
    items: [
      { id: 'la-1', name: 'Detergent Powder', icon: '🧺', defaultUnit: 'kg' },
      { id: 'la-2', name: 'Liquid Detergent', icon: '🧴', defaultUnit: 'L' },
      { id: 'la-3', name: 'Fabric Softener', icon: '🧴', defaultUnit: 'ml' },
      { id: 'la-4', name: 'Stain Remover', icon: '🧴', defaultUnit: 'ml' },
      { id: 'la-5', name: 'Washing Bar', icon: '🧼', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'cleaning-accessories',
    name: 'Cleaning Accessories',
    icon: 'Brush',
    color: '#3fb950',
    items: [
      { id: 'ca-1', name: 'Sponge', icon: '🧽', defaultUnit: 'pcs' },
      { id: 'ca-2', name: 'Scrub Pad', icon: '🧽', defaultUnit: 'pcs' },
      { id: 'ca-3', name: 'Broom', icon: '🧹', defaultUnit: 'pcs' },
      { id: 'ca-4', name: 'Mop', icon: '🧹', defaultUnit: 'pcs' },
      { id: 'ca-5', name: 'Dustpan', icon: '🧹', defaultUnit: 'pcs' },
      { id: 'ca-6', name: 'Trash Bags', icon: '🗑️', defaultUnit: 'pcs' },
      { id: 'ca-7', name: 'Gloves', icon: '🧤', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    icon: 'Heart',
    color: '#f778ba',
    items: [
      { id: 'pc-1', name: 'Soap', icon: '🧼', defaultUnit: 'pcs' },
      { id: 'pc-2', name: 'Shampoo', icon: '🧴', defaultUnit: 'ml' },
      { id: 'pc-3', name: 'Conditioner', icon: '🧴', defaultUnit: 'ml' },
      { id: 'pc-4', name: 'Toothpaste', icon: '🪥', defaultUnit: 'pcs' },
      { id: 'pc-5', name: 'Toothbrush', icon: '🪥', defaultUnit: 'pcs' },
      { id: 'pc-6', name: 'Face Wash', icon: '🧴', defaultUnit: 'ml' },
      { id: 'pc-7', name: 'Body Lotion', icon: '🧴', defaultUnit: 'ml' },
      { id: 'pc-8', name: 'Deodorant', icon: '🧴', defaultUnit: 'pcs' },
      { id: 'pc-9', name: 'Hair Oil', icon: '🫗', defaultUnit: 'ml' },
      { id: 'pc-10', name: 'Razor', icon: '🪒', defaultUnit: 'pcs' },
      { id: 'pc-11', name: 'Sunscreen', icon: '🧴', defaultUnit: 'ml' },
      { id: 'pc-12', name: 'Sanitary Pads', icon: '📦', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'kitchen-supplies',
    name: 'Kitchen Supplies',
    icon: 'UtensilsCrossed',
    color: '#8b949e',
    items: [
      { id: 'ks-1', name: 'Aluminium Foil', icon: '🫙', defaultUnit: 'pcs' },
      { id: 'ks-2', name: 'Cling Wrap', icon: '🫙', defaultUnit: 'pcs' },
      { id: 'ks-3', name: 'Zip Lock Bags', icon: '🫙', defaultUnit: 'pcs' },
      { id: 'ks-4', name: 'Kitchen Tissue', icon: '🧻', defaultUnit: 'pcs' },
      { id: 'ks-5', name: 'Matchbox', icon: '🔥', defaultUnit: 'pcs' },
      { id: 'ks-6', name: 'Gas Lighter', icon: '🔥', defaultUnit: 'pcs' },
      { id: 'ks-7', name: 'Dustbin Bags', icon: '🗑️', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'bathroom-supplies',
    name: 'Bathroom Supplies',
    icon: 'Bath',
    color: '#58a6ff',
    items: [
      { id: 'bs-1', name: 'Toilet Paper', icon: '🧻', defaultUnit: 'pcs' },
      { id: 'bs-2', name: 'Hand Wash', icon: '🧴', defaultUnit: 'ml' },
      { id: 'bs-3', name: 'Air Freshener', icon: '🌸', defaultUnit: 'pcs' },
      { id: 'bs-4', name: 'Naphthalene Balls', icon: '⚪', defaultUnit: 'pcs' },
      { id: 'bs-5', name: 'Bucket', icon: '🪣', defaultUnit: 'pcs' },
      { id: 'bs-6', name: 'Mug', icon: '🪣', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'Lightbulb',
    color: '#d29922',
    items: [
      { id: 'u-1', name: 'Batteries', icon: '🔋', defaultUnit: 'pcs' },
      { id: 'u-2', name: 'Light Bulb', icon: '💡', defaultUnit: 'pcs' },
      { id: 'u-3', name: 'Candles', icon: '🕯️', defaultUnit: 'pcs' },
      { id: 'u-4', name: 'Extension Cord', icon: '🔌', defaultUnit: 'pcs' },
      { id: 'u-5', name: 'Tape', icon: '📦', defaultUnit: 'pcs' },
      { id: 'u-6', name: 'Rope', icon: '🪢', defaultUnit: 'pcs' },
      { id: 'u-7', name: 'Insect Repellent', icon: '🪲', defaultUnit: 'pcs' },
    ]
  },
  {
    id: 'fresh-produce',
    name: 'Fresh Produce',
    icon: 'Apple',
    color: '#3fb950',
    items: [
      { id: 'fp-1', name: 'Onion', icon: '🧅', defaultUnit: 'kg' },
      { id: 'fp-2', name: 'Tomato', icon: '🍅', defaultUnit: 'kg' },
      { id: 'fp-3', name: 'Potato', icon: '🥔', defaultUnit: 'kg' },
      { id: 'fp-4', name: 'Ginger', icon: '🫚', defaultUnit: 'g' },
      { id: 'fp-5', name: 'Garlic', icon: '🧄', defaultUnit: 'g' },
      { id: 'fp-6', name: 'Green Chilli', icon: '🌶️', defaultUnit: 'g' },
      { id: 'fp-7', name: 'Coriander', icon: '🌿', defaultUnit: 'g' },
      { id: 'fp-8', name: 'Lemon', icon: '🍋', defaultUnit: 'kg' },
      { id: 'fp-9', name: 'Carrot', icon: '🥕', defaultUnit: 'kg' },
      { id: 'fp-10', name: 'Capsicum', icon: '🫑', defaultUnit: 'kg' },
      { id: 'fp-11', name: 'Spinach', icon: '🥬', defaultUnit: 'g' },
      { id: 'fp-12', name: 'Beans', icon: '🫘', defaultUnit: 'g' },
      { id: 'fp-13', name: 'Cabbage', icon: '🥬', defaultUnit: 'kg' },
      { id: 'fp-14', name: 'Cauliflower', icon: '🥦', defaultUnit: 'kg' },
      { id: 'fp-15', name: 'Banana', icon: '🍌', defaultUnit: 'kg' },
      { id: 'fp-16', name: 'Apple', icon: '🍎', defaultUnit: 'kg' },
      { id: 'fp-17', name: 'Grapes', icon: '🍇', defaultUnit: 'kg' },
      { id: 'fp-18', name: 'Orange', icon: '🍊', defaultUnit: 'kg' },
      { id: 'fp-19', name: 'Mango', icon: '🥭', defaultUnit: 'kg' },
      { id: 'fp-20', name: 'Cucumber', icon: '🥒', defaultUnit: 'kg' },
    ]
  },
];

export const QUANTITY_PRESETS = {
  g: [100, 250, 500, 750],
  kg: [0.25, 0.5, 0.75, 1, 2, 5, 10, 25],
  ml: [250, 500],
  L: [1, 2, 5],
  pcs: [1, 2, 3, 4, 5, 6, 10, 12],
  packs: [1, 2, 3, 5],
  bottles: [1, 2, 3],
};

export const UNIT_OPTIONS = ['g', 'kg', 'ml', 'L', 'pcs', 'packs', 'bottles'];

export const getAllItems = () => {
  return CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryId: cat.id, categoryName: cat.name, categoryColor: cat.color }))
  );
};

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id);
export const getItemById = (id) => getAllItems().find(i => i.id === id);
