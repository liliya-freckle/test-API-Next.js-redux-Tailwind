"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/components/features/productsSlice";
import { setSearch } from "@/components/features/productsSlice";
import { setFilter } from "@/components/features/productsSlice";
import { RootState, AppDispatch } from "@/app/store";
import ProductCard from "@/components/ProductCard";
import { useDebounce } from "use-debounce";
import Link from "next/link";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, filter, search } = useSelector(
    (state: RootState) => state.products
  );

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;

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
      {/* Панель фильтров и поиска */}
      <div className="flex gap-4 items-center">
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
        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Поиск..."
          className="border p-2 flex-1 rounded"
        />
        <Link
          href="/create-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + Создать продукт
        </Link>
      </div>

      {/* Список продуктов */}
      {filteredItems.length === 0 ? (
        <p>Нет продуктов</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
