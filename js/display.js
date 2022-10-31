import { EMPTY, BOARD_ROWS, BOARD_COLS, LINE_BREAK, IS_CONSOLE } from "./config.js";

export const buildBoard = () => {
  let boardArray = [];
  for (let i = 0; i < BOARD_ROWS; i++) {
    boardArray[i] = [];
    for (let j = 0; j < BOARD_COLS; j++) {
      boardArray[i][j] = EMPTY;
    }
  }
  return boardArray;
};

export const printBoard = board => {
  if (IS_CONSOLE) {
    let output = LINE_BREAK;
    let divider = "";
    let squares = "";
    let colLabels = "";
    for (let i = 0; i < BOARD_ROWS; i++) {
      for (let j = 0; j < BOARD_COLS; j++) {
        divider += "+---";
        squares += `| ${board[i][j]} `;
        if (j === BOARD_COLS - 1) {
          divider += "+";
          squares += "|";
        }
      }
      output += ` ${divider}${LINE_BREAK} ${squares}${LINE_BREAK}`;
      divider = squares = "";
    }
    for (let j = 0; j < BOARD_COLS; j++) {
      divider += "+---";
      colLabels += j > 9 ? `  ${j + 1}` : `   ${j + 1}`;
    }
    output += ` ${divider}+${LINE_BREAK}${colLabels}${LINE_BREAK}`;
    console.clear();
    console.log(output);
  } else {
    let output = LINE_BREAK;
    let line = "";
    for (let i = 0; i < BOARD_ROWS; i++) {
      for (let j = 0; j < BOARD_COLS; j++) {
        line += `<div class="board-square col${j}">${board[i][j]}</div>`
      }
      output += `${line}${LINE_BREAK}`;
      line = "";
    }
    document.getElementById("game").innerHTML = output;
  }
};

export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const dropChip = async (board, col, currentPlayer) => {
  let speed = 120;
  for (let i = 0; i < BOARD_ROWS; i++) {
    if (board[i][col] === EMPTY) {
      board[i][col] = currentPlayer;
      if (i > 0) {
        board[i - 1][col] = EMPTY;
      }
      printBoard(board);
      speed = Math.round(speed * 0.8);
      await sleep(speed);
      if (i < BOARD_ROWS - 1 && board[i + 1][col] !== EMPTY) {
        break;
      }
    }
  }
};
