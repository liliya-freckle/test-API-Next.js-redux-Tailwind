"use client";

import ProductCard from "./ProductCard";
import { Product } from "./features/types";
import { PackageX } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
        <PackageX size={48} className="mb-3 opacity-60" />
        <p className="text-lg font-medium">Нет продуктов</p>
        <p className="text-sm text-gray-400 mt-1">
          Попробуйте изменить фильтры или добавить новый товар
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
