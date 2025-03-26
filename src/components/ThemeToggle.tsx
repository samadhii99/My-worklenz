import React, { useState } from "react";
import { Button } from "antd";
import {
  BgColorsOutlined,
  CloseOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useTheme } from "../ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="theme-toggle">
      <Button
        type="primary"
        shape="circle"
        icon={isMenuOpen ? <CloseOutlined /> : <BgColorsOutlined />}
        onClick={toggleMenu}
        style={{ marginBottom: isMenuOpen ? "10px" : "0" }}
      />

      {isMenuOpen && (
        <Button
          type="primary"
          shape="circle"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
