"use client";

import { Product } from "@/components/features/types";
import { useDispatch } from "react-redux";
import { toggleLike, deleteProduct } from "@/components/features/productsSlice";
import { AppDispatch } from "@/app/store";
import { useRouter } from "next/navigation";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div
      className="border p-4 rounded-md shadow-md flex flex-col cursor-pointer"
      onClick={() => router.push(`/${product.id}`)}
    >
      <div className="h-60 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          height={110}
          width={140}
          className="object-contain"
        />
      </div>

      <div className="mt-2 flex-1">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>

      <div className="flex justify-between mt-2">
        <span className="font-bold">${product.price}</span>
        <div className="flex gap-2">
          <Heart
            className={`cursor-pointer ${product.liked ? "text-red-500" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleLike(product.id));
            }}
          />
          <Trash
            className="cursor-pointer text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteProduct(product.id));
            }}
          />
        </div>
      </div>
    </div>
  );
}
