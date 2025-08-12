"use client";

import { Product } from "@/components/features/types";
import { useDispatch } from "react-redux";
import { toggleLike, deleteProduct } from "@/components/features/productsSlice";
import { AppDispatch } from "@/app/store";
import { useRouter } from "next/navigation";
import { Heart, Trash } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="border p-4 rounded-md shadow-md flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      />
      <h3 className="font-semibold mt-2 line-clamp-1">{product.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <div className="flex justify-between mt-2">
        <span className="font-bold">${product.price}</span>
        <div className="flex gap-2">
          <Heart
            className={`cursor-pointer ${product.liked ? "text-red-500" : ""}`}
            onClick={() => dispatch(toggleLike(product.id))}
          />
          <Trash
            className="cursor-pointer text-gray-500"
            onClick={() => dispatch(deleteProduct(product.id))}
          />
        </div>
      </div>
    </div>
  );
}
