import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Space,
  Flex,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../ThemeContext";
import ThemeSensitiveLogo from "../components/ThemeSensitiveLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import "../styles/Auth.css";

const { Text } = Typography;

const SignUp: React.FC = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const { theme } = useTheme();
  const { t } = useTranslation("signup"); // Specify the namespace for signup

  // Function to check password strength
  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    // Check for password strength
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const passedChecks = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSymbols,
    ].filter(Boolean).length;

    if (password.length < 8) {
      setPasswordStrength(t("passwordStrength.tooWeak"));
    } else if (passedChecks === 2) {
      setPasswordStrength(t("passwordStrength.weak"));
    } else if (passedChecks === 3) {
      setPasswordStrength(t("passwordStrength.strong"));
    } else if (passedChecks === 4) {
      setPasswordStrength(t("passwordStrength.excellent"));
    } else {
      setPasswordStrength(t("passwordStrength.tooWeak"));
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Add your signup logic here
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <ThemeSensitiveLogo />
          <Text type="secondary">{t("createAccount")}</Text>
        </div>

        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={
              <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                {t("fullName")}
              </div>
            }
            rules={[{ required: true, message: t("validation.namRequired") }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("placeholders.fullName")}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                {t("email")}
              </div>
            }
            rules={[
              { required: true, message: t("validation.emailRequired") },
              { type: "email", message: t("validation.emailInvalid") },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t("placeholders.email")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                {t("password")} {passwordStrength && `(${passwordStrength})`}
              </div>
            }
            rules={[
              { required: true, message: t("validation.passwordRequired") },
              { min: 8, message: t("validation.passwordLength") },
            ]}
            help={
              <div
                style={{
                  fontSize: "12px",
                  color: theme === "dark" ? "#aaa" : "#8c8c8c",
                }}
              >
                {t("passwordHint")}
              </div>
            }
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("placeholders.password")}
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("") // Empty error message to avoid red text
                      ),
              },
            ]}
          >
            <br />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div>
                {t("agreement.text")}{" "}
                <a href="#">{t("agreement.privacyPolicy")}</a>{" "}
                {t("agreement.and")}{" "}
                <a href="#">{t("agreement.termsOfService")}</a>
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("signUp")}
            </Button>
          </Form.Item>

          <div className="auth-footer">
            <Divider plain>{t("or")}</Divider>

            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                className="google-btn"
                block
                size="large"
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                icon={
                  <span className="google-icon" style={{ marginRight: "8px" }}>
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g transform="matrix(1, 0, 0, 1, 0, 0)">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </g>
                    </svg>
                  </span>
                }
              >
                {t("signInWithGoogle")}
              </Button>
            </Space>

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
                  className="signup-link"
                  style={{
                    marginTop: "16px",
                    textAlign: "center",
                    color:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(0, 0, 0, 0.65)",
                  }}
                >
                  <Text type="secondary">
                    {t("alreadyHaveAccount")}{" "}
                    <Link to="/login">{t("logIn")}</Link>
                  </Text>
                </div>

                <LanguageSwitcher />
              </Space>
            </Flex>
          </div>
        </Form>
      </Card>

      {/* Theme toggle button positioned at bottom right */}
      <ThemeToggle />
    </div>
  );
};

export default SignUp;
