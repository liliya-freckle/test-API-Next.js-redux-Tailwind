"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setSearch,
} from "@/components/features/productsSlice";
import { RootState, AppDispatch } from "@/app/store";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import Image from "next/image";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filter, search } = useSelector(
    (state: RootState) => state.products
  );

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
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

  const filteredItems = items.filter((product) => {
    const matchesFilter =
      filter === "all" || (filter === "favorites" && product.liked);
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 my-6 mx-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(setFilter("all"))}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Все
          </button>
          <button
            onClick={() => dispatch(setFilter("favorites"))}
            className={`px-4 py-2 rounded ${
              filter === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Избранные
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Поиск..."
          className="border p-2 rounded flex-1"
        />

        <Link
          href="/create-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-center"
        >
          Создать продукт
        </Link>
      </div>

      <ProductList products={filteredItems} />
    </div>
  );
}
