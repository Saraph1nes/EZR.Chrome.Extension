import React from 'react';

import './Newtab.less';
import NavBar from './components/navbar';
import SearchPanel from './components/searchPanel';
import MainLeft from './components/main/left/MainLeft';


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
          4444
        </div>
        <div className='mainRight'>123123123</div>
      </div>
    </React.Fragment>
  );
};

export default Newtab;
