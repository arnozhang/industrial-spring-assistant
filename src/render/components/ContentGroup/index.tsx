/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { ReactFCProps } from "@/common/renderDeclares";
import styles from './index.less';


interface IProps extends ReactFCProps {

  label: string;
}


const ContentGroup = (props: IProps) => {
  return (
    <div className={styles.container} style={props.style}>
      <span className={styles.label}>{props.label}</span>

      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
};

export default ContentGroup;
