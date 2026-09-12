const products = [
  // =========================================================
  // KITCHENWARE
  // =========================================================

  {
    id: 1,
    name: "FLOVR Kitchen Storage Organizer",
    category: "Kitchenware",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.6,
    reviews: 84,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Smart and stylish storage solution for your everyday kitchen essentials.",

    description:
      "Keep your kitchen neat and organized with the FLOVR Kitchen Storage Organizer. Its practical design helps you store everyday essentials while keeping your countertop clean and clutter-free.",

    features: [
      "Space-saving design",
      "Easy to clean",
      "Durable construction",
      "Ideal for kitchen storage",
    ],

    specifications: {
      Material: "Premium Plastic",
      Color: "Beige",
      Dimensions: "30 × 20 × 15 cm",
      Usage: "Kitchen Storage",
    },

    stock: 25,
    sku: "FLV-KIT-001",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Storage", "Organizer"],
  },

  {
    id: 2,
    name: "FLOVR Kitchen Counter Organizer",
    category: "Kitchenware",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.8,
    reviews: 113,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Keep spices, bottles and kitchen essentials perfectly organized.",

    description:
      "The FLOVR Kitchen Counter Organizer is designed to make your cooking space cleaner and more convenient. Store frequently used kitchen items within easy reach.",

    features: [
      "Multi-purpose storage",
      "Compact countertop design",
      "Easy access",
      "Strong and durable",
    ],

    specifications: {
      Material: "ABS Plastic",
      Color: "Cream",
      Dimensions: "32 × 18 × 14 cm",
      Usage: "Countertop Storage",
    },

    stock: 32,
    sku: "FLV-KIT-002",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Counter", "Organizer"],
  },

  {
    id: 3,
    name: "FLOVR Spice Storage Rack",
    category: "Kitchenware",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.5,
    reviews: 76,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606850246029-dd00b6d7d2a4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "A compact rack to keep your everyday spices neatly arranged.",

    description:
      "Organize your spice collection with the FLOVR Spice Storage Rack. Its compact design saves valuable kitchen space while keeping your most-used spices accessible.",

    features: [
      "Compact design",
      "Easy spice access",
      "Stable construction",
      "Easy to maintain",
    ],

    specifications: {
      Material: "Metal",
      Color: "Matte Beige",
      Dimensions: "28 × 12 × 20 cm",
      Capacity: "12 Spice Jars",
    },

    stock: 41,
    sku: "FLV-KIT-003",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Spice", "Rack"],
  },

  {
    id: 4,
    name: "FLOVR Dish Drying Rack",
    category: "Kitchenware",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 4.7,
    reviews: 91,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Modern dish drying rack designed for plates, cups and utensils.",

    description:
      "Dry and organize your dishes efficiently with the FLOVR Dish Drying Rack. Multiple sections provide dedicated space for plates, bowls, glasses and cutlery.",

    features: [
      "Multiple storage sections",
      "Water drainage design",
      "Rust-resistant construction",
      "Easy to clean",
    ],

    specifications: {
      Material: "Stainless Steel",
      Color: "Beige",
      Dimensions: "45 × 30 × 18 cm",
      Capacity: "Large",
    },

    stock: 18,
    sku: "FLV-KIT-004",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Dish Rack", "Drying"],
  },

  {
    id: 5,
    name: "FLOVR Airtight Storage Container Set",
    category: "Kitchenware",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.8,
    reviews: 142,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606914469633-6dce3e6c2f43?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753051-9d4b4b7d7d8f?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Airtight containers for keeping grains, pulses and ingredients fresh.",

    description:
      "Create an organized pantry with the FLOVR Airtight Storage Container Set. The secure lids help keep ingredients fresh while the stackable design saves space.",

    features: [
      "Airtight lids",
      "Stackable design",
      "Food-safe material",
      "Transparent body",
    ],

    specifications: {
      Material: "Food Grade Plastic",
      Color: "Transparent",
      Pieces: "6 Containers",
      Usage: "Food Storage",
    },

    stock: 45,
    sku: "FLV-KIT-005",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Containers", "Storage"],
  },

  {
    id: 6,
    name: "FLOVR Kitchen Utility Stand",
    category: "Kitchenware",
    price: 749,
    originalPrice: 949,
    discount: 21,
    rating: 4.4,
    reviews: 58,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Versatile utility stand for organizing everyday kitchen essentials.",

    description:
      "Make better use of your kitchen space with this versatile utility stand. Its practical shelves are perfect for jars, bottles and small appliances.",

    features: [
      "Multi-level storage",
      "Space efficient",
      "Sturdy build",
      "Multipurpose usage",
    ],

    specifications: {
      Material: "Engineered Metal",
      Color: "Mocha",
      Dimensions: "35 × 20 × 40 cm",
      Usage: "Kitchen Organization",
    },

    stock: 27,
    sku: "FLV-KIT-006",
    delivery: "Free delivery in 3–5 days",
    tags: ["Kitchen", "Stand", "Utility"],
  },

  // =========================================================
  // HOUSEHOLD
  // =========================================================

  {
    id: 7,
    name: "FLOVR Multipurpose Storage Basket",
    category: "Household",
    price: 499,
    originalPrice: 649,
    discount: 23,
    rating: 4.5,
    reviews: 72,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Stylish multipurpose basket for everyday home organization.",

    description:
      "Store toys, clothes, accessories and household essentials neatly with the FLOVR Multipurpose Storage Basket.",

    features: [
      "Lightweight",
      "Easy to carry",
      "Multipurpose design",
      "Easy to clean",
    ],

    specifications: {
      Material: "Woven Fabric",
      Color: "Beige",
      Dimensions: "35 × 25 × 20 cm",
      Usage: "Home Storage",
    },

    stock: 38,
    sku: "FLV-HOM-007",
    delivery: "Free delivery in 3–5 days",
    tags: ["Home", "Basket", "Storage"],
  },

  {
    id: 8,
    name: "FLOVR Foldable Household Rack",
    category: "Household",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.6,
    reviews: 61,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Foldable rack that provides extra storage without taking much space.",

    description:
      "The FLOVR Foldable Household Rack is ideal for bedrooms, balconies, kitchens and utility areas. Fold it away easily when you need extra floor space.",

    features: [
      "Foldable design",
      "Space saving",
      "Strong frame",
      "Multiple uses",
    ],

    specifications: {
      Material: "Powder Coated Steel",
      Color: "Mocha",
      Dimensions: "60 × 35 × 120 cm",
      Capacity: "Multi Shelf",
    },

    stock: 20,
    sku: "FLV-HOM-008",
    delivery: "Free delivery in 3–5 days",
    tags: ["Home", "Rack", "Foldable"],
  },

  {
    id: 9,
    name: "FLOVR Laundry Basket",
    category: "Household",
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.5,
    reviews: 87,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1610557892470-a2a2f1fef4d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Large laundry basket with a practical and stylish design.",

    description:
      "Keep laundry organized with the FLOVR Laundry Basket. Its lightweight construction and comfortable handles make it easy to move around your home.",

    features: [
      "Large capacity",
      "Comfortable handles",
      "Lightweight",
      "Foldable design",
    ],

    specifications: {
      Material: "Fabric",
      Color: "Natural Beige",
      Capacity: "45 Litres",
      Usage: "Laundry",
    },

    stock: 34,
    sku: "FLV-HOM-009",
    delivery: "Free delivery in 3–5 days",
    tags: ["Laundry", "Basket", "Home"],
  },

  {
    id: 10,
    name: "FLOVR Utility Stool",
    category: "Household",
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.3,
    reviews: 49,
    isNew: false,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Compact utility stool for everyday household use.",

    description:
      "A simple and practical stool for kitchens, bedrooms, bathrooms and utility spaces. Its compact size makes it easy to store.",

    features: [
      "Lightweight",
      "Easy to move",
      "Strong construction",
      "Compact footprint",
    ],

    specifications: {
      Material: "Durable Plastic",
      Color: "Cream",
      Height: "45 cm",
      Usage: "Household",
    },

    stock: 42,
    sku: "FLV-HOM-010",
    delivery: "Free delivery in 3–5 days",
    tags: ["Home", "Stool", "Utility"],
  },

  {
    id: 11,
    name: "FLOVR Home Organizer Box",
    category: "Household",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.6,
    reviews: 67,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Keep small household items neatly stored and easy to find.",

    description:
      "The FLOVR Home Organizer Box helps reduce clutter in wardrobes, shelves, desks and cabinets while keeping everyday essentials organized.",

    features: [
      "Stackable",
      "Compact design",
      "Easy access",
      "Multipurpose",
    ],

    specifications: {
      Material: "PP Plastic",
      Color: "Beige",
      Dimensions: "30 × 22 × 16 cm",
      Usage: "Home Organization",
    },

    stock: 29,
    sku: "FLV-HOM-011",
    delivery: "Free delivery in 3–5 days",
    tags: ["Home", "Organizer", "Box"],
  },

  {
    id: 12,
    name: "FLOVR Decorative Wall Shelf",
    category: "Household",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.7,
    reviews: 83,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Minimal wall shelf for displaying and organizing home essentials.",

    description:
      "Add practical storage and a warm decorative touch to your home with the FLOVR Decorative Wall Shelf.",

    features: [
      "Minimal design",
      "Wall mounted",
      "Strong construction",
      "Decorative and practical",
    ],

    specifications: {
      Material: "Engineered Wood",
      Color: "Natural Wood",
      Dimensions: "60 × 20 × 18 cm",
      Usage: "Wall Storage",
    },

    stock: 16,
    sku: "FLV-HOM-012",
    delivery: "Free delivery in 3–5 days",
    tags: ["Home", "Shelf", "Decor"],
  },

  // =========================================================
  // STORAGE
  // =========================================================

  {
    id: 13,
    name: "FLOVR 5 Layer Book Shelf",
    category: "Storage",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviews: 126,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Five spacious layers for books, decor and everyday storage.",

    description:
      "The FLOVR 5 Layer Book Shelf combines modern styling with practical storage. Use it for books, plants, decor pieces and household essentials.",

    features: [
      "Five spacious shelves",
      "Modern design",
      "Stable structure",
      "Multipurpose storage",
    ],

    specifications: {
      Material: "Engineered Wood",
      Color: "Natural Oak",
      Height: "150 cm",
      Shelves: "5",
    },

    stock: 14,
    sku: "FLV-STR-013",
    delivery: "Free delivery in 4–6 days",
    tags: ["Storage", "Bookshelf", "Home"],
  },

  {
    id: 14,
    name: "FLOVR 4 Layer Shoe Rack",
    category: "Storage",
    price: 1099,
    originalPrice: 1399,
    discount: 21,
    rating: 4.7,
    reviews: 98,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1554138928-9e6a5c0e8a1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Four-level shoe storage solution for a clean and organized entrance.",

    description:
      "Keep your footwear collection organized with the FLOVR 4 Layer Shoe Rack. Its vertical design maximizes storage while taking minimal floor space.",

    features: [
      "Four storage levels",
      "Space-saving design",
      "Easy assembly",
      "Sturdy frame",
    ],

    specifications: {
      Material: "Powder Coated Steel",
      Color: "Matte Black",
      Dimensions: "60 × 30 × 80 cm",
      Capacity: "12–16 Pairs",
    },

    stock: 22,
    sku: "FLV-STR-014",
    delivery: "Free delivery in 4–6 days",
    tags: ["Storage", "Shoe Rack", "Organizer"],
  },

  {
    id: 15,
    name: "FLOVR 3 Tier Storage Rack",
    category: "Storage",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 4.6,
    reviews: 88,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Three-tier rack for organizing home and utility essentials.",

    description:
      "The FLOVR 3 Tier Storage Rack is perfect for kitchens, bathrooms, bedrooms and utility areas where extra organization is needed.",

    features: [
      "Three spacious tiers",
      "Compact footprint",
      "Strong frame",
      "Multipurpose",
    ],

    specifications: {
      Material: "Metal",
      Color: "Mocha",
      Dimensions: "45 × 30 × 75 cm",
      Shelves: "3",
    },

    stock: 26,
    sku: "FLV-STR-015",
    delivery: "Free delivery in 4–6 days",
    tags: ["Storage", "Rack", "Organizer"],
  },

  {
    id: 16,
    name: "FLOVR Under Bed Storage Box",
    category: "Storage",
    price: 649,
    originalPrice: 849,
    discount: 24,
    rating: 4.5,
    reviews: 64,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Low-profile storage box designed to fit neatly under your bed.",

    description:
      "Use unused space beneath your bed with the FLOVR Under Bed Storage Box. It is ideal for seasonal clothing, blankets, shoes and accessories.",

    features: [
      "Space-saving",
      "Large capacity",
      "Easy to slide",
      "Protects stored items",
    ],

    specifications: {
      Material: "Fabric",
      Color: "Beige",
      Dimensions: "80 × 40 × 18 cm",
      Capacity: "Large",
    },

    stock: 31,
    sku: "FLV-STR-016",
    delivery: "Free delivery in 3–5 days",
    tags: ["Storage", "Bed", "Organizer"],
  },

  {
    id: 17,
    name: "FLOVR Modular Storage Cabinet",
    category: "Storage",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.7,
    reviews: 73,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Flexible modular cabinet for modern home organization.",

    description:
      "The FLOVR Modular Storage Cabinet provides flexible storage for bedrooms, living rooms, offices and utility areas.",

    features: [
      "Modular design",
      "Large storage capacity",
      "Easy to maintain",
      "Modern appearance",
    ],

    specifications: {
      Material: "Engineered Board",
      Color: "Warm Beige",
      Dimensions: "75 × 35 × 120 cm",
      Compartments: "Multiple",
    },

    stock: 10,
    sku: "FLV-STR-017",
    delivery: "Free delivery in 5–7 days",
    tags: ["Storage", "Cabinet", "Modular"],
  },

  {
    id: 18,
    name: "FLOVR Closet Organizer Set",
    category: "Storage",
    price: 749,
    originalPrice: 949,
    discount: 21,
    rating: 4.6,
    reviews: 81,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Organize clothes, accessories and small items inside your wardrobe.",

    description:
      "Make your wardrobe easier to manage with the FLOVR Closet Organizer Set. Separate clothing and accessories into dedicated compartments.",

    features: [
      "Multiple organizers",
      "Foldable",
      "Lightweight",
      "Wardrobe friendly",
    ],

    specifications: {
      Material: "Non-Woven Fabric",
      Color: "Cream",
      Pieces: "6 Organizers",
      Usage: "Closet Storage",
    },

    stock: 36,
    sku: "FLV-STR-018",
    delivery: "Free delivery in 3–5 days",
    tags: ["Storage", "Closet", "Organizer"],
  },

  // =========================================================
  // CLEANING
  // =========================================================

  {
    id: 19,
    name: "FLOVR Floor Cleaning Mop",
    category: "Cleaning",
    price: 399,
    originalPrice: 549,
    discount: 27,
    rating: 4.5,
    reviews: 93,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Lightweight floor mop for quick and efficient everyday cleaning.",

    description:
      "Keep your floors fresh with the FLOVR Floor Cleaning Mop. Its flexible head helps reach corners while the microfiber surface picks up dust and dirt.",

    features: [
      "Microfiber cleaning head",
      "Flexible mop head",
      "Lightweight handle",
      "Easy to wash",
    ],

    specifications: {
      Material: "Microfiber + Steel",
      Color: "Beige",
      Handle: "Adjustable",
      Usage: "Floor Cleaning",
    },

    stock: 52,
    sku: "FLV-CLN-019",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Mop", "Floor"],
  },

  {
    id: 20,
    name: "FLOVR Spin Mop Bucket Set",
    category: "Cleaning",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.7,
    reviews: 118,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Complete spin mop set with bucket for convenient floor cleaning.",

    description:
      "The FLOVR Spin Mop Bucket Set makes everyday floor cleaning easier with a practical spin mechanism and durable mop head.",

    features: [
      "360° rotating mop",
      "Spin wringer",
      "Durable bucket",
      "Washable microfiber head",
    ],

    specifications: {
      Material: "Plastic + Microfiber",
      Color: "Cream",
      Capacity: "12 Litres",
      Usage: "Floor Cleaning",
    },

    stock: 23,
    sku: "FLV-CLN-020",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Spin Mop", "Bucket"],
  },

  {
    id: 21,
    name: "FLOVR Microfiber Cleaning Cloth Set",
    category: "Cleaning",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    reviews: 154,
    isNew: true,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Soft and absorbent microfiber cloths for everyday cleaning.",

    description:
      "The FLOVR Microfiber Cleaning Cloth Set is suitable for kitchen counters, glass, furniture, appliances and general household cleaning.",

    features: [
      "Highly absorbent",
      "Reusable",
      "Lint-free",
      "Machine washable",
    ],

    specifications: {
      Material: "Microfiber",
      Color: "Mixed",
      Pieces: "12 Cloths",
      Size: "30 × 30 cm",
    },

    stock: 80,
    sku: "FLV-CLN-021",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Cloth", "Microfiber"],
  },

  {
    id: 22,
    name: "FLOVR Long Handle Cleaning Brush",
    category: "Cleaning",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.4,
    reviews: 67,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Long-handle brush for hard-to-reach cleaning areas.",

    description:
      "Clean floors, corners and difficult areas comfortably with the FLOVR Long Handle Cleaning Brush.",

    features: [
      "Long ergonomic handle",
      "Strong bristles",
      "Corner cleaning",
      "Easy to store",
    ],

    specifications: {
      Material: "PP + Nylon",
      Color: "Mocha",
      Length: "120 cm",
      Usage: "Deep Cleaning",
    },

    stock: 44,
    sku: "FLV-CLN-022",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Brush", "Long Handle"],
  },

  {
    id: 23,
    name: "FLOVR Window Cleaning Squeegee",
    category: "Cleaning",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.5,
    reviews: 73,
    isNew: false,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Simple squeegee for streak-free glass and window cleaning.",

    description:
      "Remove water and cleaning solution quickly from windows, mirrors and shower glass with the FLOVR Window Cleaning Squeegee.",

    features: [
      "Flexible rubber blade",
      "Streak-free cleaning",
      "Lightweight",
      "Easy grip",
    ],

    specifications: {
      Material: "ABS + Rubber",
      Color: "Cream",
      Width: "25 cm",
      Usage: "Glass Cleaning",
    },

    stock: 48,
    sku: "FLV-CLN-023",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Window", "Squeegee"],
  },

  {
    id: 24,
    name: "FLOVR Cleaning Tool Organizer",
    category: "Cleaning",
    price: 499,
    originalPrice: 649,
    discount: 23,
    rating: 4.6,
    reviews: 52,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Keep your cleaning brushes and tools neatly organized.",

    description:
      "The FLOVR Cleaning Tool Organizer gives your cleaning supplies a dedicated place, helping keep utility areas tidy and easy to access.",

    features: [
      "Multiple compartments",
      "Compact design",
      "Easy to clean",
      "Multipurpose",
    ],

    specifications: {
      Material: "Plastic",
      Color: "Beige",
      Dimensions: "35 × 20 × 25 cm",
      Usage: "Cleaning Storage",
    },

    stock: 35,
    sku: "FLV-CLN-024",
    delivery: "Free delivery in 3–5 days",
    tags: ["Cleaning", "Organizer", "Storage"],
  },

  // =========================================================
  // BATHROOM
  // =========================================================

  {
    id: 25,
    name: "FLOVR Bathroom Corner Rack",
    category: "Bathroom",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.6,
    reviews: 86,
    isNew: true,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Space-saving corner rack for shampoos, soaps and bathroom essentials.",

    description:
      "Make better use of unused bathroom corners with the FLOVR Bathroom Corner Rack. Store daily essentials neatly without taking up much space.",

    features: [
      "Corner-saving design",
      "Multiple shelves",
      "Water-resistant",
      "Easy installation",
    ],

    specifications: {
      Material: "Aluminium",
      Color: "Matte Beige",
      Shelves: "3",
      Usage: "Bathroom Storage",
    },

    stock: 28,
    sku: "FLV-BTH-025",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Rack", "Storage"],
  },

  {
    id: 26,
    name: "FLOVR Bathroom Storage Basket",
    category: "Bathroom",
    price: 399,
    originalPrice: 549,
    discount: 27,
    rating: 4.5,
    reviews: 63,
    isNew: false,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Compact basket for organizing everyday bathroom accessories.",

    description:
      "Store towels, toiletries and personal-care accessories in the FLOVR Bathroom Storage Basket.",

    features: [
      "Water-resistant",
      "Lightweight",
      "Easy to carry",
      "Multipurpose",
    ],

    specifications: {
      Material: "Plastic",
      Color: "Cream",
      Dimensions: "30 × 20 × 18 cm",
      Usage: "Bathroom Storage",
    },

    stock: 46,
    sku: "FLV-BTH-026",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Basket", "Organizer"],
  },

  {
    id: 27,
    name: "FLOVR Soap & Shampoo Organizer",
    category: "Bathroom",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.4,
    reviews: 57,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Keep soaps, shampoos and bath essentials neatly arranged.",

    description:
      "The FLOVR Soap & Shampoo Organizer keeps your bathroom essentials organized and easily accessible while reducing countertop clutter.",

    features: [
      "Multiple compartments",
      "Drainage holes",
      "Wall-friendly design",
      "Easy to clean",
    ],

    specifications: {
      Material: "ABS Plastic",
      Color: "Beige",
      Dimensions: "28 × 12 × 15 cm",
      Usage: "Bathroom Organizer",
    },

    stock: 39,
    sku: "FLV-BTH-027",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Soap", "Shampoo"],
  },

  {
    id: 28,
    name: "FLOVR Toilet Cleaning Brush Set",
    category: "Bathroom",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.5,
    reviews: 91,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Durable toilet cleaning brush with hygienic storage holder.",

    description:
      "Maintain a cleaner bathroom with the FLOVR Toilet Cleaning Brush Set. The compact holder keeps the brush stored neatly after use.",

    features: [
      "Strong cleaning bristles",
      "Hygienic holder",
      "Compact design",
      "Easy to clean",
    ],

    specifications: {
      Material: "PP + Nylon",
      Color: "Cream",
      Handle: "Long",
      Usage: "Toilet Cleaning",
    },

    stock: 57,
    sku: "FLV-BTH-028",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Cleaning", "Brush"],
  },

  {
    id: 29,
    name: "FLOVR Bathroom Towel Holder",
    category: "Bathroom",
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.6,
    reviews: 48,
    isNew: true,
    isBestSeller: false,

    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Minimal towel holder designed for clean and organized bathrooms.",

    description:
      "Keep towels neatly arranged with the FLOVR Bathroom Towel Holder. Its simple design complements modern bathroom interiors.",

    features: [
      "Minimal design",
      "Strong mounting",
      "Rust-resistant",
      "Easy installation",
    ],

    specifications: {
      Material: "Stainless Steel",
      Color: "Brushed Steel",
      Length: "50 cm",
      Usage: "Towel Storage",
    },

    stock: 30,
    sku: "FLV-BTH-029",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Towel", "Holder"],
  },

  {
    id: 30,
    name: "FLOVR Bathroom Utility Shelf",
    category: "Bathroom",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.7,
    reviews: 69,
    isNew: false,
    isBestSeller: true,

    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",

    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    ],

    shortDescription:
      "Practical bathroom shelf for toiletries and daily essentials.",

    description:
      "The FLOVR Bathroom Utility Shelf provides convenient storage for toiletries, skincare products, towels and other bathroom essentials.",

    features: [
      "Multiple shelves",
      "Water-resistant",
      "Space-saving",
      "Easy to maintain",
    ],

    specifications: {
      Material: "Aluminium",
      Color: "Warm Beige",
      Dimensions: "50 × 20 × 60 cm",
      Shelves: "3",
    },

    stock: 21,
    sku: "FLV-BTH-030",
    delivery: "Free delivery in 3–5 days",
    tags: ["Bathroom", "Shelf", "Utility"],
  },
];

export default products;