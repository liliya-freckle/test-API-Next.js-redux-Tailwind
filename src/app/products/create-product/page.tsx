"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addProduct } from "@/components/features/productsSlice";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

export default function CreateProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price.trim() || !description.trim()) {
      alert("Заполните все обязательные поля");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        title,
        price: parseFloat(price),
        description,
        image: image || "https://via.placeholder.com/150",
        liked: false,
      })
    );

    router.push("/products");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Создать продукт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />
        <Input
          type="url"
          placeholder="URL картинки"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full">
          Создать
        </Button>
      </form>
    </div>
  );
}
