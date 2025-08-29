"use client";
import React, { useState } from "react";

export default function ProductCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    product_image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "product_image" && files) {
      setFormData({ ...formData, product_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);

    // 📌 You can now send this data to your API (FormData for file upload)
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    if (formData.product_image) {
      payload.append("product_image", formData.product_image);
    }

    // Example: fetch("/api/products", { method: "POST", body: payload })
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="99.99"
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
              required
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="product_image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-2 px-4 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
