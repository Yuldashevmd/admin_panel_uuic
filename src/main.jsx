import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./utils/routes";
import { Spin } from "antd";
import "./styles/globalStyles.css";
import { Provider } from "react-redux";
import { store } from "./service/store/store";
import MainContext from "./service/context";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Spin
          className="d-flex justify-center align-center"
          style={{ height: "100vh" }}
        />
      }
    >
      <Provider store={store}>
        <MainContext>
          <RouterProvider router={Routes} />
        </MainContext>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
