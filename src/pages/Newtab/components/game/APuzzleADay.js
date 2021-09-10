import React from 'react';
import { onContextmenu } from './inputEvent';
import { resizeCanvasArea } from './utils';
import { drawCalendarBoard, drawCalendarPieces } from './draw';

export default function APuzzleADay() {
  resizeCanvasArea(); // 调整画布
  drawCalendarBoard(); //绘制底板
  drawCalendarPieces(); //绘制日历拼图块
  onContextmenu(); // 禁用鼠标右键菜单
}
