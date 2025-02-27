// pages/collection.tsx
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  FaFilter,
  FaStar,
  FaChevronDown,
  FaCheckCircle,
  FaChevronUp,
  FaShoppingCart,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
// At the top of your file with other imports
import { useRouter } from "next/navigation";

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Demo products data
const demoProducts: Product[] = [
  {
    id: 1,
    name: "NIKE ADAPT BB",
    price: 980,
    category: "Basketball",
    rating: 4.8,
    image: "/shoes/Nike_Adapt_BB_Self-Lacing_Black_Men_s.webp",
    isNew: true,
  },
  {
    id: 2,
    name: "ADIDAS ULTRA BOOST",
    price: 850,
    category: "Running",
    rating: 4.5,
    image:
      "/shoes/ie1768_1_footwear_photography_sidelateralcenterview_white.webp",
  },
  {
    id: 3,
    name: "PUMA RS-X TECH",
    price: 790,
    category: "Lifestyle",
    rating: 4.2,
    image: "/shoes/puma-rs-x-tech-motorola-silver-sodalite-370272-01.jpg",
    isFeatured: true,
  },
  {
    id: 4,
    name: "NEW BALANCE 997S",
    price: 720,
    category: "Lifestyle",
    rating: 4.3,
    image:
      "/shoes/hypebeast.com_image_2019_07_new-balance-997s-new-colorways-summer-2019-1.avif",
  },
  {
    id: 5,
    name: "JORDAN PROTO MAX",
    price: 1050,
    category: "Basketball",
    rating: 4.9,
    image: "/shoes/Air-Jordan-Proto-Max-720-White-Pure-Platinum-Product.avif",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "NIKE AIR MAX 720",
    price: 880,
    category: "Running",
    rating: 4.6,
    image: "/shoes/WhatsAppImage2024-03-15at4.43.39PM.webp",
  },
  {
    id: 7,
    name: "ADIDAS OZWEEGO",
    price: 650,
    category: "Lifestyle",
    rating: 4.1,
    image: "/shoes/adidas---Men_s-Ozweego-Shoes-_EE6464__01.webp",
  },
  {
    id: 8,
    name: "PUMA FUTURE RIDER",
    price: 590,
    category: "Lifestyle",
    rating: 4.0,
    image: "/shoes/Future-Rider-Play-On-Sneakers.avif",
  },
  {
    id: 9,
    name: "ASICS GEL-QUANTUM",
    price: 750,
    category: "Running",
    rating: 4.4,
    image: "/shoes/1203A594_002_SR_RT_GLB.webp",
    isNew: true,
  },
  {
    id: 10,
    name: "UNDER ARMOUR HOVR",
    price: 680,
    category: "Running",
    rating: 4.2,
    image: "/shoes/VI_3026582_004_LAT_VRLat.webp",
  },
  {
    id: 11,
    name: "REEBOK ZIG KINETICA",
    price: 620,
    category: "Lifestyle",
    rating: 4.0,
    image: "/shoes/id1814_1.webp",
  },
  {
    id: 12,
    name: "CONVERSE ALL STAR BB",
    price: 550,
    category: "Basketball",
    rating: 4.3,
    image: "/shoes/172890c_a_107x1_1.jpg",
  },
];

// Category options
const categories = ["All", "Basketball", "Running", "Lifestyle"];

// Price range options
const priceRanges = [
  { label: "All Prices", min: 0, max: 10000 },
  { label: "Under $600", min: 0, max: 600 },
  { label: "$600 - $800", min: 600, max: 800 },
  { label: "$800 - $1000", min: 800, max: 1000 },
  { label: "Over $1000", min: 1000, max: 10000 },
];

