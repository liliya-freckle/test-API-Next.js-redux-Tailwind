import { Product } from "./types";

export async function fetchProductsAPI(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data.map((p: Product) => ({ ...p, liked: false }));
}
