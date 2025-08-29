import { supabase } from "@/config/supabase";
import React from "react";

const ProductsPage = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error instanceof Error) {
    console.error(error?.message);
  }

  return (
    <React.Fragment>
      <main>
        <h3>Products </h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default ProductsPage;
