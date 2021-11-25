import React from 'react';
import { render } from 'react-dom';

import './index.css';
import './Newtab.less'

import Newtab from './Newtab';

render(<Newtab />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
