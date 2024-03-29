/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { CSSProperties, PropsWithChildren } from 'react';
import * as ReactDOM from 'react-dom';


export interface IProps {

  [key: string]: any;

  style?: CSSProperties;
  className?: string;
  children?: any;
}

export declare type ReactFC = React.FC<IProps>;

export declare type ReactFCT<T extends IProps> = React.FC<T>;

export declare type ReactFCProps = PropsWithChildren<IProps>;

export declare type ReactFCPropsT<T extends IProps> = PropsWithChildren<T>;


export function renderToHtml<T extends Element>(element: any): T {
  return ReactDOM.render(
    element, document.getElementById('reactContainer'));
}


export interface ValueWrapper<T extends any> {

  value: T;

  setValue(newValue: T): void;
}

export declare type NumberValueWrapper = ValueWrapper<number>;
