import "./style.scss";
import Logo from "src/assets/svg/customer-service-fill.svg";
import ForwardIcon from "src/assets/svg/share-forward-line.svg";
import { Search } from "react-feather";
import { Button, Divider, Input, Select } from "antd";

const Header = () => {
  const statusOptions = [
    {
      label: "Все",
      value: "all",
    },
  ];

  return (
    <header className="header d-flex align-center justify-between gap-x-3">
      <section className="logo d-flex justify-center align-center gap-x-2">
        <img src={Logo} alt="logo" />
        <p>Админ панель HR бота Контактного центра</p>
      </section>
      <section className="filter d-flex align-center gap-x-3  ">
        <Input
          placeholder={`Поиск по Ф.И.О и номер`}
          style={{ width: "100%", maxWidth: "500px" }}
          prefix={<Search size={15} color="grey" cursor={"pointer"} />}
        />
        <Divider
          type="vertical"
          orientation="center"
          style={{ color: "black", height: "3rem" }}
        />
        <div className="filter__select d-flex align-center gap-x-2">
          <p>Сортировка по статусу</p>
          <Select
            style={{ width: "100%" }}
            options={statusOptions}
            defaultValue={"all"}
          />
        </div>
        <section className=" d-flex justify-end align-center gap-x-1">
          <Button
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
