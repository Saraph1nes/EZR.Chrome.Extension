import React, { useEffect, useState } from 'react';
import { getLocalStorageItem } from '@/common/utils/handleLocalStorage';
import { Layout } from 'antd';

import NavBar from './components/navbar';
import SearchPanel from './components/searchPanel';
import MainLeft from './components/main/left/MainLeft';
import MainCenter from './components/main/center/MainCenter';
import MainRight from './components/main/right/MainRight';

import './NewTab.less';

const { Header, Content } = Layout;
const Newtab = () => {

  const [showGame, setShowGame] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    let item = getLocalStorageItem('gameMode');
    if (item) {
      setShowGame(item);
    }
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <Header>
          <NavBar darkTheme={darkTheme}
                  setDarkTheme={setDarkTheme}
                  setShowGame={setShowGame}
                  showGame={showGame} />
        </Header>
        <Content>{showGame || <SearchPanel />}
          <div className='rotateWrapper'>
            <div className={`mainArea ${showGame && 'showGame'}`}>
              <div className='basic'>
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
            </div>
          </div>
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default Newtab;
