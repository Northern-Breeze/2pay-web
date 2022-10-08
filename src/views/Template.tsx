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
  QuestionOutlined,
  ClockCircleOutlined,
  SettingOutlined
} from "@ant-design/icons";

import './Template.scss'

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
};

export default function TemplateWrapper(props: Props): JSX.Element {
  const { children } = props;
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setOnline] = React.useState(true);

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
  if(!isOnline){
    return <div className="offline-container"><span>Your offline, no internet connection</span></div>
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="side-bar">
        <div className="logo">
          <img
            src="https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4"
            className="brand-logo"
            alt="Northern Breeze"
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<SearchOutlined />}
            onClick={() => {
              navigate("/search");
            }}
          >
            Search
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ClockCircleOutlined />}
            onClick={() => {
              navigate("/profile/study-coach");
            }}
          >
            Study Coach
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<QuestionOutlined />}
            onClick={() => {
              navigate("/profile/questions-simulator");
            }}
          >
            Question simulator
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<SettingOutlined />}
            onClick={() => {
              navigate("/profile/settings");
            }}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key="6"
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
        <Header className="site-layout-background" style={{ padding: 0 }}>
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