import "./style.scss";
import Logo from "src/assets/svg/customer-service-fill.svg";
import { Download, Search } from "react-feather";
import { Button, Divider, Input, Select } from "antd";
import useData from "src/service/hooks/useData";
import { useRef } from "react";
import { useState } from "react";
import { filterData } from "src/pages/Error/Main/helper";
import useLoading from "src/service/hooks/useLoading";
import DownloadExcel from "../Excel";
import usePagination from "src/service/hooks/usePagination";
import { useLocalStorage } from "src/service/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { get } = useLocalStorage();
  const { pagination, setPagination } = usePagination();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [selectStatus, setSelectStatus] = useState(null);
  const { setData } = useData();
  const { setLoading } = useLoading();
  const statusOptions = [
    {
      label: "Все",
      value: "all",
    },
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
    {
      label: "Принят на работу",
      value: "hired",
    },
  ];

  // handleFilter
  const handleFilter = async () => {
    setLoading(true);
    const value = inputRef?.current.input.value;
    if (value == "") {
      const pagination = {
        current: get("currentPage"),
        pageSize: get("pageSize"),
      };
      const res = await filterData(value, selectStatus, pagination);
      setPagination({
        current: +res?.pagination.currentPage,
        pageSize: +res?.pagination.pageSize,
        total: +res?.pagination.totalItems,
      });
      setData(
        res?.results.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))
      );
    } else {
      const res = await filterData(value, selectStatus, null, pagination.total);
      setPagination({
        current: +res?.pagination.currentPage,
        pageSize: +res?.pagination.pageSize,
        total: +res?.pagination.totalItems,
      });
      setData(
        res?.results.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))
      );
    }
    setLoading(false);
  };

  const handleChangeStatus = async (e) => {
    if (e !== "all") {
      setLoading(true);
      const value = inputRef?.current.input.value;
      const res = await filterData(value, e, null, pagination.total);
      setSelectStatus(e);
      setData(
        res?.results.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))
      );
      setPagination({
        current: +res?.pagination.currentPage,
        pageSize: +res?.pagination.pageSize,
        total: +res?.pagination.totalItems,
      });
      setLoading(false);
    } else {
      setLoading(true);
      const pagination = {
        current: get("currentPage"),
        pageSize: get("pageSize"),
      };
      const value = inputRef?.current.input.value;
      const res = await filterData(value, e, pagination);
      setSelectStatus(e);
      setData(
        res?.results.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))
      );
      setPagination({
        current: +res?.pagination.currentPage,
        pageSize: +res?.pagination.pageSize,
        total: +res?.pagination.totalItems,
      });
      setLoading(false);
    }
  };

  // LOG-OUT
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header d-flex align-center justify-between gap-x-3">
      <section className="logo d-flex justify-center align-center gap-x-2">
        <img src={Logo} alt="logo" />
        <p>Админ панель HR бота Контактного центра</p>
      </section>
      <section className="filter d-flex align-center justify-between gap-x-3  ">
        <Input
          allowClear
          type="search"
          ref={inputRef}
          onPressEnter={handleFilter}
          placeholder={`Поиск по Ф.И.О или по номеру телефона`}
          style={{ width: "100%", maxWidth: "500px" }}
          prefix={
            <Search
              onClick={handleFilter}
              size={15}
              color="grey"
              cursor={"pointer"}
            />
          }
        />

        <Divider
          type="vertical"
          orientation="center"
          style={{ color: "black", height: "3rem" }}
        />
        <div className="filter__select d-flex align-center gap-x-2">
          <p>Фильтр по статусу:</p>
          <Select
            onChange={handleChangeStatus}
            style={{ width: "100%" }}
            options={statusOptions}
            defaultValue={"all"}
          />
        </div>
        <section className=" d-flex justify-end align-center gap-x-1">
          <Button
            style={{ background: "green", color: "#fff" }}
            onClick={() =>
              DownloadExcel(setLoading, pagination.total, selectStatus)
            }
            className="d-flex align-center"
            icon={<Download size={16} />}
          >
            Экспортировать в Excel
          </Button>
        </section>
        <section>
          <Button onClick={handleLogout}>Выйти</Button>
        </section>
      </section>
    </header>
  );
};

export default Header;
