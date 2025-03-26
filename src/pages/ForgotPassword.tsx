import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Divider, Flex, Space } from "antd";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../ThemeContext";
import ThemeSensitiveLogo from "../components/ThemeSensitiveLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import "../styles/Auth.css";

const { Text } = Typography;

interface NotificationProps {
  message: string;
  visible: boolean;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState<NotificationProps>({
    message: "",
    visible: false,
  });
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation("forgotPassword"); // Specify the namespace for forgot password

  // Close notification after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (notification.visible) {
      timer = setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [notification.visible]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showNotification = (message: string) => {
    setNotification({
      message,
      visible: true,
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      visible: false,
    });
  };

  const handleSubmit = (): void => {
    if (!inputValue) {
      setErrorMessage(t("validation.emailRequired"));
      return;
    }

    if (!validateEmail(inputValue)) {
      setErrorMessage("");
      showNotification(t("validation.invalidEmail"));
      return;
    }

    setEmail(inputValue);
    showNotification(t("notification.linkSent"));
    console.log("Email sent to:", inputValue);
    // Add your password reset logic here
  };

  const handleReturnToLogin = (): void => {
    navigate("/login");
  };

  return (
    <div
      className="auth-container"
      style={{
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Notification Box */}
      {notification.visible && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "16px 24px",
            borderRadius: "8px",
            backgroundColor: theme === "dark" ? "#1f1f1f" : "white",
            border: `1px solid ${theme === "dark" ? "#444" : "#d9d9d9"}`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            color:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.85)"
                : "rgba(0, 0, 0, 0.65)",
            fontSize: "16px",
            fontWeight: "500",
            minWidth: "280px",
            maxWidth: "400px",
            width: "calc(100% - 40px)",
            animation: "slideInRight 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="notification-box"
        >
          <span>{notification.message}</span>
          <CloseOutlined
            onClick={closeNotification}
            style={{
              marginLeft: "16px",
              cursor: "pointer",
              color:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.45)"
                  : "rgba(0, 0, 0, 0.45)",
              fontSize: "14px",
            }}
          />
        </div>
      )}

      {/* Styles remain the same */}
      <style>
        {`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .notification-box {
            right: 10px;
            left: 10px;
            width: calc(100% - 20px);
            max-width: none;
          }
        }
        `}
      </style>

      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <ThemeSensitiveLogo />
        </div>

        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {t("description")}
        </Text>

        <div style={{ width: "100%", marginBottom: "16px" }}>
          <Input
            prefix={<UserOutlined />}
            placeholder={t("placeholders.email")}
            size="large"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setErrorMessage("");
            }}
            onPressEnter={handleSubmit}
            status={errorMessage ? "error" : ""}
          />
          {errorMessage && (
            <Text type="danger" style={{ fontSize: "12px" }}>
              {errorMessage}
            </Text>
          )}
        </div>

        <div style={{ width: "100%", marginBottom: "16px" }}>
          <Button type="primary" size="large" block onClick={handleSubmit}>
            {t("resetPassword")}
          </Button>
        </div>

        <Divider plain>{t("or")}</Divider>

        <div style={{ width: "100%", marginBottom: "20px" }}>
          <Button
            size="large"
            block
            onClick={handleReturnToLogin}
            style={{
              borderColor: theme === "dark" ? "#444" : "#d9d9d9",
              color:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.85)"
                  : "rgba(0, 0, 0, 0.85)",
            }}
          >
            {t("returnToLogin")}
          </Button>
        </div>

        {/* Language Switcher added at the bottom */}
        <Flex
          vertical
          align="center"
          gap="middle"
          style={{
            marginTop: 16,
            width: "100%",
          }}
        >
          <Space direction="vertical" align="center" size="middle">
            <div
              style={{
                textAlign: "center",
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(0, 0, 0, 0.65)",
              }}
            >
              <Text>{t("needHelp")} </Text>
              <Link to="/contact">{t("contactSupport")}</Link>
            </div>

            <LanguageSwitcher />
          </Space>
        </Flex>
      </div>

      {/* Theme toggle button positioned at bottom right */}
      <ThemeToggle />
    </div>
  );
};

export default ForgotPassword;
