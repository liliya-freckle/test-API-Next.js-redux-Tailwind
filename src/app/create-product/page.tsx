"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          ✕
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Создать продукт</h1>
      <ProductForm />
    </div>
  );
}
