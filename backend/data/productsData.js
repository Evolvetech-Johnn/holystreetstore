const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Camiseta Oversized 'Propósito' - Black",
    description: "Camiseta premium com corte oversized, estampada com a palavra 'Propósito' em caligrafia urbana.",
    price: 129.90,
    originalPrice: 159.90,
    category: "Camisetas",
    image: "/img/products/oversized-black.jpg",
    featured: true,
    rating: 4.9,
    reviews: 24,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Black"],
    stock: { status: "available", quantity: 15 },
    holyDropIncluded: true
  },
  {
    id: 2,
    name: "Moletom Hoodie 'Santo' - Off White",
    description: "Moletom pesado com capuz, bordado minimalista 'Holy' no peito. Conforto e fé.",
    price: 249.90,
    originalPrice: 289.90,
    category: "Moletons",
    image: "/img/products/hoodie-white.jpg",
    featured: true,
    rating: 5.0,
    reviews: 12,
    sizes: ["M", "G", "GG"],
    colors: ["Off White"],
    stock: { status: "available", quantity: 8 },
    holyDropIncluded: true
  },
  {
    id: 3,
    name: "Camiseta Boxy 'Identidade' - Acid Wash",
    description: "Corte boxy moderno com lavagem estonada. Estampa frontal inspirada em Salmos.",
    price: 139.90,
    category: "Camisetas",
    image: "/img/products/boxy-acid.jpg",
    featured: false,
    rating: 4.8,
    reviews: 18,
    sizes: ["P", "M", "G"],
    colors: ["Cinza Estonado"],
    stock: { status: "low_stock", quantity: 3 },
    holyDropIncluded: true
  },
  {
    id: 4,
    name: "Calça Jogger 'Caminho' - Cargo",
    description: "Calça cargo em sarja premium. Detalhes utilitários e ajuste perfeito para o urbano.",
    price: 199.90,
    category: "Calças",
    image: "/img/products/jogger-cargo.jpg",
    featured: false,
    rating: 4.7,
    reviews: 9,
    sizes: ["38", "40", "42", "44"],
    colors: ["Preto", "Bege"],
    stock: { status: "available", quantity: 12 },
    holyDropIncluded: true
  },
  {
    id: 5,
    name: "Boné Dad Hat 'Cruz' - Minimalist",
    description: "Acessório essencial com bordado sutil da cruz. 100% algodão.",
    price: 89.90,
    category: "Acessórios",
    image: "/img/products/cap-cross.jpg",
    featured: false,
    rating: 4.9,
    reviews: 42,
    sizes: ["Ajustável"],
    colors: ["Preto", "Azul Marinho"],
    stock: { status: "available", quantity: 25 },
    holyDropIncluded: false
  }
];

const CATEGORIES_DATA = [
  { name: "Camisetas", icon: "👕", count: 2 },
  { name: "Moletons", icon: "🧥", count: 1 },
  { name: "Calças", icon: "👖", count: 1 },
  { name: "Acessórios", icon: "🧢", count: 1 }
];

module.exports = { PRODUCTS_DATA, CATEGORIES_DATA };
