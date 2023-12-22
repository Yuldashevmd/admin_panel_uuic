import { useState } from "react";
import { createContext } from "react";
import LoadingContext from "./loadingContext";
import PaginationContext from "./pagination";

export const Context = createContext();
const MainContext = ({ children }) => {
  const [data, setData] = useState([]);
  return (
    <Context.Provider value={[data, setData]}>
      <PaginationContext>
        <LoadingContext>{children}</LoadingContext>
      </PaginationContext>
    </Context.Provider>
  );
};

export default MainContext;
