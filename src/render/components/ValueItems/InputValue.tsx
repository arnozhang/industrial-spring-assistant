/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { useState } from 'react';
import { InputNumber } from 'antd';
import {
  getPropsValue,
  getPropsValueChanged,
  IBaseValueProps
} from "@/components/ValueItems/index";
import styles from './index.less';


interface IProps extends IBaseValueProps {

  unit?: string;

  disabled?: boolean;
}


const InputValue = (props: IProps) => {
  const propsValue = getPropsValue(props.value);
  const propsValueChanged = getPropsValueChanged(props.value);

  const [value, setValue] = useState(propsValue || 0);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>

      <InputNumber
        className={styles.input}
        value={value}
        disabled={props.disabled}
        onChange={v => {
          const val = v as number;

          setValue(val);
          propsValueChanged && propsValueChanged(val);
        }}
      />

      <span className={styles.unit}>
        {props.extra ? props.extra : (props.unit || '')}
      </span>
    </div>
  );
};


export default InputValue;
