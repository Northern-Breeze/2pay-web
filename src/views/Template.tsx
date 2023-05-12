import * as React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  HomeOutlined,
  ScanOutlined,
  BankOutlined,
  NotificationOutlined,
  MailOutlined,
  QrcodeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useStoreState } from "easy-peasy";

import { Model } from "../store/model";

import "./Template.scss";

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
  defaultIndex: string;
};

export default function TemplateWrapper(props: Props): JSX.Element {
  const { children, defaultIndex } = props;
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setOnline] = React.useState(true);
  const profile = useStoreState<Model>((state) => state.profile);

  const navigate = useNavigate();
  const toggleNav = () => {
    setCollapsed(!collapsed);
  };

  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });
  React.useEffect(() => {
    setOnline(navigator.onLine);
  }, []);
  if (!isOnline) {
    return (
      <div className="offline-container">
        <span>Your offline, no internet connection</span>
      </div>
    );
  }
  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="side-bar"
      >
        <div className="logo">
          <img
            src={profile.avatar}
            className="brand-logo"
            alt="Northern Breeze"
          />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[defaultIndex]}>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ScanOutlined />}
            onClick={() => {
              navigate("/scan");
            }}
          >
            Scan
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<SearchOutlined />}
            onClick={() => {
              navigate("/search");
            }}
          >
            Search
          </Menu.Item>
          <Menu.Item
            key="10"
            icon={<QrcodeOutlined />}
            onClick={() => {
              navigate("/get-qr-code");
            }}
          >
            Generate QR Code
          </Menu.Item>
          <Menu.Item
            key="14"
            icon={<LinkOutlined />}
            onClick={() => {
              navigate("/get-payment-link");
            }}
          >
            Payment link
          </Menu.Item>
          <Menu.SubMenu
            title="Notifications"
            key="6"
            icon={<NotificationOutlined />}
          >
            <Menu.Item
              icon={<MoneyCollectOutlined />}
              onClick={() => {
                navigate("/transactions");
              }}
            >
              Transactions
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/messages");
              }}
              icon={<MailOutlined />}
            >
              Notifications
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key="7"
            icon={<BankOutlined />}
            onClick={() => {
              navigate("/accounts");
            }}
          >
            Bank Accounts
          </Menu.Item>
          <Menu.Item
            key="8"
            style={{
              position: "absolute",
              bottom: 30,
              zIndex: 1,
              transition: "all 0.2s",
            }}
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="9"
            style={{
              position: "absolute",
              bottom: 0,
              zIndex: 1,
              transition: "all 0.2s",
            }}
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            LogOut
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleNav,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
