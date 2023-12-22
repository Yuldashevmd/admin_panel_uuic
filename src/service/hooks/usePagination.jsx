import { useContext } from "react";
import { Pagination } from "../context/pagination";

const usePagination = () => {
  const [pagination, setPagination] = useContext(Pagination);
  return { pagination, setPagination };
};

export default usePagination;
