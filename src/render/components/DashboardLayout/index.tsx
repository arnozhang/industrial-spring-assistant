/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PicCenterOutlined } from '@ant-design/icons';
import { ReactFC, ReactFCProps } from "@/common/renderDeclares";
import { createMenu, INavMenu } from "@/common/menu";
import zhCN from 'antd/es/locale/zh_CN';
import styles from './index.less';
import { useHistory } from "react-router";


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
];


const DashboardLayout = (props: ReactFCProps) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
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

              <span>工业弹簧速查助手</span>
            </div>

            <div style={{ flex: 1, }} />
          </header>

          <div className={styles.container}>
            {props.children}
          </div>
          <div className={styles.footer}>©2020 Jugg</div>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
