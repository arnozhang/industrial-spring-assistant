/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { ReactElement, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from 'antd';


interface IProps {
  title?: string;
  content: ReactElement;
  afterClose: () => void;
}

const HelperDialog = (props: IProps) => {
  const { title, afterClose } = props;
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      title={title || '帮助信息'}
      width="40%"
      okText="OK"
      style={{ minWidth: 720 }}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      destroyOnClose
      afterClose={afterClose}
    >
      {props.content}
    </Modal>
  );
};


export function showHelperDialog(element: ReactElement) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(
    <HelperDialog
      content={element}
      afterClose={() => div.parentNode?.removeChild(div)}
    />,
    div);
}


declare type FunctionConstructor = () => ReactElement;

export function clickShowHelperDialog(
  componentClass: React.ComponentClass | FunctionConstructor): () => void {

  return () => {
    showHelperDialog(React.createElement(componentClass));
  };
}
