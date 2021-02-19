/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router";
import { ConfigProvider, Layout } from 'antd';
import {
  AlignCenterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PicCenterOutlined
} from '@ant-design/icons';
import { ReactFC, ReactFCProps } from "@/common/renderDeclares";
import { createMenu, INavMenu } from "@/common/menu";
import zhCN from 'antd/es/locale/zh_CN';
import styles from './index.less';


const Logo: ReactFC = () => {
  return (
    <a className={styles.logo}>
      <img src="../images/app-icon.png" alt="logo" />
    </a>
  );
};


const menus: INavMenu[] = [
  {
    menuPath: 'butterflySpring',
    displayName: '蝶形弹簧',
    icon: <PicCenterOutlined />,
    menuUrl: '/butterflySpring',
  },
  {
    menuPath: 'pullSpring',
    displayName: '拉簧',
    icon: <AlignCenterOutlined />,
    menuUrl: '/pullSpring',
  },
];


const DashboardLayout = (props: ReactFCProps) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width={240} collapsed={collapsed}>
          <Logo />

          {createMenu(history, menus)}
        </Layout.Sider>

        <Layout.Content className={styles.content}>
          <header className={styles.header}>
            <div className={styles.left}>
              <span className={styles.menu} onClick={() => setCollapsed(!collapsed)}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              </span>

              <h2 className={styles.title}>工业弹簧速查助手</h2>
            </div>
          </header>

          <div className={styles.container}>
            {props.children}
          </div>
          <div className={styles.footer}>©2021 Jugg</div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
