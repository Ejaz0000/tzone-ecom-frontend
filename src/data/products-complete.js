/**
 * Products Data with Detailed Information
 * Comprehensive product catalog with variants, images, and detailed descriptions
 */

export const productsData = [
  // Helmets
  {
    id: "helmet-001",
    slug: "gearx-pro-helmet",
    title: "GearX Pro Helmet",
    price: 12500.0,
    salePrice: 10900.0,
    currency: "BDT",
    image: "/images/products/helmet1.jpg",
    images: [
      "/images/products/helmet1.jpg",
      "/images/products/helmet1-2.jpg",
      "/images/products/helmet1-3.jpg",
      "/images/products/helmet1-4.jpg",
    ],
    rating: 4.8,
    reviews: 48,
    category: "Helmets",
    brand: "GearX",
    description: "Premium professional helmet with advanced safety features, superior comfort, and excellent ventilation for long rides.",
    longDescription: "The GearX Pro Helmet is engineered for riders who demand the best. Featuring a lightweight polycarbonate shell, integrated ventilation system, and moisture-wicking liner, this helmet keeps you cool and comfortable in any condition. The advanced safety rating exceeds international standards, and the snap-on visor system allows for easy replacement.",
    features: [
      "Lightweight polycarbonate shell",
      "Integrated ventilation system",
      "Moisture-wicking interior liner",
      "Quick-release strap system",
      "DOT and ECE certified",
      "Internal sun visor",
    ],
    variants: {
      color: [
        { name: "Matte Black", value: "matte-black", available: true },
        { name: "Pearl White", value: "pearl-white", available: true },
        { name: "Racing Red", value: "racing-red", available: true },
        { name: "Ocean Blue", value: "ocean-blue", available: false },
      ],
      size: [
        { name: "S (54-55cm)", value: "s", available: true },
        { name: "M (56-57cm)", value: "m", available: true },
        { name: "L (58-59cm)", value: "l", available: true },
        { name: "XL (60-61cm)", value: "xl", available: true },
      ],
    },
    stock: 24,
    createdAt: new Date("2025-10-01"),
  },
  {
    id: "helmet-010",
    slug: "urban-matte-helmet",
    title: "Urban Matte Helmet",
    price: 9900.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/helmet2.jpg",
    images: [
      "/images/products/helmet2.jpg",
      "/images/products/helmet2-2.jpg",
      "/images/products/helmet2-3.jpg",
    ],
    rating: 4.5,
    reviews: 32,
    category: "Helmets",
    brand: "LS2",
    description: "Modern matte black helmet for urban riders with sleek design.",
    longDescription: "Perfect for city commuting, the Urban Matte Helmet combines style with safety. Its minimalist design and matte finish give it a contemporary look that works with any riding style.",
    features: [
      "Matte finish design",
      "Urban style",
      "Good ventilation",
      "Comfortable fit",
      "DOT certified",
    ],
    variants: {
      color: [
        { name: "Matte Black", value: "matte-black", available: true },
        { name: "Charcoal Gray", value: "charcoal-gray", available: true },
      ],
      size: [
        { name: "M (56-57cm)", value: "m", available: true },
        { name: "L (58-59cm)", value: "l", available: true },
      ],
    },
    stock: 15,
    createdAt: new Date("2025-10-15"),
  },
  {
    id: "helmet-011",
    slug: "racing-sport-helmet",
    title: "Racing Sport Helmet",
    price: 15000.0,
    salePrice: 13500.0,
    currency: "BDT",
    image: "/images/products/helmet3.jpg",
    images: [
      "/images/products/helmet3.jpg",
      "/images/products/helmet3-2.jpg",
      "/images/products/helmet3-3.jpg",
      "/images/products/helmet3-4.jpg",
    ],
    rating: 4.9,
    reviews: 56,
    category: "Helmets",
    brand: "AGV",
    description: "High-performance racing helmet for speed enthusiasts.",
    longDescription: "Designed for serious riders, this racing helmet offers maximum protection without compromise. Advanced aerodynamics reduce drag, while superior ventilation keeps you cool during intense rides.",
    features: [
      "Aerodynamic design",
      "Race-certified shell",
      "Advanced ventilation",
      "Removable liner",
      "Pinlock visor included",
      "ECE 22.05 certified",
    ],
    variants: {
      color: [
        { name: "Gloss Black", value: "gloss-black", available: true },
        { name: "Racing Red", value: "racing-red", available: true },
        { name: "Silver Metallic", value: "silver-metallic", available: true },
      ],
      size: [
        { name: "S (54-55cm)", value: "s", available: true },
        { name: "M (56-57cm)", value: "m", available: true },
        { name: "L (58-59cm)", value: "l", available: true },
        { name: "XL (60-61cm)", value: "xl", available: false },
      ],
    },
    stock: 8,
    createdAt: new Date("2025-10-10"),
  },
  {
    id: "helmet-012",
    slug: "vintage-cafe-helmet",
    title: "Vintage Cafe Helmet",
    price: 8500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/helmet4.jpg",
    images: [
      "/images/products/helmet4.jpg",
      "/images/products/helmet4-2.jpg",
      "/images/products/helmet4-3.jpg",
    ],
    rating: 4.3,
    reviews: 18,
    category: "Helmets",
    brand: "MT",
    description: "Retro-styled helmet for vintage bike enthusiasts.",
    longDescription: "Embrace retro style with modern safety. This vintage-inspired helmet delivers classic aesthetics with contemporary protection standards.",
    features: [
      "Retro design",
      "Lightweight shell",
      "Open-face style",
      "DOT certified",
      "Multiple colors available",
    ],
    variants: {
      color: [
        { name: "Classic Black", value: "classic-black", available: true },
        { name: "Vintage Brown", value: "vintage-brown", available: true },
        { name: "Cream White", value: "cream-white", available: true },
      ],
      size: [
        { name: "M (56-57cm)", value: "m", available: true },
        { name: "L (58-59cm)", value: "l", available: true },
      ],
    },
    stock: 12,
    createdAt: new Date("2025-09-20"),
  },

  // Gloves
  {
    id: "glove-101",
    slug: "rider-gloves-black-edition",
    title: "Rider Gloves Black Edition",
    price: 4500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/glove1.jpg",
    images: ["/images/products/glove1.jpg", "/images/products/glove1-2.jpg"],
    rating: 4.6,
    reviews: 24,
    category: "Riding Gear",
    brand: "GearX",
    description: "Durable black leather riding gloves with superior grip.",
    longDescription: "Premium leather gloves designed for all-day comfort and protection. Features reinforced palm protection and flexible knuckle guards.",
    features: [
      "Premium leather construction",
      "Reinforced palms",
      "Knuckle protection",
      "Breathable design",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "Brown", value: "brown", available: true },
      ],
      size: [
        { name: "S", value: "s", available: true },
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
        { name: "XL", value: "xl", available: true },
      ],
    },
    stock: 30,
    createdAt: new Date("2025-10-05"),
  },
  {
    id: "glove-102",
    slug: "racing-gloves-pro",
    title: "Racing Gloves Pro",
    price: 6500.0,
    salePrice: 5800.0,
    currency: "BDT",
    image: "/images/products/glove2.jpg",
    images: ["/images/products/glove2.jpg", "/images/products/glove2-2.jpg"],
    rating: 4.7,
    reviews: 28,
    category: "Riding Gear",
    brand: "Shoei",
    description: "Professional racing gloves with palm protection.",
    longDescription: "Purpose-built for high-performance riding. Advanced materials provide maximum grip and protection during intense rides.",
    features: [
      "Advanced grip material",
      "Palm reinforcement",
      "Wrist support",
      "Touchscreen compatible",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "White Red", value: "white-red", available: true },
      ],
      size: [
        { name: "S", value: "s", available: true },
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
      ],
    },
    stock: 18,
    createdAt: new Date("2025-10-12"),
  },
  {
    id: "glove-103",
    slug: "summer-mesh-gloves",
    title: "Summer Mesh Gloves",
    price: 3500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/glove3.jpg",
    images: ["/images/products/glove3.jpg"],
    rating: 4.2,
    reviews: 15,
    category: "Riding Gear",
    brand: "HJC",
    description: "Breathable mesh gloves for hot weather riding.",
    longDescription: "Perfect for summer rides, these mesh gloves offer excellent ventilation while maintaining protection.",
    features: [
      "Breathable mesh",
      "Lightweight",
      "Good ventilation",
      "Comfortable padding",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "Gray", value: "gray", available: true },
      ],
      size: [
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
        { name: "XL", value: "xl", available: true },
      ],
    },
    stock: 25,
    createdAt: new Date("2025-09-28"),
  },

  // Jackets
  {
    id: "jacket-303",
    slug: "windproof-riding-jacket",
    title: "Windproof Riding Jacket",
    price: 18900.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/jacket1.jpg",
    images: [
      "/images/products/jacket1.jpg",
      "/images/products/jacket1-2.jpg",
      "/images/products/jacket1-3.jpg",
    ],
    rating: 4.9,
    reviews: 42,
    category: "Riding Gear",
    brand: "GearX",
    description: "Premium windproof jacket with thermal lining.",
    longDescription: "Engineered for all-weather protection, this jacket features advanced windproof material and thermal insulation for cold-weather riding.",
    features: [
      "Windproof material",
      "Thermal lining",
      "Waterproof seams",
      "Multiple pockets",
      "Reflective accents",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "Dark Blue", value: "dark-blue", available: true },
      ],
      size: [
        { name: "S", value: "s", available: true },
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
        { name: "XL", value: "xl", available: true },
      ],
    },
    stock: 11,
    createdAt: new Date("2025-10-08"),
  },
  {
    id: "jacket-304",
    slug: "leather-racing-jacket",
    title: "Leather Racing Jacket",
    price: 22500.0,
    salePrice: 19800.0,
    currency: "BDT",
    image: "/images/products/jacket2.jpg",
    images: [
      "/images/products/jacket2.jpg",
      "/images/products/jacket2-2.jpg",
      "/images/products/jacket2-3.jpg",
    ],
    rating: 4.8,
    reviews: 35,
    category: "Riding Gear",
    brand: "Shoei",
    description: "Professional leather racing jacket.",
    longDescription: "Premium leather construction with racing-grade protection. Features armor inserts at key impact zones.",
    features: [
      "Premium leather",
      "Armor inserts",
      "Racing cut",
      "Ventilation zippers",
      "CE certified",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "Red", value: "red", available: true },
      ],
      size: [
        { name: "S", value: "s", available: false },
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
      ],
    },
    stock: 6,
    createdAt: new Date("2025-10-14"),
  },
  {
    id: "jacket-305",
    slug: "rain-protective-jacket",
    title: "Rain Protective Jacket",
    price: 12000.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/jacket3.jpg",
    images: ["/images/products/jacket3.jpg", "/images/products/jacket3-2.jpg"],
    rating: 4.4,
    reviews: 22,
    category: "Rain Gear",
    brand: "LS2",
    description: "Waterproof jacket for rainy rides.",
    longDescription: "Specialized rain protection with sealed seams and waterproof coating. Lightweight and packable for easy storage.",
    features: [
      "Waterproof coating",
      "Sealed seams",
      "Lightweight",
      "Packable design",
    ],
    variants: {
      color: [
        { name: "Yellow", value: "yellow", available: true },
        { name: "Black", value: "black", available: true },
      ],
      size: [
        { name: "M", value: "m", available: true },
        { name: "L", value: "l", available: true },
        { name: "XL", value: "xl", available: true },
      ],
    },
    stock: 20,
    createdAt: new Date("2025-10-03"),
  },

  // Accessories
  {
    id: "lock-202",
    slug: "anti-theft-bike-lock",
    title: "Anti-Theft Bike Lock",
    price: 6500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/lock1.jpg",
    images: ["/images/products/lock1.jpg", "/images/products/lock1-2.jpg"],
    rating: 4.4,
    reviews: 19,
    category: "Accessories",
    brand: "GearX",
    description: "Heavy-duty security lock.",
    longDescription: "Reinforced steel construction provides maximum security for your bike. Includes mounting bracket and 2 keys.",
    features: [
      "Heavy-duty steel",
      "Pick-resistant",
      "Includes 2 keys",
      "Mounting bracket",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
      ],
      size: [
        { name: "Standard", value: "standard", available: true },
      ],
    },
    stock: 40,
    createdAt: new Date("2025-09-25"),
  },
  {
    id: "boot-110",
    slug: "rider-boots-x1",
    title: "Rider Boots X1",
    price: 12000.0,
    salePrice: 10500.0,
    currency: "BDT",
    image: "/images/products/boot1.jpg",
    images: ["/images/products/boot1.jpg", "/images/products/boot1-2.jpg"],
    rating: 4.5,
    reviews: 26,
    category: "Accessories",
    brand: "MT",
    description: "Durable riding boots with ankle support.",
    longDescription: "Professional-grade riding boots with reinforced ankle protection and oil-resistant soles. Comfortable for all-day wear.",
    features: [
      "Ankle support",
      "Oil-resistant sole",
      "Comfortable padding",
      "Durable construction",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
        { name: "Brown", value: "brown", available: true },
      ],
      size: [
        { name: "6", value: "6", available: true },
        { name: "7", value: "7", available: true },
        { name: "8", value: "8", available: true },
        { name: "9", value: "9", available: true },
        { name: "10", value: "10", available: true },
      ],
    },
    stock: 17,
    createdAt: new Date("2025-10-09"),
  },
  {
    id: "visor-210",
    slug: "anti-fog-visor",
    title: "Anti-Fog Visor",
    price: 3500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/visor1.jpg",
    images: ["/images/products/visor1.jpg"],
    rating: 4.3,
    reviews: 14,
    category: "Accessories",
    brand: "AGV",
    description: "Replacement anti-fog visor.",
    longDescription: "Genuine replacement visor with anti-fog coating. Compatible with most AGV helmets.",
    features: [
      "Anti-fog coating",
      "UV protection",
      "Easy installation",
      "Durable material",
    ],
    variants: {
      color: [
        { name: "Clear", value: "clear", available: true },
        { name: "Smoke", value: "smoke", available: true },
      ],
      size: [
        { name: "Standard", value: "standard", available: true },
      ],
    },
    stock: 50,
    createdAt: new Date("2025-10-11"),
  },
  {
    id: "light-310",
    slug: "rear-safety-light",
    title: "Rear Safety Light",
    price: 2500.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/light1.jpg",
    images: ["/images/products/light1.jpg"],
    rating: 4.1,
    reviews: 12,
    category: "Accessories",
    brand: "HJC",
    description: "LED rear safety light for visibility.",
    longDescription: "Compact LED rear light with 3 brightness modes. Battery-powered with 50-hour runtime.",
    features: [
      "LED technology",
      "3 brightness modes",
      "50-hour runtime",
      "Waterproof design",
    ],
    variants: {
      color: [
        { name: "Red", value: "red", available: true },
      ],
      size: [
        { name: "Standard", value: "standard", available: true },
      ],
    },
    stock: 60,
    createdAt: new Date("2025-10-07"),
  },
  {
    id: "chain-411",
    slug: "heavy-duty-chain-lock",
    title: "Heavy Duty Chain Lock",
    price: 8500.0,
    salePrice: 7500.0,
    currency: "BDT",
    image: "/images/products/chain1.jpg",
    images: ["/images/products/chain1.jpg", "/images/products/chain1-2.jpg"],
    rating: 4.6,
    reviews: 31,
    category: "Accessories",
    brand: "GearX",
    description: "Steel chain lock for maximum security.",
    longDescription: "Hardened steel chain with security lock. Professional-grade protection against theft.",
    features: [
      "Hardened steel",
      "Security lock",
      "Heavy-duty construction",
      "Weather resistant",
    ],
    variants: {
      color: [
        { name: "Black", value: "black", available: true },
      ],
      size: [
        { name: "1.5m", value: "1.5m", available: true },
        { name: "2m", value: "2m", available: true },
      ],
    },
    stock: 22,
    createdAt: new Date("2025-10-13"),
  },
  {
    id: "mirror-512",
    slug: "wide-angle-mirror",
    title: "Wide Angle Mirror",
    price: 2000.0,
    salePrice: null,
    currency: "BDT",
    image: "/images/products/mirror1.jpg",
    images: ["/images/products/mirror1.jpg"],
    rating: 4.0,
    reviews: 11,
    category: "Accessories",
    brand: "LS2",
    description: "Wide angle safety mirror.",
    longDescription: "Convex mirror design provides extended visibility. Durable metal construction with vibration dampening.",
    features: [
      "Wide angle view",
      "Convex design",
      "Metal construction",
      "Easy mounting",
    ],
    variants: {
      color: [
        { name: "Chrome", value: "chrome", available: true },
        { name: "Black", value: "black", available: true },
      ],
      size: [
        { name: "Standard", value: "standard", available: true },
      ],
    },
    stock: 35,
    createdAt: new Date("2025-09-30"),
  },
];

// Categories list
export const categories = [
  "Helmets",
  "Riding Gear",
  "Rain Gear",
  "Accessories",
];

// Brands list
export const brands = [
  "GearX",
  "LS2",
  "AGV",
  "MT",
  "Shoei",
  "HJC",
];

// Price ranges
export const priceRanges = [
  { label: "Under 5,000 BDT", min: 0, max: 5000 },
  { label: "5,000 - 10,000 BDT", min: 5000, max: 10000 },
  { label: "10,000 - 15,000 BDT", min: 10000, max: 15000 },
  { label: "15,000 - 20,000 BDT", min: 15000, max: 20000 },
  { label: "Above 20,000 BDT", min: 20000, max: Infinity },
];

// Get price range
export const getPriceRange = (products) => {
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

// Get related products
export const getRelatedProducts = (product, limit = 4) => {
  return productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

// Get product by slug
export const getProductBySlug = (slug) => {
  return productsData.find((p) => p.slug === slug);
};

// Get product by ID
export const getProductById = (id) => {
  return productsData.find((p) => p.id === id);
};
