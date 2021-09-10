import { BOARD, COLS, FONT_SIZE, GRID_SIZE, PIECES, ROWS } from './constant';
import { getBoardX, getBoardY, resizeCanvasArea } from './utils';
import moment from 'moment';
import { onMouseClickPiecesDown, onMouseHoverPieces } from './inputEvent';

/**
 * 绘制日历拼图块
 */
export function drawCalendarPieces() {
  let arrangePiece = arrangePieces();
  arrangePiece.forEach((piece, index) => {
    onMouseHoverPieces(piece);
    drawPieces(piece);
  });
}

/**
 * 绘制日历底板
 */
export function drawCalendarBoard() {
  for (let yi = 0; yi < ROWS; ++yi) {
    for (let xi = 0, cols = BOARD[yi].length; xi < cols; ++xi) {
      drawRect('rgb(242,242,242)', xi * GRID_SIZE + getBoardX(), yi * GRID_SIZE + getBoardY(), GRID_SIZE);
      drawText(BOARD[yi][xi], '#000000', FONT_SIZE, xi * GRID_SIZE + GRID_SIZE / 2 + getBoardX(), getBoardY() + (yi + 1) * GRID_SIZE - GRID_SIZE / 2, GRID_SIZE);
    }
  }
}

/**
 * 绘制文字
 * @param textContent 文本内容
 * @param textColor 文本颜色
 * @param textSize 文本大小
 * @param xOffset x偏移量
 * @param yOffset y偏移量
 * @param GRID_SIZE 宽高
 */
export function drawText(textContent, textColor, textSize, xOffset, yOffset, GRID_SIZE) {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  if (boldTodayText(textContent)) {
    ctx.font = `bold ${textSize}px sans-serif`;
    ctx.fillStyle = textColor;
  } else {
    ctx.font = `${textSize}px sans-serif`;
    ctx.fillStyle = `${textColor}80`;
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(textContent, xOffset, yOffset);
}

/**
 * 绘制矩形
 * @param color 边框颜色
 * @param xOffset 偏移量X
 * @param yOffset 偏移量Y
 * @param GRID_SIZE 宽高
 */
export function drawRect(color, xOffset, yOffset, GRID_SIZE) {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(xOffset, yOffset, GRID_SIZE, GRID_SIZE);
}


/**
 * 加粗今天日期的文本
 */
function boldTodayText(text) {
  let MONTH = moment().format('MMM').toUpperCase();
  let DAY = moment().format('D');
  if (text === MONTH || text === DAY) return true;
  return false;
};

/**
 * 排列碎片
 */
function arrangePieces() {
  const pieces = PIECES.map(v => v);// 获取每个拼图对象
  const boardWidth = COLS * GRID_SIZE; //网格背板区域的宽
  const boardHeight = ROWS * GRID_SIZE; //网格背板区域的高
  let hl = 0;//左边的高之和
  let hr = 0;//右边的高之和
  const marginY = .5;
  pieces.forEach((piece, index) => {
    piece.gridWidth = piece.mask.reduce((max, row) => Math.max(max, row.length), 0); //当前画片的宽
    piece.gridHeight = piece.mask.length;//当前画片的高
    if (index < PIECES.length / 2) {
      piece.x = -GRID_SIZE - piece.gridWidth * GRID_SIZE;
      hl += piece.gridHeight + marginY;
    } else {
      piece.x = boardWidth + GRID_SIZE;
      hr += piece.gridHeight + marginY;
    }
  });
  hl -= marginY;
  hr -= marginY;
  const dyl = (boardHeight - hl * GRID_SIZE) / 2;
  const dyr = (boardHeight - hr * GRID_SIZE) / 2;
  let yl = 0;
  let yri = 0;
  pieces.forEach((piece, index) => {
    if (index < PIECES.length / 2) {
      piece.y = yl * GRID_SIZE + dyl;
      yl += piece.gridHeight + marginY;
    } else {
      piece.y = yri * GRID_SIZE + dyr;
      yri += piece.gridHeight + marginY;
    }
  });
  return pieces;
}

/**
 * 绘制画片
 */
export function drawPieces(piece) {
  piece.mask.forEach((maskY, yi) => {
    maskY.forEach((maskX, xi) => {
      if (maskX) {
        drawRect(piece.color[piece.hoverPiece || 0], piece.x + getBoardX() + xi * GRID_SIZE, piece.y + getBoardY() + yi * GRID_SIZE, GRID_SIZE);
      }
    });
  });
}
