/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { useState } from 'react';
import { Select } from 'antd';
import { JsUtils } from "js-utils-lite";
import { NumberValueWrapper, ReactFCProps } from "@/common/renderDeclares";
import { EnumValueType } from "@/common/baseModel";
import styles from './index.less';


interface IProps extends ReactFCProps {

  label: string;
  options: EnumValueType;
  value?: number | NumberValueWrapper;
}


const SelectValue = (props: IProps) => {
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

      <Select
        className={styles.select}
        value={value}
        onChange={v => {
          const val = v as number;

          setValue(val);
          propsValueChanged && propsValueChanged(val);
        }}
      >
        {Object.keys(props.options).map(key => {
          const item = props.options[key];

          return (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select>

      <span className={styles.pad} />
    </div>
  );
};

export default SelectValue;
