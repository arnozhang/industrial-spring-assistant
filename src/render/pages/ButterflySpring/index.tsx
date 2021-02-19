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
import { ButterflySpringModule } from "./module";


const ButterflySpring = () => {
  const module = new ButterflySpringModule();

  return (
    <div>
      <div className="flex-row">
        <Tips tips="仅考虑 t&lt;=6 时，无支撑面的碟簧!" />

        <Button onClick={clickShowHelperDialog(ButterflySpringHelper)}>帮助信息</Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="弹性模量" defaultValue={module.elasticModulus} unit="Mpa" />
        <InputValue label="屈服极限" defaultValue={module.yieldLimit} unit="Mpa" />

        <InputValue label="泊松比" defaultValue={module.poissonRatio} />
      </ContentGroup>

      <ContentGroup label="碟簧参数">
        <InputValue label="外径" defaultValue={module.outsideDiameter} unit="mm" />
        <InputValue label="内径" defaultValue={module.innerDiameter} unit="mm" />
        <InputValue label="厚度" defaultValue={module.thickness} unit="mm" />
        <InputValue label="高度" defaultValue={module.height} unit="mm" />
      </ContentGroup>

      <ContentGroup label="碟簧特性">
        <InputValue label="旋绕比" defaultValue={module.spinRatio} display />
        <InputValue label="h0/t" defaultValue={module.h0DivT} display />
        <InputValue label="全变形量" defaultValue={module.fullDeformationAmount} display />
      </ContentGroup>

      <ContentGroup label="系数计算">
        <InputValue label="K1" defaultValue={module.k1} display />
        <InputValue label="K2" defaultValue={module.k2} display />
        <InputValue label="K3" defaultValue={module.k3} display />
      </ContentGroup>

      <ContentGroup label="载荷计算">
        <InputValue label="变形量" defaultValue={module.deformationAmount} />
        <InputValue label="载荷" defaultValue={module.loadValue} display />
        <InputValue label="刚度" defaultValue={module.stiffness} display />
      </ContentGroup>

      <ContentGroup label="各点应力">
        <InputValue label="σOM" defaultValue={module.oOM} unit="Mpa" display />
        <InputValue label="σⅠ" defaultValue={module.oI} unit="Mpa" display />
        <InputValue label="σⅡ" defaultValue={module.oII} unit="Mpa" display />
        <InputValue label="σⅢ" defaultValue={module.oIII} unit="Mpa" display />
        <InputValue label="σⅣ" defaultValue={module.oIV} unit="Mpa" display />
      </ContentGroup>
    </div>
  );
};

export default ButterflySpring;
