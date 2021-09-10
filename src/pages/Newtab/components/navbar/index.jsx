import React from 'react';
import './index.less';
import { Switch } from 'antd';

import { setLocalStorageItem, getLocalStorageItem } from '@/common/utils/handleLocalStorage';

const Navbar = (props) => {

  const { setShowGame, showGame } = props;

  const handleSwitchChange = (e) => {
    setShowGame(e);
    setLocalStorageItem('gameMode', e);
  };

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
             href='https://help.ezrpro.com/admin/'
             rel='noreferrer'>帮助中心</a>
        </div>
      </div>
      {/*<div className='showGameBtn'>*/}
      {/*  <Switch checkedChildren='游戏模式'*/}
      {/*          unCheckedChildren='操作面板'*/}
      {/*          checked={showGame}*/}
      {/*          onChange={handleSwitchChange} />*/}
      {/*</div>*/}
    </div>);
};

export default Navbar;
