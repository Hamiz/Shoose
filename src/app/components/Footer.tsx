// components/Footer.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaArrowUp,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Show footer elements when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("animated-footer");
    if (footerElement) observer.observe(footerElement);

    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="animated-footer"
      className="relative px-20 bg-black text-white overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8 z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wider mb-6 text-gradient">
              SHOOSE
            </h3>
            <p className="text-gray-300 text-sm">
              Step into the future with our cutting-edge footwear designed for
              innovation and style. Experience comfort and technology like never
              before.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="social-icon-link">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon-link">
                <FaYoutube />
              </a>
              <a href="#" className="social-icon-link">
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold tracking-wider mb-6 text-gradient">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "New Arrivals",
                "Best Sellers",
                "Men's Collection",
                "Women's Collection",
                "Kids Collection",
                "Sale",
                "Our Technology",
              ].map((link, i) => (
                <li key={i} className="link-hover">
                  <Link href="#" className="inline-block py-1 footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold tracking-wider mb-6 text-gradient">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Contact Us",
                "FAQs",
                "Shipping & Returns",
                "Size Guide",
                "Track Order",
                "My Account",
                "Privacy Policy",
              ].map((link, i) => (
                <li key={i} className="link-hover">
                  <Link href="#" className="inline-block py-1 footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold tracking-wider mb-6 text-gradient">
              NEWSLETTER
            </h4>
            <p className="text-gray-300 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full text-sm bg-transparent border-b-2 border-purple-500 py-2 pl-2 pr-10 text-white focus:outline-none focus:border-white transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-purple-500 hover:text-white transition-colors"
                >
                  <HiMail />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="accent-purple-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div>
            </form>
            <div className="mt-6">
              <h5 className="text-lg font-bold mb-3">DOWNLOAD OUR APP</h5>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  className="block w-32 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/pngegg.png"
                    alt="App Store"
                    width={90}
                    height={25}
                  />
                </a>
                <a
                  href="#"
                  className="block w-32 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/pngegg (2).png"
                    alt="Play Store"
                    width={90}
                    height={25}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center my-8">
          <button
            onClick={scrollToTop}
            className="back-to-top-button"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* Payment methods */}
        <div
          className={`flex justify-center space-x-4 my-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {["visa", "mastercard", "paypal", "apple-pay", "google-pay"].map(
            (payment) => (
              <div
                key={payment}
                className="w-12 h-8 backdrop-blur-sm rounded flex items-center justify-center"
              >
                <Image
                  src={`/payment-icons/${payment}.png`}
                  alt={payment}
                  width={24}
                  height={16}
                />
              </div>
            )
          )}
        </div>

        {/* Footer bottom */}
        <div
          className={`pt-8 mt-8 border-t border-white/10 text-center text-sm text-gray-400 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xs">
            &copy; {new Date().getFullYear()} SHOOSE. All rights reserved.
          </p>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-2">
            <Link
              href="#"
              className="hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-white text-xs transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="#"
              className="hover:text-white text-xs transition-colors"
            >
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
