/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Modal } from "antd";
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

// Modal download
/**
 *
 * @param {is_open} boolean parametr for opening modal
 * @param {close_modal} boolean parametr for closing modal
 * @returns modal component
 */
export const DownloadModal = ({ is_open, close_modal }) => {
  return (
    <Modal
      width={"580px"}
      title={"Загрузите файлы в формате JPG или PDF"}
      open={is_open}
      footer={<Button type="primary">Загрузить диктант</Button>}
      onCancel={() => close_modal(false)}
    >
      <Input type="file" style={{ height: "50px" }} />
    </Modal>
  );
};

/**
 * @param {setLoading} boolean param for set loading status when fetching data
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
 * @param {setDisabled} boolean param for set disable selects status when sending data
 * @param {value} string param value sends value of select status
 * @param {id} string param id is unique id that belongs to user
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
 * @param {value} string or number and it sorting by name or phone data
 * @param {status} string it also takes value of status and getting data from api
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
