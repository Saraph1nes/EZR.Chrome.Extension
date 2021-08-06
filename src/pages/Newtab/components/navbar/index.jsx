import React from 'react';
import './index.less';

const Navbar = () => {

  return (<div className='navbar'>
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
         href='https://help.ezrpro.com/admin/'
         rel='noreferrer'>帮助中心</a>
    </div>
  </div>);
};

export default Navbar;
