"use client";

import { useAppUtilsContext } from "@/context/AppUtilsProvider";
import useCounterStore from "@/zustand/useCounterStroe";
import React from "react";
import toast from "react-hot-toast";

const TestClient = () => {
  const { session } = useAppUtilsContext();
  // setSession("this is setsession  from TestClient");
  const { count } = useCounterStore((state) => state);
  return (
    <React.Fragment>
      <main>{JSON.stringify(session, null, 2)}</main>
      <main>{JSON.stringify(count, null, 2)}</main>
      <section>
        <button
          onClick={() =>
            toast.success("test success", {
              className: "text-xl !text-green-400 !bg-green-200/50 p-3",
              duration: 3000,
            })
          }
        >
          Alert
        </button>
      </section>
    </React.Fragment>
  );
};

export default TestClient;
