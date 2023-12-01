import { useState } from "react";
import { createContext } from "react";
import LoadingContext from "./loadingContext";

export const Context = createContext();
const MainContext = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <Context.Provider value={[data, setData]}>
      <LoadingContext>{children}</LoadingContext>
    </Context.Provider>
  );
};

export default MainContext;
