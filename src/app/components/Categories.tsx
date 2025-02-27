// components/Categories.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

const categoryData: Category[] = [
  {
    id: 1,
    name: "Sneakers",
    image: "/shoes/erik-mclean-e_qqXYMDyfM-unsplash.jpg",
    count: 124,
  },
  {
    id: 2,
    name: "Formal",
    image: "/shoes/verity-sanders-q4ExhrHaSLY-unsplash.jpg",
    count: 86,
  },
  {
    id: 3,
    name: "Sports",
    image: "/shoes/jakob-owens-j5kEQ1JLqZk-unsplash (1).jpg",
    count: 92,
  },
  {
    id: 4,
    name: "Casual",
    image: "/shoes/rendy-novantino-_XhfM1UqZko-unsplash.jpg",
    count: 108,
  },
];

const Categories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-16 px-20 md:px-12 bg-gray-950">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold tracking-wider text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            SHOP BY
          </span>{" "}
          CATEGORY
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categoryData.map((category) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              className="block"
            >
              <motion.div
                className="relative overflow-hidden rounded-md bg-gray-900 shadow-lg"
                variants={itemVariants}
                whileHover="hover"
              >
                {/* Dark overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

                {/* Image container */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 bg-black/50 backdrop-blur-sm py-1 px-3 rounded-sm">
                      {category.count} Products
                    </span>
                    <motion.span
                      className="ml-2 text-blue-500"
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
