import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col bg-transparent p-0 m-0 group border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200">
      <div className="relative w-full aspect-square flex items-start justify-center overflow-hidden bg-white pb-2">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain w-full h-full"
        />
        <button
          className="absolute top-3 right-3 bg-white/80 rounded-full p-1 opacity-80 group-hover:opacity-100 transition"
          aria-label={liked ? "Descurtir" : "Curtir"}
          onClick={() => setLiked((prev) => !prev)}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-150 ${liked ? "text-[#00a859]" : "text-gray-400 group-hover:text-[#00a859]"}`}
            fill={liked ? "#00a859" : "none"}
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="px-4 pb-3 pt-1 w-full">
        <h3 className="font-normal text-xs text-left leading-tight mb-1 uppercase tracking-tight break-words">{product.name}</h3>
        <p className="text-sm text-gray-700 font-normal text-left">{product.price}</p>
      </div>
    </div>
  );
};
