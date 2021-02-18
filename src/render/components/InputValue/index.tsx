/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { useState } from 'react';
import { InputNumber } from 'antd';
import { ReactFCProps } from "@/common/renderDeclares";
import styles from './index.less';


interface IProps extends ReactFCProps {

  label: string;
  unit?: string;
  disabled?: boolean;
  defaultValue?: number;
}


const InputValue = (props: IProps) => {
  const [value, setValue] = useState(props.defaultValue || 0);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>

      <InputNumber
        className={styles.input}
        value={value}
        disabled={props.disabled}
        onChange={v => setValue(v as number)}
      />

      <span className={styles.unit}>{props.unit || ''}</span>
    </div>
  );
};

export default InputValue;
