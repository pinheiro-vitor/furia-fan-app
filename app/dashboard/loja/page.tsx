import React from "react";
import { ProductCard } from "@/components/store/ProductCard";

const products = [
  {
    id: 1,
    name: "CAMISETA FURIA OFICIAL '24 PRETA",
    image: "https://furiagg.fbitsstatic.net/img/p/camiseta-furia-oficial-24-preta-150177/336897-7.jpg?w=1280&h=1280&v=202502121640",
    price: "R$ 259,00",
  },
  {
    id: 2,
    name: "CAMISETA FURIA | ADIDAS PRETA",
    image: "https://furiagg.fbitsstatic.net/img/p/camiseta-furia-adidas-preta-150263/337479-1.jpg?w=1280&h=1280&v=202503281012",
    price: "R$ 299,00",
  },
  {
    id: 3,
    name: "CAMISETA OFICIAL FURIA | ADIDAS PRETA",
    image: "https://furiagg.fbitsstatic.net/img/p/camiseta-oficial-furia-adidas-preta-150265/337491-1.jpg?w=1280&h=1280&v=202503281009",
    price: "R$ 359,00",
  },
  {
    id: 4,
    name: "CAMISETA FURIA CLASSIC PRETA",
    image: "https://furiagg.fbitsstatic.net/img/p/camiseta-furia-classic-preta-150183/336942-1.jpg?w=1280&h=1280&v=no-value",
    price: "R$ 139,00",
  },
];

export default function LojaPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Loja FURIA</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
