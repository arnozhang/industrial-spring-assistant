/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';


const PullSpringHelper = () => {
  return (
    <div className="flex-column">
      <div style={{
        backgroundColor: '#F0F2F5',
        borderRadius: 10,
        padding: '20px 20px 10px 20px',
      }}>
        <p>① LⅠ 型为单挂杯；LⅡ 型为双挂杯，且开口方向相反；LⅢ 亦为双挂杯，但开口方向相同；</p>
        <p>② 若无挂杯，则将环杯直径输入为 "0" 即可；</p>
        <p>③ 需求极限载荷表示：在该设计参数区间内对应的极限载荷至少要到达的值。</p>
      </div>

      <img
        style={{
          width: '100%',
          padding: '10px 40px',
        }}
        src="../images/pull-spring/desc.png"
        alt=""
      />

      <img
        style={{
          width: '70%',
          padding: '10px 40px',
          alignSelf: 'center',
        }}
        src="../images/pull-spring/diag.png"
        alt=""
      />

      <img
        style={{
          width: '100%',
          padding: '10px 40px',
          alignSelf: 'center',
        }}
        src="../images/pull-spring/table.png"
        alt=""
      />
    </div>
  );
};

export default PullSpringHelper;
