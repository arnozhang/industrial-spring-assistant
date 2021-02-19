/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ReactFCProps } from "@/common/renderDeclares";


interface IProps extends ReactFCProps {

  tips: string;
}

const Tips = (props: IProps) => {
  return (
    <div className="flex-row" style={{ marginRight: 30 }}>
      <InfoCircleOutlined />

      <span style={{ marginLeft: 5 }}>
        {props.tips}
      </span>
    </div>
  );
};

export default Tips;
