import { useState } from "react";
import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Pagination = createContext();
const PaginationContext = ({ children }) => {
  const { get } = useLocalStorage();
  const [pagination, setPagination] = useState({
    current: get("currentPage") || 1,
    pageSize: get("pageSize") || 10,
    total: null,
  });

  return (
    <Pagination.Provider value={[pagination, setPagination]}>
      {children}
    </Pagination.Provider>
  );
};

export default PaginationContext;
