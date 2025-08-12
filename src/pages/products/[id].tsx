"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!product) return <p>Продукт не найден</p>;

  return (
    <div>
      <button onClick={() => router.push("/products")} className="mb-4">
        Назад
      </button>
      <img
        src={product.image}
        alt={product.title}
        className="h-60 object-contain"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="font-bold">${product.price}</p>
    </div>
  );
}
