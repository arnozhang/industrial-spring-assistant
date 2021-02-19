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
import SelectValue from "@/components/SelectValue";
import ContentGroup from "@/components/ContentGroup";
import { clickShowHelperDialog } from "@/components/HelperDialog";
import PullSpringModel, { EndpointType, HeatTreatmentType, LoadValueType } from "./model";
import PullSpringHelper from "./helper";
import styles from './index.less';


const module = new PullSpringModel();

/**
 * 拉簧
 */
const PullSpring = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  module.onValueRefreshed = forceUpdate;

  return (
    <div>
      <div className="flex-row">
        <Tips tips="拉簧模型" />

        <Button onClick={clickShowHelperDialog(PullSpringHelper)}>
          帮助信息
        </Button>
      </div>

      <ContentGroup label="材料参数">
        <InputValue label="剪切模量" value={module.cutModulus} unit="Mpa" />
        <InputValue label="许用弯曲应力" value={module.bendingStress} unit="Mpa" />
      </ContentGroup>

      <ContentGroup label="处理参数">
        <SelectValue label="端部结构" options={EndpointType} value={module.endpointType} />
        <SelectValue label="热处理" options={HeatTreatmentType} value={module.heatTreatment} />
        <SelectValue label="载荷" options={LoadValueType} value={module.loadValue} />
      </ContentGroup>

      <ContentGroup label="预设参数">
        <InputValue label="钢丝直径" value={module.wireDiameter} unit="mm" />
        <InputValue label="中经" value={module.middle} unit="mm" />
        <InputValue label="节距" value={module.pitch} unit="mm" />
        <InputValue label="环杯直径" value={module.ringCupDiameter} unit="mm" />
        <InputValue label="有效圈数" value={module.validLaps} unit="mm" />
        <InputValue label="最小行程" value={module.minTravel} unit="mm" />
        <InputValue label="最大行程" value={module.maxTravel} unit="mm" />
      </ContentGroup>

      <ContentGroup label="拉簧参数">
        <InputValue label="间距δ" value={module.spacing} unit="mm" display />
        <InputValue label="自由长度" value={module.freeLength} unit="mm" display />
        <InputValue label="螺旋角" value={module.spiralAngle} unit="°" display />
        <InputValue label="展开长度" value={module.expandLength} unit="mm" display />
      </ContentGroup>

      <ContentGroup label="拉簧特性">
        <InputValue label="旋绕比" value={module.spinRatio} display />
        <InputValue label="曲度系数" value={module.curvature} display />
        <InputValue label="刚度" value={module.stiffness} display />
      </ContentGroup>

      <ContentGroup label="工作特性">
        <InputValue label="初拉力" value={module.initialTension} unit="N" display />
        <InputValue label="最小拉力" value={module.minTension} unit="N" display />
        <InputValue label="最大拉力" value={module.maxTension} unit="N" display />

        <InputValue label="需求极限载荷" value={module.demandLimitLoad} display />
        <InputValue label="其行程" value={module.travel} unit="mm" display />
      </ContentGroup>

      <ContentGroup label="特性验算">
        <InputValue label="实际极限行程" value={module.actualLimitTravel} display />
        <InputValue
          label="实际极限载荷"
          value={module.actualLimitLoad}
          display
          extra={module.isActualLimitLoadValid ? (
            <span className={styles.validExtra}>正常</span>
          ) : (
            <span className={styles.invalidExtra}>警告</span>
          )}
        />
      </ContentGroup>
    </div>
  );
};

export default PullSpring;
