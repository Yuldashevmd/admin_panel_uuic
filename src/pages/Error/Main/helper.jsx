/* eslint-disable react-refresh/only-export-components */
import { Button, Input, Modal } from "antd";

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
    label: <p style={{ color: "red" }}>Отказ</p>,
    value: "cancel",
  },
];

export const dictantContent = (
  <div className="dictant__content d-flex flex-column gap-1">
    <a href="#">Content1</a>
    <a href="#">Content2</a>
    <a href="#">Content3</a>
  </div>
);

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

// fetchAllUser
