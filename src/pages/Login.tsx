import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Divider,
  message,
  Flex,
  Row,
  Col,
  theme,
  Space,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ThemeSensitiveLogo from "../components/ThemeSensitiveLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("login");
  const { token } = theme.useToken();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Login attempt:", values);
      message.success(t("loginSuccessful"));
    } catch (error) {
      message.error(t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    message.info(t("googleLoginAttempt"));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
        background: token.colorBgContainer,
        transition: "background 0.3s",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          boxShadow: token.boxShadow,
          borderRadius: token.borderRadiusLG,
        }}
      >
        <Flex vertical align="center" gap="middle">
          {/* Logo */}
          <Row justify="center" style={{ width: "100%", marginBottom: 20 }}>
            <ThemeSensitiveLogo />
          </Row>

          <Title level={3} style={{ margin: 0, color: token.colorText }}>
            {t("title")}
          </Title>

          <Form name="login" style={{ width: "100%" }} onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("emailRequired"),
                },
                {
                  type: "email",
                  message: t("emailInvalid"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t("emailPlaceholder")}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("passwordRequired"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t("passwordPlaceholder")}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" noStyle>
                  <Checkbox>{t("rememberMe")}</Checkbox>
                </Form.Item>

                <Link
                  to="/forgot-password"
                  style={{ color: token.colorPrimary }}
                >
                  {t("forgotPassword")}
                </Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
                style={{
                  backgroundColor: token.colorPrimary,
                  color: token.colorTextLightSolid,
                }}
              >
                {t("loginButton")}
              </Button>
            </Form.Item>

            <Divider>{t("dividerOr")}</Divider>

            <Button
              block
              size="large"
              onClick={handleGoogleLogin}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
                border: `1px solid ${token.colorBorder}`,
                fontWeight: 500,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                style={{ marginRight: 10 }}
              >
                <path
                  fill="#4285F4"
                  d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.33-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.67 28.18c-.44-1.32-.69-2.74-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.895 21.895 0 0 0 2 24c0 3.54.85 6.89 2.34 9.88l7.33-5.7z"
                />
                <path
                  fill="#EA4335"
                  d="M24 9.57c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.51 29.93 0 24 0 15.4 0 7.96 4.93 4.34 12.12l7.33 5.7c1.75-5.2 6.6-9.25 12.33-9.25z"
                />
              </svg>
              {t("googleSignIn")}
            </Button>

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
                    color: token.colorText,
                  }}
                >
                  <Text>{t("noAccount")}</Text>{" "}
                  <Link to="/signup" style={{ color: token.colorPrimary }}>
                    {t("signUp")}
                  </Link>
                </div>

                <LanguageSwitcher />
              </Space>
            </Flex>
          </Form>
        </Flex>
      </Card>

      {/* Theme Toggle in the bottom right corner */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Login;
