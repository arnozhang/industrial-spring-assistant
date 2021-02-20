/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { getPropsValue, IBaseValueProps } from "@/components/ValueItems/index";
import styles from './index.less';


interface IProps extends IBaseValueProps {

  unit?: string;
}


const DisplayValue = (props: IProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>

      <span className={styles.display}>
        {getPropsValue(props.value)}
      </span>

      <span className={styles.unit}>
        {props.extra ? props.extra : (props.unit || '')}
      </span>
    </div>
  );
};

export default DisplayValue;
