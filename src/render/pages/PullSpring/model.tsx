/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import BaseModel, { EnumValueType } from "@/common/baseModel";
import { calc } from "@/common/calc";

/**
 * 端部结构
 */
export const EndpointType: EnumValueType = {

  LI: {
    label: 'LI 型',
    value: 0,
  },
  LII: {
    label: 'LII 型',
    value: 1,
  },
  LIII: {
    label: 'LIII 型',
    value: 2,
  },
};

/**
 * 热处理
 */
export const HeatTreatmentType: EnumValueType = {

  None: {
    label: '不处理',
    value: 0,
  },
  Quenching: {
    label: '淬火',
    value: 1,
  },
};

/**
 * 载荷
 */
export const LoadValueType: EnumValueType = {

  I: {
    label: 'I 类载荷',
    value: 0,
  },
  II: {
    label: 'II 类载荷',
    value: 1,
  },
  III: {
    label: 'III 类载荷',
    value: 2,
  },
};


export default class PullSpringModel extends BaseModel {

  /**
   * 剪切模量
   */
  cutModulus = this.wrapValue(79000);

  /**
   * 许用弯曲应力
   */
  bendingStress = this.wrapValue(785);

  /**
   * 端部结构
   */
  endpointType = this.wrapValue(EndpointType.LI.value);

  /**
   * 热处理
   */
  heatTreatment = this.wrapValue(HeatTreatmentType.None.value);

  /**
   * 载荷
   */
  loadValue = this.wrapValue(LoadValueType.I.value);

  /**
   * 钢丝直径
   */
  wireDiameter = this.wrapValue(3.5);

  /**
   * 中经
   */
  middle = this.wrapValue(18);

  /**
   * 节距
   */
  pitch = this.wrapValue(3.5);

  /**
   * 环杯直径
   */
  ringCupDiameter = this.wrapValue(18);

  /**
   * 有效圈数
   */
  validLaps = this.wrapValue(18);

  /**
   * 最小行程
   */
  minTravel = this.wrapValue(5.03);

  /**
   * 最大行程
   */
  maxTravel = this.wrapValue(16.37);

  /**
   * 间距
   */
  get spacing() {
    return calc.round(this.pitch.value - this.wireDiameter.value, 1);
  }

  /**
   * 自由长度
   */
  get freeLength() {
    if (this.endpointType.value === EndpointType.LI.value) {
      return (this.validLaps.value + 1) * this.wireDiameter.value + this.ringCupDiameter.value;

    } else if (this.endpointType.value === EndpointType.LII.value) {
      return (this.validLaps.value + 1) * this.wireDiameter.value + 2 * this.ringCupDiameter.value

    } else {
      return (this.validLaps.value + 1.5) * this.wireDiameter.value + 2 * this.ringCupDiameter.value;
    }
  }

  /**
   * 螺旋角
   */
  get spiralAngle() {
    return Math.abs(calc.round((Math.atan(
      this.pitch.value / (3.14 * this.middle.value)) * 180 / 3.14), 2));
  }

  /**
   * 展开长度
   */
  get expandLength() {
    if (this.endpointType.value === EndpointType.LI.value) {
      return calc.round(calc.SMALL_PI * this.validLaps.value * this.middle.value
        + calc.SMALL_PI * this.ringCupDiameter.value * 0.75, 2);

    } else {
      return calc.round(calc.SMALL_PI * this.validLaps.value * this.middle.value
        + 2 * calc.SMALL_PI * this.ringCupDiameter.value * 0.75, 2);
    }
  }

  /**
   * 旋绕比
   */
  get spinRatio() {
    return calc.round(this.middle.value / this.wireDiameter.value, 2);
  }

  /**
   * 曲度系数
   */
  get curvature() {
    return calc.round((4 * this.spinRatio - 1)
      / (4 * this.spinRatio - 4) + 0.615 / this.spinRatio, 3);
  }

  /**
   * 刚度
   */
  get stiffness() {
    return calc.round(this.cutModulus.value * this.middle.value
      / (8 * calc.pow(this.spinRatio, 4) * this.validLaps.value), 2);
  }

  /**
   * 初拉力
   */
  get initialTension() {
    if (this.heatTreatment.value === HeatTreatmentType.Quenching.value && this.spacing === 0) {
      return 0;

    } else {
      return calc.round(calc.SMALL_PI * calc.pow(this.wireDiameter.value, 3)
        * 600 / (8 * this.middle.value * this.spinRatio), 2);
    }
  }

  /**
   * 最小拉力
   */
  get minTension() {
    return calc.round(this.cutModulus.value * this.middle.value * this.minTravel.value
      / (8 * this.validLaps.value * calc.pow(this.spinRatio, 4)) + this.initialTension, 2);
  }

  /**
   * 最大拉力
   */
  get maxTension() {
    return calc.round(this.cutModulus.value * this.middle.value * this.maxTravel.value
      / (8 * this.validLaps.value * calc.pow(this.spinRatio, 4)) + this.initialTension, 2);
  }

  /**
   * 需求极限载荷
   */
  get demandLimitLoad() {
    if (this.loadValue.value === LoadValueType.I.value) {
      return calc.round(1.5 * this.maxTension, 2);

    } else if (this.loadValue.value === LoadValueType.II.value) {
      return calc.round(1.25 * this.maxTension, 2);

    } else {
      return calc.round(this.maxTension, 2);
    }
  }

  /**
   * 其行程
   */
  get travel() {
    return calc.round((this.demandLimitLoad - this.initialTension) / this.stiffness, 2);
  }

  /**
   * 实际极限行程
   */
  get actualLimitTravel() {
    return calc.round((this.initialTension / this.stiffness + this.maxTravel.value) * 1.25, 2);
  }

  /**
   * 实际极限载荷
   */
  get actualLimitLoad() {
    return calc.round(this.cutModulus.value * this.middle.value * this.actualLimitTravel
      / (8 * this.validLaps.value * calc.pow(this.spinRatio, 4)) + this.initialTension, 2);
  }

  /**
   * 极限载荷是否正常
   */
  get isActualLimitLoadValid() {
    return this.actualLimitLoad * 0.8 > this.demandLimitLoad;
  }
}