const Collection = () => {
  // State for filtering and sorting
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(demoProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState<"none" | "low-to-high" | "high-to-low">(
    "none"
  );

  // Inside your Collection component, add this line at the top:
  const router = useRouter();

  // Cart functionality
  const addToCart = (product: Product) => {
    // Get current cart
    let cart: CartItem[] = [];
    const storedCart = localStorage.getItem("shooseCart");

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if product already in cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.push({ product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("shooseCart", JSON.stringify(cart));

    // Show add to cart animation/notification
    showAddedToCartNotification(product.name);
  };

  // Notification for add to cart
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  const showAddedToCartNotification = (productName: string) => {
    setNotification({
      visible: true,
      message: `${productName} added to cart`,
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ visible: false, message: "" });
    }, 3000);
  };

  // State for mobile filter menu
  const [showFilters, setShowFilters] = useState(false);

  // Animation states
  const [animateProducts, setAnimateProducts] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);

  // Apply filtering and sorting
  useEffect(() => {
    let result = [...demoProducts];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max
    );

    // Apply sorting
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);

    // Reset and trigger product animation when filters change
    setAnimateProducts(false);
    setTimeout(() => setAnimateProducts(true), 100);
  }, [selectedCategory, selectedPriceRange, sortBy]);

  // Initial animations on page load
  useEffect(() => {
    setAnimateHero(true);
    setTimeout(() => setAnimateProducts(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Collection | Shoose</title>
        <meta
          name="description"
          content="Browse our exclusive footwear collection"
        />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-80 px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/wallpaperflare.com_wallpaper.jpg"
              alt="Collection Background"
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
          </div>

          <div
            className={`relative z-10 container mx-auto px-4 h-full flex flex-col justify-center transition-all duration-1000 ${
              animateHero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-4">
              OUR COLLECTION
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl">
              Discover the latest in innovative footwear. From court-ready
              performance to street-style statement pieces, find your perfect
              match.
            </p>
          </div>
        </section>

        {/* Filters and Products Section */}
        <section className="container mx-auto px-20 py-12">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full py-3 px-4 bg-gray-900 rounded flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FaFilter /> Filters
              </span>
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`md:w-64 space-y-8 transition-all duration-500 ${
                showFilters
                  ? "max-h-screen opacity-100"
                  : "max-h-0 md:max-h-screen opacity-0 md:opacity-100 overflow-hidden"
              }`}
            >
              {/* Category Filter */}
              <div className="filter-card">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center text-sm gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="accent-purple-500"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-card">
                <h3 className="text-xl font-bold mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label
                      key={index}
                      className="flex items-center text-sm gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="accent-purple-500"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-card">
                <h3 className="text-xl font-bold mb-4">Sort By</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === "none"}
                      onChange={() => setSortBy("none")}
                      className="accent-purple-500"
                    />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === "low-to-high"}
                      onChange={() => setSortBy("low-to-high")}
                      className="accent-purple-500"
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={sortBy === "high-to-low"}
                      onChange={() => setSortBy("high-to-low")}
                      className="accent-purple-500"
                    />
                    <span>Price: High to Low</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400 text-sm">
                  {filteredProducts.length} products found
                </p>
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-gray-400">Sort by:</span>
                  <select
                    className="bg-gray-900 border text-sm border-gray-700 rounded px-2 py-1"
                    value={sortBy}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "none" ||
                        value === "low-to-high" ||
                        value === "high-to-low"
                      ) {
                        setSortBy(
                          value as "none" | "low-to-high" | "high-to-low"
                        );
                      }
                    }}
                  >
                    <option value="none">Featured</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-xl text-gray-400">
                    No products match your filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`product-card group transition-all duration-700 cursor-pointer ${
                        animateProducts
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-20"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={() => router.push(`/product?id=${product.id}`)}
                    >
                      {/* Product Image */}
                      <div
                        className="relative h-64 bg-gradient-to-b from-purple-900/20 to-black/40 rounded-lg overflow-hidden group-hover:shadow-glow transition-all duration-500 cursor-pointer"
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={product.image}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="object-contain"
                          />
                        </div>

                        {/* New Tag */}
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </span>
                        )}

                        {/* Quick add button */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center justify-center gap-2 transition-colors"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div
                        className="p-4 space-y-2 cursor-pointer"
                        onClick={() => router.push(`/product?id=${product.id}`)}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-bold tracking-wide">
                            {product.name}
                          </h3>
                          <span className="font-bold">${product.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notification.visible && (
              <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
                <p className="flex items-center">
                  <FaCheckCircle className="mr-2" /> {notification.message}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
