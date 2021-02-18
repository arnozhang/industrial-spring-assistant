/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { Button } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import InputValue from "@/components/InputValue";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import ButterflySpringHelper from "./helper";


const ButterflySpring = () => {
  return (
    <div>
      <div className="row">
        <InfoCircleOutlined />
        <span style={{ marginLeft: 5, flex: 1 }}>
          仅考虑t&lt;=6时，无支撑面的碟簧!
        </span>

        <Button onClick={clickShowHelperDialog(ButterflySpringHelper)}>帮助信息</Button>
      </div>

      <InputValue label="弹性模量" defaultValue={206000} unit="Mpa" />
      <InputValue label="屈服极限" defaultValue={1400} unit="Mpa" />

      <InputValue label="泊松比" defaultValue={0.3} />

      <InputValue label="外径" defaultValue={40} unit="mm" />
      <InputValue label="内径" defaultValue={20.4} unit="mm" />
      <InputValue label="厚度" defaultValue={2.25} unit="mm" />
      <InputValue label="高度" defaultValue={3.15} unit="mm" />

      <InputValue label="旋绕比" defaultValue={1.961} disabled />
      <InputValue label="h0/t" defaultValue={0.4} disabled />
      <InputValue label="全变形量" defaultValue={0.9} disabled />

      <InputValue label="K1" defaultValue={0.686} disabled />
      <InputValue label="K2" defaultValue={1.211} disabled />
      <InputValue label="K3" defaultValue={1.363} disabled />

      <InputValue label="变形量" defaultValue={0.9} />
      <InputValue label="载荷" defaultValue={8457.3} disabled />
      <InputValue label="刚度" defaultValue={8645} disabled />

      <InputValue label="σOM" defaultValue={-1595} unit="Mpa" disabled />
      <InputValue label="σⅠ" defaultValue={-2682} unit="Mpa" disabled />
      <InputValue label="σⅡ" defaultValue={1872} unit="Mpa" disabled />
      <InputValue label="σⅢ" defaultValue={1419} unit="Mpa" disabled />
      <InputValue label="σⅣ" defaultValue={-903} unit="Mpa" disabled />
    </div>
  );
};

export default ButterflySpring;
