import React from "react";
import { Select, theme } from "antd";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { token } = theme.useToken();

  const languages = [
    { value: "en", label: "EN" },
    { value: "es", label: "ES" },
    { value: "fr", label: "FR" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Select
      style={{
        width: "100%",
        maxWidth: 250,
        color: token.colorText,
      }}
      popupClassName="language-switcher-dropdown"
      defaultValue={i18n.language}
      onChange={changeLanguage}
      suffixIcon={
        <GlobalOutlined style={{ color: token.colorTextSecondary }} />
      }
      options={languages}
    />
  );
};

export default LanguageSwitcher;
