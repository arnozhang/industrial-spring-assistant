/**
 * industrial-spring-assistant
 *
 * @date 2021/02/18
 */

import * as React from 'react';
import { appName_zh_CN } from "@@/common/commonDeclares";
import styles from './index.less';

const packageJson = require('../../../../package.json');


const AboutPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <img style={{ width: 50, height: 50 }} alt="logo"
             src="../images/app-icon.png" />

        <span className={styles.appName}>${appName_zh_CN}</span>
      </div>

      <span style={{ marginTop: 20, color: '#666' }}>
        V{packageJson.version} ©2021 Jugg
      </span>
    </div>
  );
};


export default AboutPage;
