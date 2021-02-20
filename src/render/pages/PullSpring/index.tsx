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
import SelectValue from "@/components/ValueItems/SelectValue";
import ContentGroup from "@/components/ContentGroup";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import PullSpringModel, { EndpointType, HeatTreatmentType, LoadValueType } from "./model";
import PullSpringHelper from "./helper";
import styles from './index.less';


interface IProps {
  model: PullSpringModel;
}


/**
 * 拉簧
 */
const PullSpring = (props: IProps) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0, undefined);
  const { model } = props;

  model.onValueRefreshed = forceUpdate;

  return (
    <div>
      <div className="flex-row">
        <Tips tips="拉簧模型" />

        <Button onClick={clickShowHelperDialog(PullSpringHelper)}>
          帮助信息
        </Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="剪切模量" value={model.cutModulus} unit="Mpa" />
        <InputValue label="许用弯曲应力" value={model.bendingStress} unit="Mpa" />
      </ContentGroup>

      <ContentGroup label="处理参数">
        <SelectValue label="端部结构" options={EndpointType} value={model.endpointType} />
        <SelectValue label="热处理" options={HeatTreatmentType} value={model.heatTreatment} />
        <SelectValue label="载荷" options={LoadValueType} value={model.loadValue} />
      </ContentGroup>

      <ContentGroup label="预设参数">
        <InputValue label="钢丝直径" value={model.wireDiameter} unit="mm" />
        <InputValue label="中经" value={model.middle} unit="mm" />
        <InputValue label="节距" value={model.pitch} unit="mm" />
        <InputValue label="环杯直径" value={model.ringCupDiameter} unit="mm" />
        <InputValue label="有效圈数" value={model.validLaps} unit="mm" />
        <InputValue label="最小行程" value={model.minTravel} unit="mm" />
        <InputValue label="最大行程" value={model.maxTravel} unit="mm" />
      </ContentGroup>

      <ContentGroup label="拉簧参数">
        <DisplayValue label="间距δ" value={model.spacing} unit="mm" />
        <DisplayValue label="自由长度" value={model.freeLength} unit="mm" />
        <DisplayValue label="螺旋角" value={model.spiralAngle} unit="°" />
        <DisplayValue label="展开长度" value={model.expandLength} unit="mm" />
      </ContentGroup>

      <ContentGroup label="拉簧特性">
        <DisplayValue label="旋绕比" value={model.spinRatio} />
        <DisplayValue label="曲度系数" value={model.curvature} />
        <DisplayValue label="刚度" value={model.stiffness} />
      </ContentGroup>

      <ContentGroup label="工作特性">
        <DisplayValue label="初拉力" value={model.initialTension} unit="N" />
        <DisplayValue label="最小拉力" value={model.minTension} unit="N" />
        <DisplayValue label="最大拉力" value={model.maxTension} unit="N" />

        <DisplayValue label="需求极限载荷" value={model.demandLimitLoad} />
        <DisplayValue label="其行程" value={model.travel} unit="mm" />
      </ContentGroup>

      <ContentGroup label="特性验算">
        <DisplayValue label="实际极限行程" value={model.actualLimitTravel} />
        <DisplayValue
          label="实际极限载荷"
          value={model.actualLimitLoad}
          extra={model.isActualLimitLoadValid ? (
            <span className={styles.validExtra}>正常</span>
          ) : (
            <span className={styles.invalidExtra}>警告</span>
          )}
        />
      </ContentGroup>
    </div>
  );
};

export default () => {
  return <PullSpring model={new PullSpringModel()} />;
};

