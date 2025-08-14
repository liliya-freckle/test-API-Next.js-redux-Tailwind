"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { toggleLike } from "@/components/features/productsSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import { PackageX } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <Image
            src="https://via.placeholder.com/150"
            alt="loading"
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
        <button
          onClick={() => router.push("/")}
          className="mb-8 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Назад к списку
        </button>
        <PackageX size={48} className="mb-3 opacity-60" />
        <p className="text-lg font-medium">Нет продуктов</p>
        <p className="text-sm text-gray-400 mt-1">
          Попробуйте изменить фильтры или добавить новый товар
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-8 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Назад к списку
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={256}
          height={256}
          className="h-64 object-contain mx-auto md:mx-0"
        />

        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>

          <button
            onClick={() => dispatch(toggleLike(product.id))}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              product.liked
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:brightness-90 transition`}
          >
            <Heart className="w-5 h-5" />
            {product.liked ? "Убрать из избранного" : "Добавить в избранное"}
          </button>
        </div>
      </div>
    </div>
  );
}
