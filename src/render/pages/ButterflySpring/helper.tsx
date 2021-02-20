/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';


const ButterflySpringHelper = () => {
  return (
    <div className="flex-column">
      <div style={{
        backgroundColor: '#F0F2F5',
        borderRadius: 10,
        padding: '20px 20px 10px 20px',
      }}>
        <p>① 应力计算结果，正直为拉应力，负值为压应力。</p>
        <p>② 静载荷：σOM &lt;= σs；无支撑面的变载荷：结合上图找疲劳破坏点。</p>
        <p>③ 变载荷的安装，必须有预压变形：0.15h0 &lt;= f &lt;= 0.2h0</p>
        <p>④ 疲劳校核：略（见手册）</p>
      </div>

      <img
        style={{
          width: '100%',
          padding: '10px 40px',
        }}
        src="../images/butterfly-spring/position.png"
        alt=""
      />

      <img
        style={{
          width: '60%',
          padding: '10px 40px',
          alignSelf: 'center',
        }}
        src="../images/butterfly-spring/cd.png"
        alt=""
      />
    </div>
  );
};

export default ButterflySpringHelper;
