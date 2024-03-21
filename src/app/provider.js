"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = {
  init: true,
  user: null,
  token: null,
};

const AppContext = createContext(null);

const reducer = (current, update) => {
  const state = { ...current, ...update };
  localStorage.setItem("state", JSON.stringify(state));
  return { ...current, ...update };
};

export function Providers({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    const localData = localStorage.getItem("state");
    if (localData) {
      dispatch(JSON.parse(localData));
    }
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
