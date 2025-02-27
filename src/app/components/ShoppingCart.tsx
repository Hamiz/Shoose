// pages/cart.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Product interface (same as in collection.tsx)
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

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

const ShoppingCart = () => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Animation states
  const [animateCart, setAnimateCart] = useState(false);
  const [animateSummary, setAnimateSummary] = useState(false);

  // Mock loading cart items from localStorage
  useEffect(() => {
    // Load from localStorage
    const storedCart = localStorage.getItem("shooseCart");

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }

    // Start animations
    setTimeout(() => setAnimateCart(true), 300);
    setTimeout(() => setAnimateSummary(true), 600);
  }, []);

  // Calculate totals whenever cart changes
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newTax = newSubtotal * 0.1; // 10% tax rate
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems]);

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("shooseCart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    // Animate the item being removed
    const itemElement = document.getElementById(`cart-item-${id}`);
    if (itemElement) {
      itemElement.classList.add("scale-95", "opacity-0");
    }

    // Remove after animation completes
    setTimeout(() => {
      const updatedCart = cartItems.filter((item) => item.product.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem("shooseCart", JSON.stringify(updatedCart));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Your Cart | Shoose</title>
        <meta
          name="description"
          content="Review and checkout your selected footwear"
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 md:px-20 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="pt-20 text-4xl md:text-6xl font-bold tracking-wider mb-4">
            YOUR CART
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Image
              src="/Capture (1).png"
              alt="Empty Cart"
              width={150}
              height={150}
              className="opacity-40 mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/collection"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div
                className={`transition-all duration-1000 ${
                  animateCart
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
                    <div className="col-span-6 text-sm">PRODUCT</div>
                    <div className="col-span-2 text-sm text-center">PRICE</div>
                    <div className="col-span-2 text-sm text-center">
                      QUANTITY
                    </div>
                    <div className="col-span-2 text-sm text-center">TOTAL</div>
                  </div>

                  <div className="divide-y divide-gray-800">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.product.id}
                        id={`cart-item-${item.product.id}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 transition-all duration-300 hover:bg-gray-800/30"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                          <div className="relative h-24 w-24 bg-gradient-to-b from-purple-900/20 to-black rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold">{item.product.name}</h3>
                            <p className="text-sm text-gray-400">
                              {item.product.category}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 mt-2 md:hidden"
                            >
                              <FaTrash size={12} /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Price - Mobile */}
                        <div className="md:hidden flex justify-between items-center">
                          <span className="text-sm text-gray-400">Price:</span>
                          <span>${item.product.price}</span>
                        </div>

                        {/* Price - Desktop */}
                        <div className="hidden md:flex md:col-span-2 items-center justify-center">
                          ${item.product.price}
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4">
                          <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="hidden md:block text-red-400 hover:text-red-300"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        {/* Total - Mobile */}
                        <div className="md:hidden flex justify-between items-center">
                          <span className="text-sm text-gray-400">Total:</span>
                          <span className="font-bold">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>

                        {/* Total - Desktop */}
                        <div className="hidden md:flex md:col-span-2 items-center justify-center font-bold">
                          ${item.product.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div
                className={`bg-gray-900 rounded-lg p-6 transition-all duration-1000 ${
                  animateSummary
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full py-3 mt-6 bg-purple-600 hover:bg-purple-700 rounded font-bold transition-colors">
                    CHECKOUT
                  </button>
                </Link>

                <div className="mt-6 text-xs text-gray-400 text-center">
                  <p>We accept all major credit cards</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="w-10 h-6 bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-700 rounded"></div>
                    <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #cart-item-1,
        #cart-item-5 {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ShoppingCart;
