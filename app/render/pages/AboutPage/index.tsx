/**
 * industrial-spring-assistant
 *
 * @date 2021/02/18
 */

import * as React from 'react';
import { renderToHtml } from '@/common/commonDeclares';
import styles from './index.less';

const packageJson = require('../../../../package.json');


const AboutPage = () => {
  return (
    <div style={styles.root}>
      <div style={styles.title}>
        <img style={{ width: 50, height: 50 }} alt=""
             src="../images/app-icon.png" />

        <span style={styles.appName}>工业弹簧速查助手</span>
      </div>
      <span style={{ marginTop: 20, color: '#666' }}>
                    {packageJson.version} @Author
            </span>
    </div>
  );
};


const aboutPage = renderToHtml(<AboutPage />);
