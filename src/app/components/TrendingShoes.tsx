// components/TrendingShoes.tsx
import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";

interface TrendingShoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  isNew: boolean;
}

const trendingShoes: TrendingShoe[] = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 189,
    rating: 4.8,
    image: "/shoes/B7BCF615-B50A-4693-9667-DCBA223712ED_2048x.webp",
    isNew: true,
  },
  {
    id: 2,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 210,
    rating: 4.7,
    image:
      "/shoes/ie1768_1_footwear_photography_sidelateralcenterview_white.webp",
    isNew: false,
  },
  {
    id: 3,
    name: "RS-X Elevated",
    brand: "Puma",
    price: 165,
    rating: 4.5,
    image: "/shoes/main-square_b9ea884c-955b-46de-9e11-a884709856d4_540x.webp",
    isNew: true,
  },
  {
    id: 4,
    name: "Classic Leather",
    brand: "Reebok",
    price: 120,
    rating: 4.6,
    image: "/shoes/100005921_SLC_eCom-tif.webp",
    isNew: false,
  },
  {
    id: 5,
    name: "Jordan 1 Retro",
    brand: "Nike",
    price: 250,
    rating: 4.9,
    image:
      "/shoes/1cc92778-a59c-4463-a355-3299f0d44aa3.f4b99cc7b6ffc0c50a405da5cb24e7c2.webp",
    isNew: true,
  },
  {
    id: 6,
    name: "574 Core",
    brand: "New Balance",
    price: 155,
    rating: 4.5,
    image: "/shoes/ml574evg_main_1.jpg",
    isNew: false,
  },
];

const TrendingShoes = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-900/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-20 relative z-10">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold tracking-wider">
            TRENDING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              NOW
            </span>
          </h2>

          <button className="bg-transparent hover:bg-white/10 text-white border border-white py-2 px-6 uppercase font-bold tracking-wider transition-all text-sm">
            VIEW ALL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingShoes.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 border border-gray-800"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-900/10 to-purple-900/10 flex items-center justify-center p-6">
                {shoe.isNew && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full z-10">
                    New
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite(shoe.id)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
                >
                  <FaHeart
                    className={`${
                      favorites.includes(shoe.id)
                        ? "text-pink-500"
                        : "text-white"
                    }`}
                  />
                </button>

                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-gray-400 text-sm">{shoe.brand}</p>
                    <h3 className="text-xl font-bold">{shoe.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span>{shoe.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-2xl font-bold">${shoe.price}</p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full transition-all">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingShoes;
