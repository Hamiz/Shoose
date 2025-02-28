// Modified CartIcon.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    isNew?: boolean;
    isFeatured?: boolean;
  };
  quantity: number;
}

interface CartIconProps {
  withoutLink?: boolean;
}

const CartIcon = ({ withoutLink = false }: CartIconProps) => {
  const [itemCount, setItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update cart count whenever localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("shooseCart");
      if (storedCart) {
        try {
          const cart: CartItem[] = JSON.parse(storedCart);
          const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);

          // Animate if count increased
          if (newCount > itemCount) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
          }

          setItemCount(newCount);
        } catch (error) {
          console.error("Error parsing cart data:", error);
        }
      } else {
        setItemCount(0);
      }
    };

    // Initial count
    updateCartCount();

    // Listen for storage events (when cart is updated)
    window.addEventListener("storage", updateCartCount);

    // Custom event for when we update the cart within the same window
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [itemCount]);

  const cartContent = (
    <div className="p-2 hover:bg-gray-800 rounded-full transition-colors">
      <FaShoppingCart
        size={20}
        className={isAnimating ? "animate-bounce" : ""}
      />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );

  // If withoutLink is true, don't wrap in Link component
  if (withoutLink) {
    return <div className="relative">{cartContent}</div>;
  }

  // Otherwise, wrap in Link as before
  return (
    <Link href="/cart" className="relative">
      {cartContent}
    </Link>
  );
};

export default CartIcon;
