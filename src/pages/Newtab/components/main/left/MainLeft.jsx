import React from 'react';
import { List, Select } from 'antd';

import './MainLeft.less';
import ezrToolsConfList from './ezr-tools-conf-front-end.json';

const { Option } = Select;

const MainLeft = () => {

  return (
    <div className='MainLeft'>
      <div className='title paddingDiv'>
        <span className='titleSpan'>EZR工具</span>
        <Select defaultValue='前端'>
          <Option value='qianduan'>前端</Option>
        </Select>
      </div>
      <List className='list'
            dataSource={ezrToolsConfList}
            renderItem={(item, index) => {
              return <li key={index}
                         className='item'>
                <a href={item.url}
                   target='_blank'
                   rel='noreferrer'>
                  <div className='itemContent'>
                    <img
                      title={item.remark}
                      className='itemImg'
                      src={item.img || 'https://assets-img.ezrpro.com/pc/img/order/icon-128.png'}
                      alt=''
                      width={40}
                      height={40} />
                    <span className='content'>{item.title}</span>
                    {item.desc && <span className='desc'>{item.desc}</span>}
                  </div>
                </a>
              </li>;
            }}
            footer={<div style={{height:'200px',textAlign:'center',color:'#a9a9a9',userSelect:"none"}}>———— 没有下文啦 ————</div>}
      />
    </div>
  );
};

export default MainLeft;
