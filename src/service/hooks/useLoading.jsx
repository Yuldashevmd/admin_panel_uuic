import { useContext } from "react";
import { Loading } from "../context/loadingContext";

const useLoading = () => {
  const [loading, setLoading] = useContext(Loading);
  return { loading, setLoading };
};

export default useLoading;
