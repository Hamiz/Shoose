// components/HeroCarousel.tsx
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "NIKE ADAPT BB",
    price: 980,
    description:
      "The designer's unmistakably future-facing pieces focus on complex upper builds with unorthodox lacing systems for their distinctive style.",
    image:
      "/shoes/70102_06_nikes-second-gen-self-lacing-shoes-drop-february-16-400_full 1.png",
  },
  {
    id: 2,
    name: "ADIDAS ULTRA BOOST",
    price: 850,
    description:
      "Revolutionary comfort and energy return for runners seeking the ultimate performance with stylish urban appeal.",
    image:
      "/shoes/EQT_Support_Shoes___Clothing___Newest_Release___adidas_US-removebg-preview 1.png",
  },
  {
    id: 3,
    name: "PUMA RS-X TECH",
    price: 790,
    description:
      "Bold retro-inspired silhouette with enhanced cushioning and futuristic details for maximum impact.",
    image: "/shoes/Exbfpl2WgAAQkl8_resized-removebg-preview 1.png",
  },
  {
    id: 4,
    name: "NEW BALANCE 997S",
    price: 720,
    description:
      "Modern interpretation of a classic with premium materials and innovative ENCAP midsole technology.",
    image: "/shoes/nike-adapt-bb-baratas-400x400x80xX-removebg-preview 1.png",
  },
  {
    id: 5,
    name: "JORDAN PROTO MAX 720",
    price: 1050,
    description:
      "Cutting-edge Air cushioning with adjustable heel straps, delivering next-level comfort with unmistakable style.",
    image: "/shoes/Aire Jordan Nike.png",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/100">
        <Image
          src="/wallpaperflare.com_wallpaper.jpg"
          alt="Starry Background"
          fill
          priority
          className="object-cover mask-image"
        />
      </div>

      {/* Carousel Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white text-6xl p-4 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white  text-6xl opacity-70 hover:opacity-100 transition-opacity pointer-events-auto"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>

      {/* Content Container */}
      <div className="relative h-full w-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-500 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Centered Title */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center z-20 px-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider leading-tight animation-fade-in">
                {product.name.split(" ").map((word, wordIndex, wordArray) => {
                  // Style even and odd words differently
                  if (wordIndex % 2 === 0) {
                    // First, third, etc. words - solid white
                    return (
                      <span
                        key={wordIndex}
                        className="font-extrabold text-white"
                      >
                        {word}
                        {wordIndex < wordArray.length - 1 ? " " : ""}
                      </span>
                    );
                  } else {
                    // Second, fourth, etc. words - outline effect with white glow
                    return (
                      <span
                        key={wordIndex}
                        className="font-extrabold text-transparent bg-clip-text"
                        style={{
                          WebkitTextStroke: "2px white",
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {word}
                        {wordIndex < wordArray.length - 1 ? " " : ""}
                      </span>
                    );
                  }
                })}
              </h1>
            </div>

            {/* Centered Shoe Image */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="relative w-[35rem] h-[35rem] md:w-[50rem] md:h-[50rem] lg:w-[60rem] lg:h-[60rem] flex justify-center items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Bottom Left Info - Price & Description */}
            <div className="absolute bottom-16 left-8 md:left-16 z-30 max-w-md animation-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-white">
                ${product.price}
              </div>
              <p className="text-gray-200 text-sm mt-2">
                {product.description}
              </p>
            </div>

            {/* Bottom Right - Buy Now Button */}
            <div className="absolute bottom-16 right-8 md:right-16 z-30 animation-fade-in">
              <Link href="/collection" passHref>
                <button className="bg-transparent hover:bg-white/20 text-white border border-white py-3 px-10 uppercase font-bold tracking-wider transition-all text-lg">
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
