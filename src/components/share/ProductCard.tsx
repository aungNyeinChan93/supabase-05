/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/products/page";
import React from "react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <React.Fragment>
      <div className="relative flex w-80 flex-col rounded-xl py-5 my-4 bg-white bg-clip-border text-gray-700 shadow-md mt-8 mx-auto">
        <div className="relative mx-4 -mt-6 h-38 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
          <img
            src={product.product_image}
            alt=""
            className="w-full object-center "
          />
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {product?.title ?? "Tailwind card"}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {product?.description}
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Read More
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
