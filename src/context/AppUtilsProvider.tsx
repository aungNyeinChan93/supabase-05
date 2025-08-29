/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Session } from "@supabase/supabase-js";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppUtilsContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setSession: React.Dispatch<React.SetStateAction<any | Session | null>>;
  session: any;
}

export const AppUtilsContext = createContext<AppUtilsContextType>({
  isLogin: false,
  setIsLogin: () => {},
  theme: "dark",
  setTheme: () => {},
  setSession: () => {},
  session: {},
});
const AppUtilsProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const [session, setSession] = useState();

  return (
    <AppUtilsContext.Provider
      value={{ isLogin, setIsLogin, theme, setTheme, setSession, session }}
    >
      {children}
    </AppUtilsContext.Provider>
  );
};

export const useAppUtilsContext = () => useContext(AppUtilsContext);
export default AppUtilsProvider;
