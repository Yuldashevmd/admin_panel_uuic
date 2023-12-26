import { api } from "src/utils/api";

export const status = [
  {
    label: "Позвонить",
    value: "will_call",
  },
  {
    label: "Прошёл 1-этап",
    value: "passed_first",
  },
  {
    label: "Не прошёл 1-этап",
    value: "failed_first",
  },
  {
    label: "Придёт",
    value: "will_come",
  },
  {
    label: "Пришел",
    value: "came",
  },
  {
    label: "Не выходит на связь",
    value: "failed_call",
  },
  {
    label: "Отказ",
    value: "cancel",
  },
];

/**
 * @param {boolean} setLoading for set loading status when fetching data
 * @param {Object} pagination for getting data with pagination
 */
// fetchAllUser
export const fetchAllUsers = async (setLoading, page, pageSize) => {
  try {
    setLoading(true);
    const res = await api.get("/users/all", {
      params: { pageNumber: page, pageSize: pageSize },
    });

    setLoading(false);
    return res.data;
  } catch (err) {
    console.log(err, "err");
    setLoading(false);
  }
};

/**
 * @param {boolean}  setDisabled param for set disable selects status when sending data
 * @param {string}  value param value sends value of select status
 * @param {string}  id param id is unique id that belongs to user
 */
// changeStatus
export const changeStatus = async (value, id, setDisabled) => {
  try {
    setDisabled(true);
    const res = await api.patch(`/admin/updateStatus/${id}`, { status: value });

    return { data: res.data, status: 200 };
  } catch (err) {
    console.log(err, "err");
  } finally {
    setDisabled(false);
  }
};

/**
 * @param {string}  value or number and it sorting by name or phone data
 * @param {string}  status it also takes value of status and getting data from api
 * @param {Object}  pagination when user sends empty input value that returns with remembered pagination
 */
// filterData
export const filterData = async (value, status, pagination, pageSize) => {
  if (pagination) {
    try {
      let param;
      if (!isNaN(value)) {
        param = {
          name: "null",
          phone: value,
          status,
          pageNumber: pagination.current,
          pageSize: pagination.pageSize,
        };
      } else {
        param = {
          name: value,
          phone: "null",
          status,
          pageNumber: pagination.current,
          pageSize: pagination.pageSize,
        };
      }
      const res = await api.get("/users/findByFilter/users", { params: param });

      return res.data;
    } catch (err) {
      console.log(err, "err");
    }
  } else {
    try {
      let param;
      if (!isNaN(value)) {
        param = {
          name: "null",
          phone: value,
          status,
          pageNumber: 1,
          pageSize,
        };
      } else {
        param = {
          name: value,
          phone: "null",
          status,
          pageNumber: 1,
          pageSize,
        };
      }
      const res = await api.get("/users/findByFilter/users", { params: param });

      return res.data;
    } catch (err) {
      console.log(err, "err");
    }
  }
};

// API's for Comment

// delete comment
export const deleteComment = async (id) => {
  try {
    const res = await api.patch(`/admin/updateClearComment/${id}`);

    return { res, status: 200 };
  } catch (err) {
    console.log(err, "err");
    throw Promise.reject(err);
  }
};
