import React from 'react';
import { observer } from 'mobx-react';

import './index.less';

const Navbar = observer((props) => {

  return (
    <div className='navbar'>
      <div className='logoArea'>
        <img
          src='https://assets-img.ezrpro.com/pc/img/others/ui_helplogo.png'
          height='100%'
        />
        <div className='backgroundBanner'>
          <a className='title'
             target='_blank'
             href='https://account.ezrpro.com/Login/Index'
             rel='noreferrer'>EZRpro</a>
        </div>
        <div className='backgroundBanner'>
          <a className='title'
             target='_blank'
             href='https://union.ezrpro.com/#/homeNew'
             rel='noreferrer'>驿业平台</a>
        </div>
        <div className='backgroundBanner'>
          <a className='title'
             target='_blank'
             href='https://help.ezrpro.com/admin/'
             rel='noreferrer'>帮助中心</a>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
