// import { supabase } from "@/config/supabase";
import { supabase } from "@/config/supabase";
import Link from "next/link";
import React from "react";

const ProductsPage = async () => {
  const { data: products } = await supabase
    .from("db5_products")
    .select("*")
    .order("id", { ascending: false });
  return (
    <React.Fragment>
      <main>
        <h3>Products </h3>
        <Link href="/products/create">Create Product</Link>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default ProductsPage;
