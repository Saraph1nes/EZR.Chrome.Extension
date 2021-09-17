import React from 'react';

import './MainRight.less';
import Weather from './components/weather';

const MainRight = () => {

  return (
    <React.Fragment>
      <div className='MainRight'>
        <Weather />
      </div>
    </React.Fragment>
  );
};

export default MainRight;
