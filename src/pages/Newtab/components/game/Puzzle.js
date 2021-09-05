import React, { Component } from 'react';

import { BOARD, COLS, FONT_SIZE, GRID_SIZE, MONTHS, PIECES, ROWS } from './constant';

const c = document.getElementById('gameCanvas');

const ctx = c.getContext('2d');

for (let i=0;i<6;i++){
  for (let j=0;j<6;j++){
    ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
      Math.floor(255-42.5*j) + ',0)';
    ctx.fillRect(j*25,i*25,25,25);
  }
}
