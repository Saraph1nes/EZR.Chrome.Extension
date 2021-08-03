import React from 'react';

import './Newtab.less';
import NavBar from './components/navbar';
import SearchPanel from './components/searchPanel';


const Newtab = () => {
  return (
    <React.Fragment>
      <NavBar />
      <SearchPanel />
    </React.Fragment>
  );
};

export default Newtab;
