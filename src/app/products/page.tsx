// import { supabase } from "@/config/supabase";
import ProductList from "@/components/share/ProductLists";
import { supabase } from "@/config/supabase";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import Link from "next/link";
import React from "react";

export type Product = {
  id?: string | number;
  title: string;
  description?: string;
  product_image?: string | File;
  created_at?: string | Timestamp;
  price: number | string;
};

const ProductsPage = async () => {
  const { data: products } = await supabase
    .from("db5_products")
    .select("*")
    .order("id", { ascending: false });
  return (
    <React.Fragment>
      <main>
        <div className="flex py-3 justify-between px-10 bg-slate-50/10">
          <h3>Products </h3>
          <Link href="/products/create">Create Product</Link>
        </div>
        <section>
          <ProductList products={products} />
        </section>
      </main>
    </React.Fragment>
  );
};

export default ProductsPage;
