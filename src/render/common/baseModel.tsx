/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import { NumberValueWrapper } from "@/common/renderDeclares";
import { VoidFunction } from "@@/common/commonDeclares";


export interface EnumValueItem {

  label: string;
  value: any;
}

export interface EnumValueType {

  [key: string]: EnumValueItem;
}


export default abstract class BaseModel {

  onValueRefreshed: VoidFunction;

  constructor(forceUpdate?: () => void) {
    this.onValueRefreshed = forceUpdate;
  }

  protected wrapValue(initialValue: number): NumberValueWrapper {
    let localValue = initialValue;
    const _this = this;

    return {
      get value() {
        return localValue;
      },
      setValue(newValue: number) {
        localValue = newValue;
        _this.onValueRefreshed && _this.onValueRefreshed();
      },
    };
  }
}
