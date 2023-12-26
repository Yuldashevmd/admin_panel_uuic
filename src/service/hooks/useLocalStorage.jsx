export const useLocalStorage = () => {
  try {
    // get data by key
    const get = (key) => {
      return localStorage.getItem(key);
    };
    // set data
    const set = (key, value) => {
      return localStorage.setItem(key, value);
    };
    // remove all
    const removeAll = () => {
      return localStorage.clear();
    };
    // remove data by key
    const remove = (key) => {
      return localStorage.removeItem(key);
    };

    return {
      get,
      set,
      removeAll,
      remove,
    };
  } catch (err) {
    console.log(err, "err");
    throw Promise.reject(err);
  }
};
