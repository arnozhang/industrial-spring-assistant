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
import DisplayValue from "@/components/ValueItems/DisplayValue";
import InputValue from "@/components/ValueItems/InputValue";
import ContentGroup from "@/components/ContentGroup";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import ButterflySpringHelper from "./helper";
import ButterflySpringModel from "./model";


interface IProps {

  model: ButterflySpringModel;
}


/**
 * 蝶形弹簧
 */
const ButterflySpring = (props: IProps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0, undefined);
  const { model } = props;

  model.onValueRefreshed = forceUpdate;

  return (
    <div>
      <div className="flex-row">
        <Tips tips="仅考虑 t<=6 时，无支撑面的碟簧!" />

        <Button onClick={clickShowHelperDialog(ButterflySpringHelper)}>
          帮助信息
        </Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="弹性模量" value={model.elasticModulus} unit="Mpa" />
        <InputValue label="屈服极限" value={model.yieldLimit} unit="Mpa" />

        <InputValue label="泊松比" value={model.poissonRatio} />
      </ContentGroup>

      <ContentGroup label="碟簧参数">
        <InputValue label="外径" value={model.outsideDiameter} unit="mm" />
        <InputValue label="内径" value={model.innerDiameter} unit="mm" />
        <InputValue label="厚度" value={model.thickness} unit="mm" />
        <InputValue label="高度" value={model.height} unit="mm" />
      </ContentGroup>

      <ContentGroup label="碟簧特性">
        <DisplayValue label="旋绕比" value={model.spinRatio} />
        <DisplayValue label="h0/t" value={model.h0DivT} />
        <DisplayValue label="全变形量" value={model.fullDeformationAmount} />
      </ContentGroup>

      <ContentGroup label="系数计算">
        <DisplayValue label="K1" value={model.k1} />
        <DisplayValue label="K2" value={model.k2} />
        <DisplayValue label="K3" value={model.k3} />
      </ContentGroup>

      <ContentGroup label="载荷计算">
        <InputValue label="变形量" value={model.deformationAmount} />
        <DisplayValue label="载荷" value={model.loadValue} />
        <DisplayValue label="刚度" value={model.stiffness} />
      </ContentGroup>

      <ContentGroup label="各点应力">
        <DisplayValue label="σOM" value={model.oOM} unit="Mpa" />
        <DisplayValue label="σⅠ" value={model.oI} unit="Mpa" />
        <DisplayValue label="σⅡ" value={model.oII} unit="Mpa" />
        <DisplayValue label="σⅢ" value={model.oIII} unit="Mpa" />
        <DisplayValue label="σⅣ" value={model.oIV} unit="Mpa" />
      </ContentGroup>
    </div>
  );
};

export default () => {
  return <ButterflySpring model={new ButterflySpringModel()} />;
};
