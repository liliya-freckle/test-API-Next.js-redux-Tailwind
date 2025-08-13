import { Product } from "./types";

export async function fetchProductsAPI(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Ошибка загрузки: ${res.status}`);
    }
    const data = await res.json();
    return data.map((p: Product) => ({ ...p, liked: false }));
  } catch (error) {
    console.error("Ошибка при запросе продуктов:", error);
    return [];
  }
}
