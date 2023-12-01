import { useContext } from "react";
import { Context } from "src/service/context";

const useData = () => {
  const [data, setData] = useContext(Context);
  return { data, setData };
};

export default useData;
