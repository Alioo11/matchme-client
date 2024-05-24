import React from "react";
import { DesktopOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

type AntDMenuItem = Required<MenuProps>["items"][number];

type MenuItem = {
  key: any;
  link: string;
  label: string;
  icon: React.ReactNode;
};

const menuConfig: MenuItem[] = [
  { key: 1, label: "", link: "", icon: <DesktopOutlined /> },
];

const mapMenuConfigToMenuProps = (menuItem: MenuItem): AntDMenuItem => {
  return {
    key: menuItem.key,
    label: menuItem.label,
    icon: menuItem.icon,
    children : <DesktopOutlined />
  };
};
