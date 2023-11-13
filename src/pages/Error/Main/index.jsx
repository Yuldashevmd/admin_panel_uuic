import { Popover, Table } from "antd";
import "./style.scss";
import { Avatar, Button, Input, Select } from "antd";
import moment from "moment";
import { Check, Download, Eye, User, X } from "react-feather";
import { useState } from "react";
import { DownloadModal, dictantContent, status } from "./helper";

const Main = () => {
  const [downloadModal, setDownloadModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 50,
  });

  const columns = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Фото",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      render: () => {
        return <Avatar size={64} icon={<User size={32} />} />;
      },
    },
    {
      title: "Ф.И.О",
      dataIndex: "fio",
      key: "fio",
      align: "center",
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: "Дата рождения",
      dataIndex: "birth_date",
      key: "birth_date",
      align: "center",
    },
    {
      title: "Номер",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Студент",
      dataIndex: "student",
      key: "student",
      align: "center",
      render: (t) => (!t ? <X color="red" /> : <Check color="green" />),
    },
    {
      title: "Уровень языка",
      dataIndex: "language",
      key: "language",
      align: "center",
      render: (t) => {
        return (
          <ul>
            <li className="li d-flex align-center gap-x-2">
              Узб. <span>{t?.uzb.slice(0, 4)}</span>
            </li>
            <li className="li d-flex align-center gap-x-2">
              Рус. <span>{t?.rus.slice(0, 4)}</span>
            </li>
            <li className="li d-flex align-center gap-x-2">
              Анг. <span>{t?.eng.slice(0, 4)}</span>
            </li>
          </ul>
        );
      },
    },
    {
      title: "Уровень знания комп.",
      dataIndex: "PC",
      key: "PC",
      align: "center",
      render: (t) => {
        return <p>{t?.slice(0, 4)}</p>;
      },
    },
    {
      title: "Опыт работы",
      dataIndex: "experience",
      key: "experience",
      align: "center",
    },
    {
      title: "Время создание",
      dataIndex: "create_date",
      key: "create_date",
      align: "center",
      render: (t) => {
        return <p>{moment(t).format("DD.MM.YYYY hh:mm")}</p>;
      },
    },
    {
      title: "Резюме",
      dataIndex: "CV",
      key: "CV",
      align: "center",
      render: () => {
        return (
          <a href="#" className="d-flex align-center gap-x-1">
            <Eye size={15} />
            Посмотреть
          </a>
        );
      },
    },
    {
      title: "Диктант",
      dataIndex: "dictant",
      key: "dictant",
      align: "center",
      render: () => {
        return (
          <div className="d-flex align-center flex-column gap-1">
            <Popover
              trigger={"click"}
              content={dictantContent}
              placement="leftTop"
            >
              <Button
                size="medium"
                icon={<Eye size={15} />}
                type="default"
                className="d-flex align-center p-1"
              >
                Посмотреть
              </Button>
            </Popover>
            <Button
              size="medium"
              icon={<Download size={15} />}
              type="primary"
              className="d-flex align-center p-1"
              onClick={() => setDownloadModal(true)}
            >
              Загрузить
            </Button>
          </div>
        );
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: () => {
        return (
          <Select
            size="medium"
            options={status}
            defaultValue={"will_call"}
            style={{ width: "200px" }}
          />
        );
      },
    },
    {
      title: "Примечание",
      dataIndex: "comment",
      key: "comment",
      render: () => {
        return <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />;
      },
    },
  ];
  const data = [
    {
      key: 1,
      number: 1,
      photo: "-",
      fio: "ДАВЛАТОВА МАЛИНАБОНУ АЗИЗХОН КИЗИ",
      birth_date: "22.11.2004",
      phone: "+998950457788",
      address: "Ташкент,Шайхантохур район,Аэропланная-54",
      student: false,
      language: { uzb: "Свободный", rus: "Свободный", eng: "Свободный" },
      PC: "Продвинутый",
      experience: "0-1год",
      create_date: new Date(),
    },
    {
      key: 2,
      number: 2,
      photo: "-",
      fio: "ДАВЛАТОВА МАЛИНАБОНУ АЗИЗХОН КИЗИ",
      birth_date: "22.11.2004",
      phone: "+998950457788",
      address: "Ташкент,Шайхантохур район,Аэропланная-54",
      student: false,
      language: { uzb: "Свободный", rus: "Свободный", eng: "Свободный" },
      PC: "Продвинутый",
      experience: "0-1год",
      create_date: new Date(),
    },
    {
      key: 3,
      number: 3,
      photo: "-",
      fio: "ДАВЛАТОВА МАЛИНАБОНУ АЗИЗХОН КИЗИ",
      birth_date: "22.11.2004",
      phone: "+998950457788",
      address: "Ташкент,Шайхантохур район,Аэропланная-54",
      student: false,
      language: { uzb: "Свободный", rus: "Свободный", eng: "Свободный" },
      PC: "Продвинутый",
      experience: "0-1год",
      create_date: new Date(),
    },
    {
      key: 4,
      number: 4,
      photo: "-",
      fio: "ДАВЛАТОВА МАЛИНАБОНУ АЗИЗХОН КИЗИ",
      birth_date: "22.11.2004",
      phone: "+998950457788",
      address: "Ташкент,Шайхантохур район,Аэропланная-54",
      student: false,
      language: { uzb: "Свободный", rus: "Свободный", eng: "Свободный" },
      PC: "Продвинутый",
      experience: "0-1год",
      create_date: new Date(),
    },
    {
      key: 5,
      number: 5,
      photo: "-",
      fio: "ДАВЛАТОВА МАЛИНАБОНУ АЗИЗХОН КИЗИ",
      birth_date: "22.11.2004",
      phone: "+998950457788",
      address: "Ташкент,Шайхантохур район,Аэропланная-54",
      student: false,
      language: { uzb: "Свободный", rus: "Свободный", eng: "Свободный" },
      PC: "Продвинутый",
      experience: "0-1год",
      create_date: new Date(),
    },
  ];

  return (
    <main className="main">
      <Table
        bordered
        columns={columns}
        dataSource={data}
        size="medium"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Общий ${total} шт.`,
          onChange: (page, pageSize) => {
            setPagination({
              current: page,
              pageSize,
            });
          },
          onShowSizeChange: (current, size) => {
            setPagination({
              ...pagination,
              pageSize: size,
            });
          },
        }}
      />
      {/* modal download*/}
      <DownloadModal is_open={downloadModal} close_modal={setDownloadModal} />
    </main>
  );
};

export default Main;
