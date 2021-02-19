/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { useState } from 'react';
import { InputNumber } from 'antd';
import { NumberValueWrapper, ReactFCProps } from "@/common/renderDeclares";
import styles from './index.less';
import { JsUtils } from "js-utils-lite";


interface IProps extends ReactFCProps {

  label: string;
  unit?: string;
  extra?: React.ReactNode;

  disabled?: boolean;
  display?: boolean;
  value?: number | NumberValueWrapper;
}


const InputValue = (props: IProps) => {
  let propsValue: any = props.value;
  let propsValueChanged: (v: number) => void = undefined;

  if (!JsUtils.isNumber(props.value)) {
    const wrapper = props.value as NumberValueWrapper;
    propsValue = wrapper.value;
    propsValueChanged = wrapper.setValue;
  }

  const [value, setValue] = useState(propsValue || 0);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>

      {props.display ? (
        <span className={styles.display}>{propsValue}</span>
      ) : (
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
      )}

      <span className={styles.unit}>
        {props.extra ? props.extra : (props.unit || '')}
      </span>
    </div>
  );
};

export default InputValue;
