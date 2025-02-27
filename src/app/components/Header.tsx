import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import CartIcon from "./CartIcon";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hidden: {
      opacity: 0,
      y: -25,
      transition: { duration: 0.3 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(255,255,255,0.8)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 w-full z-50 px-10 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div variants={logoVariants} initial="normal" whileHover="hover">
          <Link
            href="/"
            className="text-white font-extrabold text-2xl tracking-widest"
          >
            Shoose
          </Link>
        </motion.div>

        <nav className="hidden md:flex font-light text-xs space-x-8">
          {[
            { name: "HOME", path: "/" },
            { name: "COLLECTION", path: "/collection" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={navItemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Link
                href={item.path}
                className="text-white uppercase tracking-wider hover:text-gray-300 transition"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
            <Link href="/cart" className="text-white text-xl">
              <CartIcon />
            </Link>
          </motion.div>
          <motion.button
            className="text-white text-xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <FaBars />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden bg-black/90 backdrop-blur-md overflow-hidden"
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
              <motion.div
                key={index}
                variants={mobileMenuItemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="text-white uppercase tracking-wider"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
