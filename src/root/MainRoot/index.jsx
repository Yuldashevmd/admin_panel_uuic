import { Outlet } from "react-router-dom";
import "./style.scss";
import Header from "src/components/Header";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
