/* eslint-disable @next/next/no-img-element */
"use client";
import { supabase } from "@/config/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export type Product = {
  id?: number | string;
  title: string;
  price: string | number;
  description: string;
  product_image?: File | null | undefined | string;
};

export default function ProductCreateForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    product_image: null as File | null,
  });

  // onChange Event
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // GIVE FORM DATA
    // const payload = new FormData();
    // payload.append("title", formData.title);
    // payload.append("price", formData.price);
    // payload.append("description", formData.description);
    // if (formData.product_image) {
    //   payload.append("product_image", formData.product_image);
    // }

    let public_imgUrl = formData.product_image || "";

    // image upload
    if (formData.product_image instanceof File && formData.product_image) {
      const fileExt = formData.product_image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("db5_product-images")
        .upload(fileName, formData.product_image);
      if (error instanceof Error) {
        return toast.error(error.message, { duration: 2000 });
      }
      public_imgUrl = supabase.storage
        .from("db5_product-images")
        .getPublicUrl(fileName).data.publicUrl;
    }
    // add product data
    const { data, error } = await supabase
      .from("db5_products")
      .insert({
        ...formData,
        product_image: public_imgUrl,
      })
      .select()
      .single();

    if (error instanceof Error) {
      return toast.error(error.message, { duration: 2000 });
    }
    toast.success(
      `Product created successfully! - ${data?.title ?? "unknow product"} `,
      {
        duration: 4000,
      }
    );
    router.replace("/products");
  };

  return (
    <div className="flex min-h-screen py-10 items-center justify-center bg-gray-50">
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
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-indigo-400/50"
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
              className="mt-1 p-3 text-indigo-400/50 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-indigo-400/50"
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
          {formData.product_image ? (
            <div className="mt-2 mx-auto">
              <img
                src={
                  formData.product_image
                    ? URL.createObjectURL(formData.product_image)
                    : ""
                }
                alt="Preview"
                className="h-40 w-60 mx-auto rounded-lg border border-gray-200 object-cover"
              />
              <div className="text-sm pt-3 text-center text-red-600 mx-auto">
                {formData.product_image.name}
              </div>
            </div>
          ) : (
            <>{null}</>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-2 px-4 text-white font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
      {/* <pre className="text-gray-900">{JSON.stringify(formData)}</pre> */}
    </div>
  );
}
