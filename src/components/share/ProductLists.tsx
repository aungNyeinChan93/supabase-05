import { Product } from "@/app/products/page";
import React from "react";
import ProductCard from "./ProductCard";

interface Props {
  products?: Product[] | null | undefined;
}

const ProductList = ({ products }: Props) => {
  return (
    <React.Fragment>
      <section className="px-10 h-auto bg-green-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-4">
          {products &&
            Array.isArray(products) &&
            products?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductList;
