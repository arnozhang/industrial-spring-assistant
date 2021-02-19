/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */
import { calc } from "@/common/calc";

export class ButterflySpringModule {

  /**
   * 弹性模量
   */
  elasticModulus = 206000;

  /**
   * 屈服极限
   */
  yieldLimit = 1400;

  /**
   * 泊松比
   */
  poissonRatio = 0.1;

  /**
   * 外径
   */
  outsideDiameter = 40;

  /**
   * 内径
   */
  innerDiameter = 20.4;

  /**
   * 厚度
   */
  thickness = 2.25;

  /**
   * 高度
   */
  height = 3.15;

  /**
   * 旋绕比
   */
  get spinRatio() {
    return calc.round(this.outsideDiameter / this.innerDiameter, 3);
  }

  /**
   * h0/t
   */
  get h0DivT() {
    return calc.round(this.fullDeformationAmount / this.thickness, 2);
  }

  /**
   * 全变形量
   */
  get fullDeformationAmount() {
    return calc.round(this.height - this.thickness, 1);
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
    return calc.round(4 * this.elasticModulus * calc.pow(this.thickness, 4) * this.deformationAmount
      * ((this.fullDeformationAmount / this.thickness - this.deformationAmount / this.thickness)
        * (this.fullDeformationAmount / this.thickness - this.deformationAmount / (2 * this.thickness)) + 1)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)) / this.thickness, 1);
  }

  /**
   * 刚度
   */
  get stiffness() {
    return calc.round(4 * this.elasticModulus * calc.pow(this.thickness, 3)
      * (calc.pow2(this.fullDeformationAmount / this.thickness) - 3 * (this.fullDeformationAmount / this.thickness)
        * this.deformationAmount / this.thickness + 1.5 * calc.pow2(this.deformationAmount / this.thickness) + 1)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)), 0);
  }

  /**
   * σOM
   */
  get oOM() {
    return calc.round(-12 * this.elasticModulus * calc.pow2(this.thickness)
      * this.deformationAmount / (1 - calc.pow2(this.poissonRatio))
      / (this.k1 * calc.pow2(this.outsideDiameter)) / this.thickness / calc.PI, 0);
  }

  /**
   *  σⅠ
   */
  get oI() {
    return calc.round(-4 * this.elasticModulus * calc.pow2(this.thickness) * this.deformationAmount
      * (this.k2 * (this.fullDeformationAmount / this.thickness - this.deformationAmount / (2 * this.thickness)) + this.k3)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)) / this.thickness, 0);
  }

  /**
   *  σⅡ
   */
  get oII() {
    return calc.round(-4 * this.elasticModulus * calc.pow2(this.thickness) * this.deformationAmount
      * (this.k2 * (this.fullDeformationAmount / this.thickness - this.deformationAmount / (2 * this.thickness)) - this.k3)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)) / this.thickness, 0);
  }

  /**
   *  σⅢ
   */
  get oIII() {
    return calc.round(-4 * this.elasticModulus * calc.pow2(this.thickness) * this.deformationAmount
      * ((this.k2 - 2 * this.k3) * (this.fullDeformationAmount / this.thickness - this.deformationAmount / (2 * this.thickness)) - this.k3)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)) / this.spinRatio / this.thickness, 0);
  }

  /**
   * σⅣ
   */
  get oIV() {
    return calc.round(-4 * this.elasticModulus * calc.pow2(this.thickness) * this.deformationAmount
      * ((this.k2 - 2 * this.k3) * (this.fullDeformationAmount / this.thickness - this.deformationAmount / (2 * this.thickness)) + this.k3)
      / (1 - calc.pow2(this.poissonRatio)) / (this.k1 * calc.pow2(this.outsideDiameter)) / this.spinRatio / this.thickness, 0);
  }
}
