/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { Button } from "antd";
import Tips from "@/components/Tips";
import InputValue from "@/components/InputValue";
import ContentGroup from "@/components/ContentGroup";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import ButterflySpringHelper from "./helper";


const ButterflySpring = () => {
  return (
    <div>
      <div className="flex-row">
        <Tips tips="仅考虑 t&lt;=6 时，无支撑面的碟簧!" />

        <Button onClick={clickShowHelperDialog(ButterflySpringHelper)}>帮助信息</Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="弹性模量" defaultValue={206000} unit="Mpa" />
        <InputValue label="屈服极限" defaultValue={1400} unit="Mpa" />

        <InputValue label="泊松比" defaultValue={0.3} />
      </ContentGroup>

      <ContentGroup label="碟簧参数">
        <InputValue label="外径" defaultValue={40} unit="mm" />
        <InputValue label="内径" defaultValue={20.4} unit="mm" />
        <InputValue label="厚度" defaultValue={2.25} unit="mm" />
        <InputValue label="高度" defaultValue={3.15} unit="mm" />
      </ContentGroup>

      <ContentGroup label="碟簧特性">
        <InputValue label="旋绕比" defaultValue={1.961} display />
        <InputValue label="h0/t" defaultValue={0.4} display />
        <InputValue label="全变形量" defaultValue={0.9} display />
      </ContentGroup>

      <ContentGroup label="系数计算">
        <InputValue label="K1" defaultValue={0.686} display />
        <InputValue label="K2" defaultValue={1.211} display />
        <InputValue label="K3" defaultValue={1.363} display />
      </ContentGroup>

      <ContentGroup label="载荷计算">
        <InputValue label="变形量" defaultValue={0.9} />
        <InputValue label="载荷" defaultValue={8457.3} display />
        <InputValue label="刚度" defaultValue={8645} display />
      </ContentGroup>

      <ContentGroup label="各点应力">
        <InputValue label="σOM" defaultValue={-1595} unit="Mpa" display />
        <InputValue label="σⅠ" defaultValue={-2682} unit="Mpa" display />
        <InputValue label="σⅡ" defaultValue={1872} unit="Mpa" display />
        <InputValue label="σⅢ" defaultValue={1419} unit="Mpa" display />
        <InputValue label="σⅣ" defaultValue={-903} unit="Mpa" display />
      </ContentGroup>
    </div>
  );
};

export default ButterflySpring;
