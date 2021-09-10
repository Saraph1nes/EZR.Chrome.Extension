import { getBoardX, getBoardY, isMouseOver } from './utils';
import { drawPieces } from './draw';

/**
 * 禁用右键菜单
 */
export function onContextmenu() {
  const canvas = document.getElementById('gameCanvas');
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

/**
 * hover改变piece属性
 * @param piece
 */
export function onMouseHoverPieces(piece) {
  const canvas = document.getElementById('gameCanvas');
  canvas.addEventListener('mousemove', (e) => {
    let mouseX = e.offsetX - getBoardX();
    let mouseY = e.offsetY - getBoardY();
    if (isMouseOver(mouseX, mouseY, piece)){
      piece.hoverPiece = 1;
    }else {
      piece.hoverPiece = 0;
    }
  });
}

/**
 * 鼠标左键往下
 * @param piece
 */
export function onMouseClickPiecesDown(piece) {
  const canvas = document.getElementById('gameCanvas');
  canvas.addEventListener('mousedown', (e) => {
    let mouseX = e.offsetX - getBoardX();
    let mouseY = e.offsetY - getBoardY();
    console.log(mouseX,mouseY);
  });
}
