/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { JsUtils } from "js-utils-lite";
import { NumberValueWrapper, ReactFCProps } from "@/common/renderDeclares";


export interface IBaseValueProps extends ReactFCProps {

  label: string;
  value?: number | NumberValueWrapper;
  extra?: React.ReactNode;
}

export function getPropsValue(value: number | NumberValueWrapper) {
  return JsUtils.isNumber(value)
    ? value as number
    : (value as NumberValueWrapper).value;
}

export function getPropsValueChanged(value: number | NumberValueWrapper) {
  return JsUtils.isNumber(value)
    ? undefined
    : (value as NumberValueWrapper).setValue;
}
