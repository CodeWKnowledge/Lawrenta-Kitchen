import foodBeansPlantain from '../assets/foods/Beans and plantain.jpg';
import foodMeatballSpaghetti from '../assets/foods/MEATBALL SPAGHETTI RECIPE 🍝.jpg';
import foodFriedRice from '../assets/foods/Nigerian fried rice.jpg';
import foodOfadaStew from '../assets/foods/Ofada Stew Recipe.jpg';
import foodSaucedKpomo from '../assets/foods/Sauced Kpomo❤️.jpg';
import foodJollofRice from '../assets/foods/Simple Nigerian Jollof Rice Recipe (Video) - KikiFoodies.jpg';
import foodSoup from '../assets/foods/soup1.png';
import foodTopNaija from '../assets/foods/15 Top Nigerian Foodies to Follow On Instagram _ ThriveNaija.jpg';
import foodDownload1 from '../assets/foods/download (1).jpg';
import foodDownload2 from '../assets/foods/download (2).jpg';
import foodDownload3 from '../assets/foods/download (3).jpg';
import foodDownload from '../assets/foods/download.jpg';

export const CATEGORIES = [
  { id: '1', name: 'Main Dishes', icon: 'Restaurant01Icon' },
  { id: '2', name: 'Soup & Swallows', icon: 'Bowl01Icon' },
  { id: '3', name: 'Proteins', icon: 'Pot01Icon' }, 
  { id: '4', name: 'Sides', icon: 'FrenchFries01Icon' },
  { id: '5', name: 'Drinks', icon: 'Coffee01Icon' },
  { id: '6', name: 'Extras', icon: 'Add01Icon' },
];

export const PRODUCTS = [
  {
    id: 'p7',
    name: 'Jollof Rice & Chicken',
    description: 'Authentic Nigerian Jollof rice served with perfectly spiced grilled chicken.',
    price: 3500,
    category: '1',
    image: foodJollofRice,
    available: true,
    variants: [
      { name: 'Standard', price: 0 },
      { name: 'Large Portion', price: 1500 }
    ],
    addons: [
      { name: 'Extra Plantain', price: 500 },
      { name: 'Coleslaw', price: 300 }
    ]
  },
  {
    id: 'p8',
    name: 'Beans and Plantain',
    description: 'Deliciously cooked beans paired with sweet fried plantain.',
    price: 2500,
    category: '1',
    image: foodBeansPlantain,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: [
      { name: 'Extra Plantain', price: 500 }
    ]
  },
  {
    id: 'p9',
    name: 'Meatball Spaghetti',
    description: 'Rich tomato sauce spaghetti with juicy meatballs.',
    price: 3000,
    category: '1',
    image: foodMeatballSpaghetti,
    available: true,
    variants: [
      { name: 'Standard', price: 0 },
      { name: 'Large Portion', price: 1000 }
    ],
    addons: [
      { name: 'Extra Meatballs', price: 800 }
    ]
  },
  {
    id: 'p10',
    name: 'Nigerian Fried Rice',
    description: 'Flavorful fried rice loaded with vegetables and proteins.',
    price: 3200,
    category: '1',
    image: foodFriedRice,
    available: true,
    variants: [
      { name: 'Standard', price: 0 },
      { name: 'Large Portion', price: 1200 }
    ],
    addons: [
      { name: 'Extra Turkey', price: 2000 },
      { name: 'Plantain', price: 500 }
    ]
  },
  {
    id: 'p11',
    name: 'Ofada Stew and Rice',
    description: 'Traditional Ofada rice served with signature spicy designer stew.',
    price: 4000,
    category: '1',
    image: foodOfadaStew,
    available: true,
    variants: [
      { name: 'Standard', price: 0 },
      { name: 'Extra Rice', price: 800 }
    ],
    addons: [
      { name: 'Assorted Meat', price: 1500 },
      { name: 'Boiled Egg', price: 300 }
    ]
  },
  {
    id: 'p12',
    name: 'Sauced Kpomo',
    description: 'Spicy and savory cow skin (kpomo) tossed in pepper sauce.',
    price: 1500,
    category: '3',
    image: foodSaucedKpomo,
    available: true,
    variants: [
      { name: 'Standard', price: 0 },
      { name: 'Large Portion', price: 1000 }
    ],
    addons: []
  },
  {
    id: 'p13',
    name: 'Special Egusi Soup',
    description: 'Rich and hearty traditional soup served with swallow of choice.',
    price: 4500,
    category: '2',
    image: foodSoup,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: [
      { name: 'Pounded Yam', price: 1000 },
      { name: 'Fufu', price: 800 },
      { name: 'Extra Meat', price: 1500 }
    ]
  },
  {
    id: 'p14',
    name: 'Local Delicacy Plate',
    description: 'A rich mix of traditional flavors to satisfy your cravings.',
    price: 5000,
    category: '1',
    image: foodTopNaija,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: []
  },
  {
    id: 'p15',
    name: 'Grilled Turkey',
    description: 'Perfectly spiced and grilled turkey.',
    price: 3500,
    category: '3',
    image: foodDownload1,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: []
  },
  {
    id: 'p16',
    name: 'Spicy Chicken Wings',
    description: 'Local street-style grilled chicken wings.',
    price: 2500,
    category: '3',
    image: foodDownload2,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: []
  },
  {
    id: 'p17',
    name: 'Asun (Spicy Grilled Goat Meat)',
    description: 'Signature mixed grills, perfectly spiced.',
    price: 3000,
    category: '3',
    image: foodDownload3,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: []
  },
  {
    id: 'p18',
    name: 'Snack Platter',
    description: 'A selection of popular local snacks.',
    price: 2000,
    category: '4',
    image: foodDownload,
    available: true,
    variants: [
      { name: 'Standard', price: 0 }
    ],
    addons: []
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-7721',
    customer: {
      name: 'John Doe',
      phone: '+1 234 567 890',
      email: 'john@example.com',
      address: '123 Green Street, Eco City'
    },
    items: [
      {
        id: 'p7',
        name: 'Jollof Rice & Chicken',
        price: 3500,
        quantity: 2,
        variant: 'Standard',
        addons: ['Extra Plantain']
      }
    ],
    subtotal: 7000,
    deliveryFee: 1000,
    total: 8000,
    status: 'pending',
    paymentMethod: 'card',
    createdAt: new Date().toISOString()
  }
];
