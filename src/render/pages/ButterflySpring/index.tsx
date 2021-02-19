/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { useReducer } from 'react';
import { Button } from "antd";
import Tips from "@/components/Tips";
import InputValue from "@/components/InputValue";
import ContentGroup from "@/components/ContentGroup";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import ButterflySpringHelper from "./helper";
import ButterflySpringModel from "./model";


const module = new ButterflySpringModel();

const ButterflySpring = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  module.onValueRefreshed = forceUpdate;

  return (
    <div>
      <div className="flex-row">
        <Tips tips="仅考虑 t<=6 时，无支撑面的碟簧!" />

        <Button onClick={clickShowHelperDialog(ButterflySpringHelper)}>
          帮助信息
        </Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="弹性模量" value={module.elasticModulus} unit="Mpa" />
        <InputValue label="屈服极限" value={module.yieldLimit} unit="Mpa" />

        <InputValue label="泊松比" value={module.poissonRatio} />
      </ContentGroup>

      <ContentGroup label="碟簧参数">
        <InputValue label="外径" value={module.outsideDiameter} unit="mm" />
        <InputValue label="内径" value={module.innerDiameter} unit="mm" />
        <InputValue label="厚度" value={module.thickness} unit="mm" />
        <InputValue label="高度" value={module.height} unit="mm" />
      </ContentGroup>

      <ContentGroup label="碟簧特性">
        <InputValue label="旋绕比" value={module.spinRatio} display />
        <InputValue label="h0/t" value={module.h0DivT} display />
        <InputValue label="全变形量" value={module.fullDeformationAmount} display />
      </ContentGroup>

      <ContentGroup label="系数计算">
        <InputValue label="K1" value={module.k1} display />
        <InputValue label="K2" value={module.k2} display />
        <InputValue label="K3" value={module.k3} display />
      </ContentGroup>

      <ContentGroup label="载荷计算">
        <InputValue label="变形量" value={module.deformationAmount} />
        <InputValue label="载荷" value={module.loadValue} display />
        <InputValue label="刚度" value={module.stiffness} display />
      </ContentGroup>

      <ContentGroup label="各点应力">
        <InputValue label="σOM" value={module.oOM} unit="Mpa" display />
        <InputValue label="σⅠ" value={module.oI} unit="Mpa" display />
        <InputValue label="σⅡ" value={module.oII} unit="Mpa" display />
        <InputValue label="σⅢ" value={module.oIII} unit="Mpa" display />
        <InputValue label="σⅣ" value={module.oIV} unit="Mpa" display />
      </ContentGroup>
    </div>
  );
};

export default ButterflySpring;
