"use client";

import { useAppUtilsContext } from "@/context/AppUtilsProvider";
import useCounterStore from "@/zustand/useCounterStroe";
import React from "react";

const TestClient = () => {
  const { session } = useAppUtilsContext();
  // setSession("this is setsession  from TestClient");
  const { count } = useCounterStore((state) => state);
  return (
    <React.Fragment>
      <main>{JSON.stringify(session, null, 2)}</main>
      <main>{JSON.stringify(count, null, 2)}</main>
    </React.Fragment>
  );
};

export default TestClient;
