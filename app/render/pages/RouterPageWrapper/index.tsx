/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { ReactFCProps } from '@/common/commonDeclares';
import styles from './index.less';


const RouterPageWrapper = (props: ReactFCProps) => {
  return (
    <div style={styles.wrapperRoot}>
      {props.children}
    </div>
  );
}

export default RouterPageWrapper;
