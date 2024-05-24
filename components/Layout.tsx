import React, { useState } from "react";
import {
  DesktopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { HOCFunctionalComponent } from "@/types/component";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const App: HOCFunctionalComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const router = useRouter();

  function getItem(
    label: React.ReactNode,
    link: string,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => router.push(link),
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Dashboard", "/dashboard", "1", <DesktopOutlined />),
    getItem("Ranking", "/rank", "2", <DesktopOutlined />),
    // getItem("User", "", "sub1", <UserOutlined />, [getItem("Tom", "/what", "3")]),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={50}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Matchme ©{new Date().getFullYear()} Created by Ali Salehi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
