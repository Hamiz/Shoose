import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaLock,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Form data interface
interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: "card" | "cod" | "bankAccount";
  // Card details (only required for card payment)
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  // Bank account details (only required for bank account payment)
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

const CheckoutPage = () => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
  });

  // Animation states
  const [animateOrder, setAnimateOrder] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("shooseCart");

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems([]);
      }
    }

    // Start animations
    setTimeout(() => setAnimateOrder(true), 300);
    setTimeout(() => setAnimateForm(true), 600);
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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Format credit card number
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    });
  };

  // Handle payment method change
  const handlePaymentMethodChange = (
    method: "card" | "cod" | "bankAccount"
  ) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      // Clear cart
      localStorage.removeItem("shooseCart");
    }, 2000);
  };

  // Redirect to home after order complete
  useEffect(() => {
    if (orderComplete) {
      // In a real app, you'd redirect to an order confirmation page
      // For this example, we'll just display a success message
    }
  }, [orderComplete]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Checkout | Shoose</title>
        <meta name="description" content="Complete your order" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 md:px-20 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="pt-20 text-4xl md:text-6xl font-bold tracking-wider mb-4">
            CHECKOUT
          </h1>
          <Link
            href="/cart"
            className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <FaArrowLeft size={12} />
            <span>Return to cart</span>
          </Link>
        </div>

        {orderComplete ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
              Thank you for your purchase. We&apos;ve sent a confirmation email
              to {formData.email}
              with your order details.
              {formData.paymentMethod === "cod" && (
                <span className="block mt-2 font-medium text-purple-400">
                  Please have the payment ready when your order is delivered.
                </span>
              )}
            </p>
            <Link
              href="/collection"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="flex-1">
              <div
                className={`transition-all duration-1000 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-900 rounded-lg p-6"
                >
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                      CONTACT INFORMATION
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">SHIPPING ADDRESS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="apartment"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm text-gray-400 mb-1"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">PAYMENT METHOD</h2>

                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange("card")}
                        className={`flex flex-col items-center justify-center p-4 rounded border ${
                          formData.paymentMethod === "card"
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-gray-700 bg-gray-800 hover:bg-gray-700/50"
                        } transition-colors`}
                      >
                        <FaCreditCard className="text-2xl mb-2" />
                        <span className="text-sm">Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange("cod")}
                        className={`flex flex-col items-center justify-center p-4 rounded border ${
                          formData.paymentMethod === "cod"
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-gray-700 bg-gray-800 hover:bg-gray-700/50"
                        } transition-colors`}
                      >
                        <FaMoneyBillWave className="text-2xl mb-2" />
                        <span className="text-sm">Cash on Delivery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange("bankAccount")}
                        className={`flex flex-col items-center justify-center p-4 rounded border ${
                          formData.paymentMethod === "bankAccount"
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-gray-700 bg-gray-800 hover:bg-gray-700/50"
                        } transition-colors`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 mb-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        <span className="text-sm">Bank Account</span>
                      </button>
                    </div>

                    {/* Credit Card Fields */}
                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="cardName"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "card"}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required={formData.paymentMethod === "card"}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expDate"
                              className="block text-sm text-gray-400 mb-1"
                            >
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              id="expDate"
                              name="expDate"
                              value={formData.expDate}
                              onChange={handleInputChange}
                              required={formData.paymentMethod === "card"}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm text-gray-400 mb-1"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required={formData.paymentMethod === "card"}
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bank Account Fields */}
                    {formData.paymentMethod === "bankAccount" && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="accountName"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            id="accountName"
                            name="accountName"
                            value={formData.accountName}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "bankAccount"}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bankName"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Bank Name
                          </label>
                          <input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "bankAccount"}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="accountNumber"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Account Number
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "bankAccount"}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="routingNumber"
                            className="block text-sm text-gray-400 mb-1"
                          >
                            Routing Number
                          </label>
                          <input
                            type="text"
                            id="routingNumber"
                            name="routingNumber"
                            value={formData.routingNumber}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === "bankAccount"}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Cash on Delivery Message */}
                    {formData.paymentMethod === "cod" && (
                      <div className="bg-gray-800 p-4 rounded border border-gray-700 text-gray-300">
                        <div className="flex items-start gap-3">
                          <FaMoneyBillWave className="text-purple-500 mt-1" />
                          <div>
                            <p className="font-bold mb-2">Cash on Delivery</p>
                            <p className="text-sm">
                              You&apos;ll pay for your order when it arrives at
                              your delivery address. Please ensure someone is
                              available to make the payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 bg-purple-600 hover:bg-purple-700 rounded font-bold transition-colors flex items-center justify-center gap-2 ${
                      loading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <FaLock size={12} />
                        PLACE ORDER
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div
                className={`bg-gray-900 rounded-lg p-6 transition-all duration-1000 ${
                  animateOrder
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>

                <div className="max-h-80 overflow-y-auto mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 mb-4 pb-4 border-b border-gray-800"
                    >
                      <div className="relative h-16 w-16 bg-gradient-to-b from-purple-900/20 to-black rounded overflow-hidden flex-shrink-0">
                        <div className="absolute top-0 right-0 bg-purple-600 text-xs w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                          {item.quantity}
                        </div>
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {item.product.category}
                        </p>
                        <p className="text-sm mt-1">
                          ${item.product.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

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

                <div className="mt-6 text-xs text-gray-400 text-center">
                  <p className="flex items-center justify-center gap-1">
                    <FaLock size={10} />
                    <span>Secure checkout</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
