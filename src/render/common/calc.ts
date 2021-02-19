/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

export namespace calc {

  export const PI = 3.141592654;

  export function round(value: number, precision: number = 0) {
    return Math.round(`${+value}e${precision}` as any) / Math.pow(10, precision);
  }

  export function ln(value: number) {
    return Math.log(value);
  }

  export function pow(value: number, exponent: number) {
    return Math.pow(value, exponent);
  }

  export function pow2(value: number) {
    return Math.pow(value, 2);
  }
}
