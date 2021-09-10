import { COLS, GRID_SIZE, ROWS } from './constant';

/**
 * 渲染canvas宽高
 */
export function resizeCanvasArea() {
  const canvas = document.getElementById('gameCanvas');
  const parentWidth = canvas.offsetParent.clientWidth;
  const parentHeight = canvas.offsetParent.clientHeight;
  canvas.width = parentWidth;
  canvas.height = parentHeight;
}

/**
 * 网格背板区域的原点x坐标
 * @returns {number}
 */
export function getBoardX() {
  const canvas = document.getElementById('gameCanvas');
  const centerX = canvas.width / 2; //canvas x的中心点
  const boardWidth = COLS * GRID_SIZE; //网格背板区域的宽
  const boardX = centerX - boardWidth / 2; //网格背板区域的原点x坐标
  return boardX;
}

/**
 * 网格背板区域的原点x坐标
 * @returns {number}
 */
export function getBoardY() {
  const canvas = document.getElementById('gameCanvas');
  const centerY = canvas.height / 2; //canvas y的中心点
  const boardHeight = ROWS * GRID_SIZE; //网格背板区域的高
  const boardY = centerY - boardHeight / 2; //网格背板区域的原点y坐标
  return boardY;
}

/**
 * 监听鼠标放在piece上的事件
 * @param mouseX
 * @param mouseY
 */
export function isMouseOver(mouseX, mouseY, piece) {
  const topLeftX = piece.x;
  const topLeftY = piece.y;
  if (mouseX < topLeftX || mouseX > topLeftX + piece.gridWidth * GRID_SIZE
    || mouseY < topLeftY || mouseY > topLeftY + piece.gridHeight * GRID_SIZE
  ) {
    return false;
  }
  const mask = piece.mask;
  for (let yi = 0, rows = mask.length; yi < rows; ++yi) {
    const row = mask[yi];
    for (let xi = 0, cols = row.length; xi < cols; ++xi) {
      const val = row[xi];
      if (!val) {
        continue;
      }
      const gridTopLeftX = topLeftX + xi * GRID_SIZE;
      const gridTopLeftY = topLeftY + yi * GRID_SIZE;
      if (mouseX >= gridTopLeftX
        && mouseX <= gridTopLeftX + GRID_SIZE
        && mouseY >= gridTopLeftY
        && mouseY <= gridTopLeftY + GRID_SIZE) {
        return true;
      }
    }
  }
  return false;
}
