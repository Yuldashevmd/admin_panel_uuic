/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

export const Context = createContext();
const MainContext = ({ children }) => {
  const [token, setToken] = useState();
  return (
    <Context.Provider value={[token, setToken]}>{children}</Context.Provider>
  );
};

export default MainContext;
