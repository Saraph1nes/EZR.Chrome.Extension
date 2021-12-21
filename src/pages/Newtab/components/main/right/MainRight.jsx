import React from 'react';

import './MainRight.less';
import Weather from './components/weather';
import CatImg from './components/catImg';

const MainRight = () => {

  return (
    <React.Fragment>
      <div className='MainRight'>
        <Weather />
        <CatImg />
      </div>
    </React.Fragment>
  );
};

export default MainRight;
