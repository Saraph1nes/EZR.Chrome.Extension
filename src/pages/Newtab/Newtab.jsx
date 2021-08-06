import React from 'react';

import './Newtab.less';
import NavBar from './components/navbar';
import SearchPanel from './components/searchPanel';
import MainLeft from './components/main/left/MainLeft';
import MainCenter from './components/main/center/MainCenter';

const Newtab = () => {
  return (
    <React.Fragment>
      <NavBar />
      <SearchPanel />
      <div className='mainArea'>
        <div className='mainLeft'>
          <MainLeft />
        </div>
        <div className='mainCenter'>
          <MainCenter />
        </div>
        {/*<div className='mainRight'>待开发</div>*/}
      </div>
    </React.Fragment>
  );
};

export default Newtab;
