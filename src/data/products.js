// src/data/products.js

const products = [
  // =========================================================
  // 1. NORMAL PRODUCT — NO VARIANTS
  // =========================================================
  {
    id: 1,
    name: "Kitchen Storage Organizer",
    category: "Kitchenware",

    description:
      "A practical kitchen storage organizer designed to keep your kitchen clean and organized.",

    shortDescription:
      "Keep your kitchen clean, organized and easy to manage.",

    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",

    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800",
    ],

    price: 499,
    originalPrice: 699,
    discount: 29,

    stock: 25,

    rating: 4.5,
    reviews: 82,

    sku: "FLV-KITCHEN-ORG-001",

    status: "Active",

    isNew: true,
    isBestSeller: true,

    hasVariants: false,

    variants: [],

    features: [
      "Space-saving design",
      "Durable construction",
      "Easy to clean",
      "Suitable for everyday use",
    ],

    specifications: {
      Material: "Plastic",
      Color: "White",
      Weight: "450g",
      Usage: "Kitchen Storage",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },

  // =========================================================
  // 2. WATER BOTTLE
  // MAIN VARIANT = COLOR
  // SUB VARIANT = CAPACITY
  // =========================================================
  {
    id: 2,

    name: "FLOVR Water Bottle",
    category: "Kitchenware",

    description:
      "Reusable everyday water bottle available in multiple colors and capacities.",

    shortDescription:
      "Reusable water bottle available in multiple colors and capacities.",

    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",

    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    ],

    price: 399,
    originalPrice: 499,
    discount: 20,

    stock: 0,

    rating: 4.8,
    reviews: 126,

    sku: "FLV-WATER",

    status: "Active",

    isNew: true,
    isBestSeller: true,

    hasVariants: true,

    // =======================================================
    // COLOR VARIANTS
    // =======================================================
    variants: [
      // -------------------------------------------------------
      // BLACK
      // -------------------------------------------------------
      {
        id: "black",
        value: "Black",
        name: "Black",

        subVariants: [
          {
            id: "black-500ml",
            value: "500ml",
            name: "500ml",

            price: 399,
            originalPrice: 499,
            discount: 20,

            stock: 20,
            lowStockThreshold: 5,

            sku: "FLV-WATER-BLACK-500ML-001",

            image:
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+500ML",

            images: [
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+500ML",
            ],

            weight: 250,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 22,
              unit: "cm",
            },
          },

          {
            id: "black-750ml",
            value: "750ml",
            name: "750ml",

            price: 449,
            originalPrice: 549,
            discount: 18,

            stock: 15,
            lowStockThreshold: 5,

            sku: "FLV-WATER-BLACK-750ML-002",

            image:
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+750ML",

            images: [
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+750ML",
            ],

            weight: 320,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 27,
              unit: "cm",
            },
          },
        ],
      },

      // -------------------------------------------------------
      // WHITE
      // -------------------------------------------------------
      {
        id: "white",
        value: "White",
        name: "White",

        subVariants: [
          {
            id: "white-500ml",
            value: "500ml",
            name: "500ml",

            price: 399,
            originalPrice: 499,
            discount: 20,

            stock: 18,
            lowStockThreshold: 5,

            sku: "FLV-WATER-WHITE-500ML-003",

            image:
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+500ML",

            images: [
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+500ML",
            ],

            weight: 250,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 22,
              unit: "cm",
            },
          },

          {
            id: "white-750ml",
            value: "750ml",
            name: "750ml",

            price: 449,
            originalPrice: 549,
            discount: 18,

            stock: 10,
            lowStockThreshold: 5,

            sku: "FLV-WATER-WHITE-750ML-004",

            image:
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+750ML",

            images: [
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+750ML",
            ],

            weight: 320,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 27,
              unit: "cm",
            },
          },
        ],
      },

      // -------------------------------------------------------
      // BLUE
      // -------------------------------------------------------
      {
        id: "blue",
        value: "Blue",
        name: "Blue",

        subVariants: [
          {
            id: "blue-500ml",
            value: "500ml",
            name: "500ml",

            price: 399,
            originalPrice: 499,
            discount: 20,

            stock: 22,
            lowStockThreshold: 5,

            sku: "FLV-WATER-BLUE-500ML-005",

            image:
              "https://dummyimage.com/800x800/3b82f6/ffffff&text=BLUE+500ML",

            images: [
              "https://dummyimage.com/800x800/3b82f6/ffffff&text=BLUE+500ML",
            ],

            weight: 250,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 22,
              unit: "cm",
            },
          },

          {
            id: "blue-750ml",
            value: "750ml",
            name: "750ml",

            price: 449,
            originalPrice: 549,
            discount: 18,

            stock: 8,
            lowStockThreshold: 5,

            sku: "FLV-WATER-BLUE-750ML-006",

            image:
              "https://dummyimage.com/800x800/3b82f6/ffffff&text=BLUE+750ML",

            images: [
              "https://dummyimage.com/800x800/3b82f6/ffffff&text=BLUE+750ML",
            ],

            weight: 320,
            unit: "g",

            dimensions: {
              length: 7,
              width: 7,
              height: 27,
              unit: "cm",
            },
          },
        ],
      },
    ],

    features: [
      "Reusable design",
      "Multiple colors",
      "Multiple capacities",
      "Lightweight",
      "Easy to carry",
    ],

    specifications: {
      Material: "Food-grade plastic",
      Capacity: "500ml / 750ml",
      Usage: "Daily drinking",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },

  // =========================================================
  // 3. STORAGE BASKET
  // MAIN VARIANT = SIZE
  // NO SUB VARIANT
  // =========================================================
  {
    id: 3,

    name: "FLOVR Storage Basket",
    category: "Storage",

    description:
      "Multipurpose storage basket for organizing clothes, toys, kitchen items and household accessories.",

    shortDescription:
      "Multipurpose basket for clean and organized storage.",

    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",

    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    ],

    price: 349,
    originalPrice: 449,
    discount: 22,

    stock: 0,

    rating: 4.6,
    reviews: 64,

    sku: "FLV-BASKET",

    status: "Active",

    isNew: true,
    isBestSeller: false,

    hasVariants: true,

    variants: [
      {
        id: "small",
        value: "Small",
        name: "Small",

        price: 349,
        originalPrice: 449,
        discount: 22,

        stock: 20,
        lowStockThreshold: 5,

        sku: "FLV-BASKET-SMALL-001",

        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",

        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        ],

        subVariants: [],
      },

      {
        id: "medium",
        value: "Medium",
        name: "Medium",

        price: 449,
        originalPrice: 549,
        discount: 18,

        stock: 15,
        lowStockThreshold: 5,

        sku: "FLV-BASKET-MEDIUM-002",

        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",

        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        ],

        subVariants: [],
      },

      {
        id: "large",
        value: "Large",
        name: "Large",

        price: 549,
        originalPrice: 699,
        discount: 21,

        stock: 8,
        lowStockThreshold: 5,

        sku: "FLV-BASKET-LARGE-003",

        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",

        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        ],

        subVariants: [],
      },
    ],

    features: [
      "Multipurpose storage",
      "Lightweight",
      "Durable",
      "Easy to clean",
    ],

    specifications: {
      Material: "Plastic",
      Usage: "Household storage",
      Sizes: "Small / Medium / Large",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },

  // =========================================================
  // 4. SHOE RACK
  // MAIN VARIANT = COLOR
  // SUB VARIANT = LAYERS
  // =========================================================
  {
    id: 4,

    name: "FLOVR 4 Layer Shoe Rack",
    category: "Storage",

    description:
      "Four layer shoe rack designed for compact and organized footwear storage.",

    shortDescription:
      "Compact shoe rack for organized footwear storage.",

    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800",

    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800",
    ],

    price: 999,
    originalPrice: 1299,
    discount: 23,

    stock: 0,

    rating: 4.7,
    reviews: 94,

    sku: "FLV-SHOERACK",

    status: "Active",

    isNew: false,
    isBestSeller: true,

    hasVariants: true,

    variants: [
      // BLACK
      {
        id: "black",
        value: "Black",
        name: "Black",

        subVariants: [
          {
            id: "black-4-layer",
            value: "4 Layer",
            name: "4 Layer",

            price: 999,
            originalPrice: 1299,
            discount: 23,

            stock: 15,
            lowStockThreshold: 5,

            sku: "FLV-SHOERACK-BLACK-4L-001",

            image:
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+4+LAYER",

            images: [
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+4+LAYER",
            ],

            weight: 1800,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 80,
              unit: "cm",
            },
          },

          {
            id: "black-5-layer",
            value: "5 Layer",
            name: "5 Layer",

            price: 1199,
            originalPrice: 1499,
            discount: 20,

            stock: 8,
            lowStockThreshold: 5,

            sku: "FLV-SHOERACK-BLACK-5L-002",

            image:
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+5+LAYER",

            images: [
              "https://dummyimage.com/800x800/222222/ffffff&text=BLACK+5+LAYER",
            ],

            weight: 2200,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 100,
              unit: "cm",
            },
          },
        ],
      },

      // WHITE
      {
        id: "white",
        value: "White",
        name: "White",

        subVariants: [
          {
            id: "white-4-layer",
            value: "4 Layer",
            name: "4 Layer",

            price: 999,
            originalPrice: 1299,
            discount: 23,

            stock: 12,
            lowStockThreshold: 5,

            sku: "FLV-SHOERACK-WHITE-4L-003",

            image:
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+4+LAYER",

            images: [
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+4+LAYER",
            ],

            weight: 1800,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 80,
              unit: "cm",
            },
          },

          {
            id: "white-5-layer",
            value: "5 Layer",
            name: "5 Layer",

            price: 1199,
            originalPrice: 1499,
            discount: 20,

            stock: 5,
            lowStockThreshold: 5,

            sku: "FLV-SHOERACK-WHITE-5L-004",

            image:
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+5+LAYER",

            images: [
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+5+LAYER",
            ],

            weight: 2200,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 100,
              unit: "cm",
            },
          },
        ],
      },
    ],

    features: [
      "4 and 5 layer options",
      "Space-saving design",
      "Strong frame",
      "Easy assembly",
    ],

    specifications: {
      Material: "Metal and plastic",
      Colors: "Black / White",
      Layers: "4 / 5",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },

  // =========================================================
  // 5. FLOOR CLEANING MOP
  // NO VARIANTS
  // =========================================================
  {
    id: 5,

    name: "FLOVR Floor Cleaning Mop",
    category: "Cleaning",

    description:
      "Lightweight floor cleaning mop suitable for everyday household cleaning.",

    shortDescription:
      "Lightweight mop for everyday household cleaning.",

    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",

    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    ],

    price: 449,
    originalPrice: 599,
    discount: 25,

    stock: 35,

    rating: 4.4,
    reviews: 48,

    sku: "FLV-MOP-001",

    status: "Active",

    isNew: true,
    isBestSeller: false,

    hasVariants: false,

    variants: [],

    features: [
      "Lightweight",
      "Easy to use",
      "Quick cleaning",
      "Suitable for daily use",
    ],

    specifications: {
      Material: "Microfiber",
      Usage: "Floor cleaning",
      Weight: "600g",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },

  // =========================================================
  // 6. BOOK SHELF
  // MAIN VARIANT = COLOR
  // SUB VARIANT = STANDARD
  // =========================================================
  {
    id: 6,

    name: "FLOVR 5 Layer Book Shelf",
    category: "Storage",

    description:
      "Modern five-layer bookshelf suitable for books, decor and household storage.",

    shortDescription:
      "Modern bookshelf for books, decor and household storage.",

    image:
      "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+BOOK+SHELF",

    images: [
      "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+BOOK+SHELF",
    ],

    price: 1299,
    originalPrice: 1599,
    discount: 19,

    stock: 0,

    rating: 4.8,
    reviews: 126,

    sku: "FLV-BOOK-SHELF",

    status: "Active",

    isNew: true,
    isBestSeller: true,

    hasVariants: true,

    variants: [
      // BROWN
      {
        id: "brown",
        value: "Brown",
        name: "Brown",

        subVariants: [
          {
            id: "brown-standard",
            value: "Standard",
            name: "Standard",

            price: 1299,
            originalPrice: 1599,
            discount: 19,

            stock: 10,
            lowStockThreshold: 5,

            sku: "FLV-BOOK-SHELF-BROWN-STD-001",

            image:
              "https://dummyimage.com/800x800/8b5e3c/ffffff&text=BROWN+BOOK+SHELF",

            images: [
              "https://dummyimage.com/800x800/8b5e3c/ffffff&text=BROWN+BOOK+SHELF",
            ],

            weight: 5000,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 150,
              unit: "cm",
            },
          },
        ],
      },

      // WHITE
      {
        id: "white",
        value: "White",
        name: "White",

        subVariants: [
          {
            id: "white-standard",
            value: "Standard",
            name: "Standard",

            price: 1349,
            originalPrice: 1649,
            discount: 18,

            stock: 7,
            lowStockThreshold: 5,

            sku: "FLV-BOOK-SHELF-WHITE-STD-002",

            image:
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+BOOK+SHELF",

            images: [
              "https://dummyimage.com/800x800/f5f5f5/4A3428&text=WHITE+BOOK+SHELF",
            ],

            weight: 5000,
            unit: "g",

            dimensions: {
              length: 60,
              width: 30,
              height: 150,
              unit: "cm",
            },
          },
        ],
      },
    ],

    features: [
      "Five-layer design",
      "Modern appearance",
      "Strong structure",
      "Suitable for books and decor",
    ],

    specifications: {
      Material: "Engineered wood",
      Colors: "Brown / White",
      Layers: "5",
      Height: "150cm",
    },

    delivery: "Delivered safely within 3–7 business days.",
  },
];

export default products;  