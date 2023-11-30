/* eslint-disable react-refresh/only-export-components */

import { api } from "src/utils/api";

const styleForStatus = {
  color: "#64748B",
};

export const status = [
  {
    label: <p style={styleForStatus}>Позвонить</p>,
    value: "will_call",
  },
  {
    label: <p style={styleForStatus}>Прошёл 1-этап</p>,
    value: "passed_first",
  },
  {
    label: <p style={styleForStatus}>Не прошёл 1-этап</p>,
    value: "failed_first",
  },
  {
    label: <p style={styleForStatus}>Придёт</p>,
    value: "will_come",
  },
  {
    label: <p style={styleForStatus}>Пришел</p>,
    value: "came",
  },
  {
    label: <p style={styleForStatus}>Не выходит на связь</p>,
    value: "failed_call",
  },
  {
    label: <p style={{ color: "red" }}>Отказ</p>,
    value: "cancel",
  },
];

/**
 * @param {boolean} setLoading for set loading status when fetching data
 */
// fetchAllUser
export const fetchAllUsers = async (setLoading) => {
  try {
    setLoading(true);
    const res = await api.get("/users/all");

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
    const res = await api.patch(`/users/update/${id}`, { status: value });

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
 */
// filterData
export const filterData = async (value, status) => {
  try {
    let param;
    if (!isNaN(value)) {
      param = { name: "null", phone: value, status };
    } else {
      param = { name: value, phone: "null", status };
    }
    const res = await api.get("/users/findByFilter/users", { params: param });

    return res.data;
  } catch (err) {
    console.log(err, "err");
  }
};
