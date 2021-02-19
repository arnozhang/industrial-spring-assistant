/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import { calc } from "@/common/calc";
import BaseModel from "@/common/baseModel";

export default class ButterflySpringModel extends BaseModel {

  /**
   * 弹性模量
   */
  elasticModulus = this.wrapValue(206000);

  /**
   * 屈服极限
   */
  yieldLimit = this.wrapValue(1400);

  /**
   * 泊松比
   */
  poissonRatio = this.wrapValue(0.1);

  /**
   * 外径
   */
  outsideDiameter = this.wrapValue(40);

  /**
   * 内径
   */
  innerDiameter = this.wrapValue(20.4);

  /**
   * 厚度
   */
  thickness = this.wrapValue(2.25);

  /**
   * 高度
   */
  height = this.wrapValue(3.15);

  /**
   * 旋绕比
   */
  get spinRatio() {
    return calc.round(this.outsideDiameter.value / this.innerDiameter.value, 3);
  }

  /**
   * h0/t
   */
  get h0DivT() {
    return calc.round(this.fullDeformationAmount / this.thickness.value, 2);
  }

  /**
   * 全变形量
   */
  get fullDeformationAmount() {
    return calc.round(this.height.value - this.thickness.value, 1);
  }


  get k1() {
    return calc.round(calc.pow2((this.spinRatio - 1) / this.spinRatio)
      / calc.PI / ((this.spinRatio + 1) / (this.spinRatio - 1) - 2 / calc.ln(this.spinRatio)), 3);
  }

  get k2() {
    return calc.round(6 * ((this.spinRatio - 1)
      / calc.ln(this.spinRatio) - 1) / calc.PI / calc.ln(this.spinRatio), 3);
  }

  get k3() {
    return calc.round(3 * (this.spinRatio - 1) / calc.PI / calc.ln(this.spinRatio), 3);
  }

  /**
   * 变形量
   */
  deformationAmount = 0.9;

  /**
   * 载荷
   */
  get loadValue() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(4 * this.elasticModulus.value * calc.pow(thickness, 4) * this.deformationAmount
      * ((this.fullDeformationAmount / thickness - this.deformationAmount / thickness)
        * (this.fullDeformationAmount / thickness - this.deformationAmount / (2 * thickness)) + 1)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)) / thickness, 1);
  }

  /**
   * 刚度
   */
  get stiffness() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(4 * this.elasticModulus.value * calc.pow(thickness, 3)
      * (calc.pow2(this.fullDeformationAmount / thickness) - 3 * (this.fullDeformationAmount / thickness)
        * this.deformationAmount / thickness + 1.5 * calc.pow2(this.deformationAmount / thickness) + 1)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)), 0);
  }

  /**
   * σOM
   */
  get oOM() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(-12 * this.elasticModulus.value * calc.pow2(thickness)
      * this.deformationAmount / (1 - calc.pow2(poissonRatio))
      / (this.k1 * calc.pow2(outsideDiameter)) / thickness / calc.PI, 0);
  }

  /**
   *  σⅠ
   */
  get oI() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(-4 * this.elasticModulus.value * calc.pow2(thickness) * this.deformationAmount
      * (this.k2 * (this.fullDeformationAmount / thickness - this.deformationAmount / (2 * thickness)) + this.k3)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)) / thickness, 0);
  }

  /**
   *  σⅡ
   */
  get oII() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(-4 * this.elasticModulus.value * calc.pow2(thickness) * this.deformationAmount
      * (this.k2 * (this.fullDeformationAmount / thickness - this.deformationAmount / (2 * thickness)) - this.k3)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)) / thickness, 0);
  }

  /**
   *  σⅢ
   */
  get oIII() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(-4 * this.elasticModulus.value * calc.pow2(thickness) * this.deformationAmount
      * ((this.k2 - 2 * this.k3) * (this.fullDeformationAmount / thickness - this.deformationAmount / (2 * thickness)) - this.k3)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)) / this.spinRatio / thickness, 0);
  }

  /**
   * σⅣ
   */
  get oIV() {
    const thickness = this.thickness.value;
    const poissonRatio = this.poissonRatio.value;
    const outsideDiameter = this.outsideDiameter.value;

    return calc.round(-4 * this.elasticModulus.value * calc.pow2(thickness) * this.deformationAmount
      * ((this.k2 - 2 * this.k3) * (this.fullDeformationAmount / thickness - this.deformationAmount / (2 * thickness)) + this.k3)
      / (1 - calc.pow2(poissonRatio)) / (this.k1 * calc.pow2(outsideDiameter)) / this.spinRatio / thickness, 0);
  }
}
