// components/FeaturedBanner.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FeaturedBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1.1],
      rotate: [0, 5, 0],
      transition: {
        delay: 0.3,
        duration: 1.2,
        ease: "easeOut",
      },
    },
    float: {
      y: [0, -15, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        },
      },
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: { duration: 1.5 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative w-full py-10 overflow-hidden bg-gradient-to-r from-gray-900 to-black">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden video-mask"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={backgroundVariants}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/55859-504238916.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <div className="container mx-auto px-14 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider leading-tight text-white mb-6"
              variants={textVariants}
              custom={0}
            >
              FEATURED{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                COLLECTION
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-gray-300 mb-8 text-sm max-w-md"
              variants={textVariants}
              custom={1}
            >
              Elevate your style with our exclusive limited edition releases.
              Designed for those who demand the extraordinary.
            </motion.p>

            <motion.button
              className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-10 uppercase font-bold tracking-wider transition-all text-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE COLLECTION
            </motion.button>
          </div>

          <div className="md:w-2/3 relative">
            <motion.div
              className="relative w-full h-[28rem] md:h-[36rem]"
              initial="hidden"
              animate={isVisible ? ["visible", "float"] : "hidden"}
              variants={imageVariants}
            >
              <Image
                src="/shoes/favpng_nike-zoom-kd-10-sports-shoes-nike-zoom-kd-line 2.png"
                alt="Featured Shoe Collection"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
