/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { useState } from 'react';
import { Select } from 'antd';
import { EnumValueType } from "@/common/baseModel";
import {
  getPropsValue,
  getPropsValueChanged,
  IBaseValueProps
} from "@/components/ValueItems/index";
import styles from './index.less';


interface IProps extends IBaseValueProps {

  options: EnumValueType;
}


const SelectValue = (props: IProps) => {
  const propsValue = getPropsValue(props.value);
  const propsValueChanged = getPropsValueChanged(props.value);

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
