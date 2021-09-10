import React, { useEffect, useState } from 'react';

import './Newtab.less';
import NavBar from './components/navbar';
import SearchPanel from './components/searchPanel';
import MainLeft from './components/main/left/MainLeft';
import MainCenter from './components/main/center/MainCenter';
import MainRight from './components/main/right/MainRight';
import Game from './components/game';

import {setLocalStorageItem,getLocalStorageItem} from '@/common/utils/handleLocalStorage'

const Newtab = () => {

  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    let item = getLocalStorageItem('gameMode');
    if (item) {
      setShowGame(item);
    }
  }, []);

  return (
    <React.Fragment>
      <NavBar setShowGame={setShowGame}
              showGame={showGame} />
      {showGame || <SearchPanel />}
      <div className='rotateWrapper'>
        <div className={`mainArea ${showGame && 'showGame'}`}>
          {
            showGame ? <div className='gamePanel'>
              <Game />
            </div> : <div className='basic'>
              <div className='mainLeft'>
                <MainLeft />
              </div>
              <div className='mainCenter'>
                <MainCenter />
              </div>
              <div className='mainRight'>
                <MainRight />
              </div>
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default Newtab;
