import { useState } from "react";
import { createContext } from "react";

export const Pagination = createContext();
const PaginationContext = ({ children }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  return (
    <Pagination.Provider value={[pagination, setPagination]}>
      {children}
    </Pagination.Provider>
  );
};

export default PaginationContext;
