/* eslint-disable react-hooks/exhaustive-deps */
import { Popover, Table } from "antd";
import { useDispatch } from "react-redux";
import "./style.scss";
import { Avatar, Button, Select } from "antd";
import moment from "moment";
import { Check, Download, Eye, User, X } from "react-feather";
import { useState } from "react";
import { changeStatus, fetchAllUsers, status } from "./helper";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useData from "src/service/hooks/useData";
import useLoading from "src/service/hooks/useLoading";
import { DownloadModal } from "src/components/Upload";
import CommentModal from "src/components/CommentModal";
import { updateUsers } from "src/service/store/userSlicer";
import usePagination from "src/service/hooks/usePagination";

const styleStatus = {
  padding: "1em 1rem",
  color: "#fff",
  borderRadius: "8px",
  background: "grey",
  fontWeight: "600",
  textAlign: "center",
  letterSpacing: "1.5px",
};

const Main = () => {
  const dispatch = useDispatch();
  const role = sessionStorage.getItem("user_role");
  const [afterSendFile, setAfterSendFile] = useState(false);
  const [userId, setUserId] = useState(null);
  const { data, setData } = useData();
  const [disabled, setDisabled] = useState(false);
  const { loading, setLoading } = useLoading();
  const [downloadModal, setDownloadModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const { pagination, setPagination } = usePagination();
  // handleChangeStatus
  const handleChangeStatus = async (e, { id }) => {
    const { status } = await changeStatus(e, id, setDisabled);
    status === 200 &&
      toast.success("Изменено!", {
        position: "bottom-right",
        hideProgressBar: false,
      });
  };

  // Col for table
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: "Фото",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (t) => {
        return <Avatar src={t ? t : "#"} size={64} icon={<User size={32} />} />;
      },
    },
    {
      title: "Ф.И.О",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: "Дата рождения",
      dataIndex: "date_was_born",
      key: "date_was_born",
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
      render: (t, record) => {
        const checkColor = (lang) => {
          switch (lang) {
            case "Средний":
              return (
                <span style={{ color: "#C1A40B", fontWeight: "600" }}>
                  {lang?.slice(0, 4)}
                </span>
              );
            case "Свободный":
              return (
                <span style={{ color: "#1E8E14", fontWeight: "600" }}>
                  {lang?.slice(0, 4)}
                </span>
              );
            case "Начальный":
              return (
                <span style={{ color: "#D13D3D", fontWeight: "600" }}>
                  {lang?.slice(0, 4)}
                </span>
              );
            default:
              return (
                <span style={{ color: "#1E8E14", fontWeight: "600" }}>
                  {lang?.slice(0, 4)}
                </span>
              );
          }
        };
        return (
          <ul>
            <li className="li d-flex align-center gap-x-2">
              Узб. {checkColor(record?.lang_uz)}
            </li>
            <li className="li d-flex align-center gap-x-2">
              Рус. {checkColor(record?.lang_ru)}
            </li>
            <li className="li d-flex align-center gap-x-2">
              Анг. {checkColor(record?.lang_en)}
            </li>
          </ul>
        );
      },
    },
    {
      title: "Уровень знания комп.",
      dataIndex: "comp",
      key: "comp",
      align: "center",
      render: (t) => {
        return <p>{t?.slice(0, 4)}.</p>;
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
      dataIndex: "create_data",
      key: "create_data",
      align: "center",
      render: (t) => {
        return <p>{moment(t).format("DD.MM.YYYY hh:mm")}</p>;
      },
    },
    {
      title: "Резюме",
      dataIndex: "resumePdf",
      key: "resumePdf",
      align: "center",
      render: (t) => {
        return (
          <a
            href={t}
            target="_blank"
            rel="noreferrer"
            className="d-flex align-center gap-x-1"
          >
            <Eye size={15} />
            Посмотреть
          </a>
        );
      },
    },
    {
      title: "Диктант",
      dataIndex: "dictation_image",
      key: "dictation_image",
      align: "center",
      render: (t, record) => {
        return (
          <div className="d-flex align-center flex-column gap-1">
            {record?.images.length > 0 ? (
              <Popover
                trigger={"click"}
                content={record?.images.map((image, index) =>
                  image?.image_link !== null ? (
                    <div key={index}>
                      <a
                        href={image?.image_link}
                        rel="noreferrer"
                        target="_blank"
                        alt="img"
                      >
                        {index + 1}-{" "}
                        {image?.name_file ? image?.name_file : "Диктант"}
                      </a>
                    </div>
                  ) : (
                    "Нет загружено!"
                  )
                )}
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
            ) : (
              <p>Не загружено</p>
            )}
            {role == "admin" && (
              <Button
                size="medium"
                icon={<Download size={15} />}
                type="primary"
                className="d-flex align-center p-1"
                onClick={() => {
                  setDownloadModal(true), setUserId(record?.id);
                }}
              >
                Загрузить
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (t, record) => {
        const checkCase = (t) => {
          switch (t) {
            case "will_call":
              return (
                <p style={{ ...styleStatus, background: "grey" }}>Позвонить</p>
              );
            case "passed_first":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "steelblue",
                  }}
                >
                  Прошёл 1-этап
                </p>
              );
            case "failed_first":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "crimson",
                  }}
                >
                  Не прошёл 1-этап
                </p>
              );
            case "will_come":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "orange",
                  }}
                >
                  Придёт
                </p>
              );
            case "came":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "green",
                  }}
                >
                  Пришел
                </p>
              );
            case "failed_call":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "red",
                  }}
                >
                  Не выходит на связь
                </p>
              );
            case "cancel":
              return (
                <p
                  style={{
                    ...styleStatus,
                    background: "red",
                  }}
                >
                  Отказ
                </p>
              );
            default:
              return "Позвонить";
          }
        };
        if (role == "monitor") return checkCase(t);
        return (
          <Select
            onChange={(e) => handleChangeStatus(e, record)}
            size="medium"
            options={status}
            defaultValue={t ? t : "will_call"}
            style={{ width: "200px" }}
            disabled={disabled}
          />
        );
      },
    },
    {
      title: "Примечание",
      dataIndex: "Comment",
      key: "Comment",
      render: (t, record) => {
        if (role == "monitor")
          return t ? (
            <Popover
              placement="left"
              trigger={"click"}
              title={"Отзыв"}
              content={
                <div style={{ maxWidth: "500px", width: "100%" }}>
                  <p style={{ wordWrap: "break-word" }}>{t}</p>
                </div>
              }
            >
              <Button>Посмотреть отзыв</Button>
            </Popover>
          ) : (
            "Нет отзыва"
          );

        return t ? (
          <Popover
            placement="left"
            trigger={"click"}
            title={"Отзыв"}
            content={
              <div style={{ maxWidth: "500px", width: "100%" }}>
                <p style={{ wordWrap: "break-word" }}>{t}</p>
              </div>
            }
          >
            <Button>Посмотреть отзыв</Button>
          </Popover>
        ) : (
          <Button
            onClick={() => {
              setCommentModal(true), setUserId(record?.id);
            }}
          >
            Оставить отзыв
          </Button>
        );
      },
    },
  ];

  // getUsers
  const getUsers = (page, pageSize) => {
    fetchAllUsers(setLoading, page, pageSize).then((res) => {
      dispatch(
        updateUsers(
          res?.results.map((item, index) => {
            return { index: index + 1, ...item };
          })
        )
      ),
        setPagination({
          current: +res?.pagination.currentPage,
          pageSize: +res?.pagination.pageSize,
          total: +res?.pagination.totalItems,
        });
      setData(
        res?.results.map((item, index) => {
          return {
            key: item.id,
            index: index + 1,
            ...item,
          };
        })
      );
    });
  };

  useEffect(() => {
    getUsers(pagination.current, pagination.pageSize);
  }, [afterSendFile]);

  return (
    <main className="main">
      <Table
        bordered
        columns={columns}
        dataSource={data}
        loading={loading}
        size="medium"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Общий ${total} шт.`,
          onChange: (page, pageSize) => {
            getUsers(page, pageSize);
          },
          onShowSizeChange: (current, size) => {
            getUsers(current, size);
          },
        }}
      />
      {/* modal download*/}
      <DownloadModal
        is_open={downloadModal}
        close_modal={setDownloadModal}
        userId={userId}
        setAfterSendFile={setAfterSendFile}
      />
      {/* modal comment */}
      <CommentModal
        getUsers={getUsers}
        pagination={pagination}
        open={commentModal}
        close={setCommentModal}
        userId={userId}
      />
      <ToastContainer />
    </main>
  );
};

export default Main;
