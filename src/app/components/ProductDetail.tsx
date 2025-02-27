// src/app/components/ProductDetail.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaChevronLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

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

// Sample descriptions for products
const productDescriptions: { [key: number]: string } = {
  1: "Experience the future of footwear with the Nike Adapt BB. These self-lacing basketball shoes feature advanced FitAdapt technology, allowing you to find the perfect fit with just a touch of a button. The lightweight design combined with responsive cushioning provides exceptional court performance.",
  2: "The Adidas Ultra Boost delivers unmatched energy return with each stride. Featuring Primeknit upper construction for a sock-like fit and the revolutionary Boost midsole that returns energy with every step. Perfect for serious runners and casual wearers alike.",
  3: "The Puma RS-X Tech blends retro design with modern innovation. These chunky sneakers feature bold color blocking, multiple textures, and the RS (Running System) cushioning technology for superior comfort and stability. A statement piece that stands out in any collection.",
  4: "New Balance 997S combines classic heritage with contemporary style. This modern interpretation of the iconic 997 features ENCAP and ABZORB cushioning for all-day comfort, while the premium suede and mesh upper provide a luxury feel with athletic functionality.",
  5: "The Jordan Proto Max 720 represents the pinnacle of Air Jordan innovation. Featuring Nike's tallest Air unit to date, these futuristic basketball shoes provide unprecedented cushioning and energy return. The adjustable heel straps and lightweight upper ensure a secure, comfortable fit for elite performance.",
  // Default description for other products
  6: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  7: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  8: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  9: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  10: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  11: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
  12: "This premium footwear combines cutting-edge technology with sleek design aesthetics. Featuring advanced cushioning, durable materials, and ergonomic construction, it delivers exceptional comfort and performance. Perfect for both athletic activities and casual wear, it's a versatile addition to any footwear collection.",
};

// Update the component to accept id as a prop
const ProductDetail = ({ id }: { id: string | null }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(9);
  const [addedToCart, setAddedToCart] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Available sizes
  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

  // Fetch product data
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = demoProducts.find((p) => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  // Animation on load
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!product) return;

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
      // Update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({ product, quantity });
    }

    // Save updated cart to localStorage
    localStorage.setItem("shooseCart", JSON.stringify(cart));

    // Dispatch storage event for CartIcon to update
    window.dispatchEvent(new Event("cartUpdated"));

    // Show success animation
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get product description
  const getProductDescription = (productId: number): string => {
    return productDescriptions[productId];
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 md:px-20 py-12 pt-32">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/collection"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaChevronLeft className="mr-2" /> Back to Collection
          </Link>
        </div>

        <div
          className={`flex flex-col md:flex-row gap-12 transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-96 lg:h-[500px] w-full bg-gradient-to-b from-purple-900/20 to-black/40 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-400">{product.category}</span>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold mb-6">${product.price}</p>
              <p className="text-gray-300 text-sm mb-8">
                {getProductDescription(product.id)}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3">SELECT SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-md flex items-center justify-center transition-colors ${
                      selectedSize === size
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3">QUANTITY</h3>
              <div className="flex items-center border border-gray-700 rounded-md w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 h-10 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-md font-bold flex items-center justify-center gap-2 transition-all ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {addedToCart ? (
                <>
                  <FaCheck /> Added to Cart
                </>
              ) : (
                <>
                  <FaShoppingCart /> Add to Cart
                </>
              )}
            </button>

            {/* Additional product info */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-bold mb-4">Product Details</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Premium materials for durability and comfort</li>
                <li>• Responsive cushioning for all-day wear</li>
                <li>• Breathable construction</li>
                <li>• Secure fit with advanced lacing system</li>
                <li>
                  • Style: {product.id}-{product.category.charAt(0)}
                  {product.id + 100}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
