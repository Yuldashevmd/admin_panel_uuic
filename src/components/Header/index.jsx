import "./style.scss";
import Logo from "src/assets/svg/customer-service-fill.svg";
import ForwardIcon from "src/assets/svg/share-forward-line.svg";
import { Search } from "react-feather";
import { Button, Divider, Input, Select } from "antd";
import useData from "src/service/hooks/useData";
import { useRef } from "react";
import { useState } from "react";
import { filterData } from "src/pages/Error/Main/helper";
import useLoading from "src/service/hooks/useLoading";
import DownloadExcel from "../Excel";
import usePagination from "src/service/hooks/usePagination";

const Header = () => {
  const { pagination, setPagination } = usePagination();
  const inputRef = useRef();
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
  ];

  // handleFilter
  const handleFilter = async () => {
    setLoading(true);
    const value = inputRef?.current.input.value;
    const res = await filterData(value, selectStatus);
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
    setLoading(false);
  };

  const handleChangeStatus = async (e) => {
    setLoading(true);
    const value = inputRef?.current.input.value;
    const res = await filterData(value, e);
    setSelectStatus(e);
    setData(
      res?.results.map((item, index) => ({
        ...item,
        key: item.id,
        index: index + 1,
      }))
    );
    setLoading(false);
  };

  return (
    <header className="header d-flex align-center justify-between gap-x-3">
      <section className="logo d-flex justify-center align-center gap-x-2">
        <img src={Logo} alt="logo" />
        <p>Админ панель HR бота Контактного центра</p>
      </section>
      <section className="filter d-flex align-center gap-x-3  ">
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
          <p>Сортировка по статусу</p>
          <Select
            onChange={handleChangeStatus}
            style={{ width: "100%" }}
            options={statusOptions}
            defaultValue={"all"}
          />
        </div>
        <section className=" d-flex justify-end align-center gap-x-1">
          <Button
            onClick={() => DownloadExcel(setLoading, pagination.total)}
            className="d-flex align-center"
            icon={<img src={ForwardIcon} alt="excel" />}
          >
            Экспортировать в Excel
          </Button>
        </section>
      </section>
    </header>
  );
};

export default Header;
