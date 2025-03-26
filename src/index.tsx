import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "antd";
import i18n from "./i18n";
import App from "./App";
import "antd/dist/reset.css"; // Ant Design CSS reset

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ConfigProvider>
  </React.StrictMode>
);
