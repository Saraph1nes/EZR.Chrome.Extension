export const GRID_SIZE = 42;
export const FONT_SIZE = 12;

export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const BOARD = [
  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
  ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  ['1', '2', '3', '4', '5', '6', '7'],
  ['8', '9', '10', '11', '12', '13', '14'],
  ['15', '16', '17', '18', '19', '20', '21'],
  ['22', '23', '24', '25', '26', '27', '28'],
  ['29', '30', '31']
];

export const PIECES = [
  {
    color: ['#77a1d350','#77a1d390'],
    mask: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0]
    ]
  },
  {
    color: ['#D87B6C50','#D87B6C90'],
    mask: [
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    color: ['#F0C7A950','#F0C7A990'],
    mask: [
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0]
    ]
  },
  {
    color: ['#A9A9F050','#A9A9F090'],
    mask: [
      [0, 0, 1, 1],
      [1, 1, 1, 0]
    ]
  },
  {
    color: ['#915D7450','#915D7490'],
    mask: [
      [1, 0],
      [1, 1],
      [1, 0],
      [1, 0]
    ]
  },
  {
    color: ['#E9F0A150','#E9F0A190'],
    mask: [
      [1, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ]
  },
  {
    color: ['#F5714A50','#F5714A90'],
    mask: [
      [1, 1, 0],
      [1, 1, 1]
    ]
  },
  {
    color: ['#FD467E50','#FD467E90'],
    mask: [
      [1, 1, 1],
      [1, 1, 1]
    ]
  }
];

export const ROWS = BOARD.length;
export const COLS = BOARD.reduce((max, row) => Math.max(max, row.length), 0);
