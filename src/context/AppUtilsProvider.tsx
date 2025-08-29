"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppUtilsContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const AppUtilsContext = createContext<AppUtilsContextType>({
  isLogin: false,
  setIsLogin: () => {},
  theme: "dark",
  setTheme: () => {},
});
const AppUtilsProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <AppUtilsContext.Provider value={{ isLogin, setIsLogin, theme, setTheme }}>
      {children}
    </AppUtilsContext.Provider>
  );
};

export const useAppUtilsContext = () => useContext(AppUtilsContext);
export default AppUtilsProvider;
