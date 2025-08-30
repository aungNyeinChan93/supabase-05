import React, { Fragment } from "react";

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const TestProducts = async ({ searchParams }: Props) => {
  const { limit } = await searchParams;

  const products = await fetch(
    `http://localhost:3000/api/v1/products?limit=${Number(limit)}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 4000 * 60,
      },
    }
  ).then((res) => res.json());
  return (
    <Fragment>
      <main>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </main>
    </Fragment>
  );
};

export default TestProducts;
