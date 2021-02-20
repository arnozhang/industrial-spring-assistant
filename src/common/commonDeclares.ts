/**
 * industrial-spring-assistant
 *
 * @date 2021/02/18
 */

export type VoidFunction = () => void;
export type OneArgFunction = (data?: any) => void;
export type OneArgFunctionT<T> = (data: T) => void;


export enum SubPages {
  AboutPage = 'about',
}


export const appName_zh_CN = '工业弹簧速查助手';
