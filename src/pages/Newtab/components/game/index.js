import React, { useEffect } from 'react';

import './index.less';

import APuzzleADay from './APuzzleADay';

const Game = () => {

  useEffect(() => {
    APuzzleADay()
  }, []);

  return <div className='gameCanvasArea'>
    <canvas id='gameCanvas'>
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
  </div>;

};

export default Game;
