"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/products/productsSlice";
import { RootState, AppDispatch } from "@/app/store";
import ProductCard from "@/features/products/components/ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="grid grid-cols-4 gap-4 my-6 mx-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
