import { PLAYER1, PLAYER2, EMPTY, BOARD_ROWS, BOARD_COLS } from "./config";

export const isColumnFull = (board, col) => {
  if (board[0][col] !== EMPTY) {
    return true;
  }
  return false;
};

export const isBoardStateValid = board => {
  let PLAYER1Count = 0;
  let PLAYER2Count = 0;
  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      if (
        i < BOARD_ROWS - 1 &&
        board[i + 1][j] === EMPTY &&
        board[i][j] !== EMPTY
      ) {
        // Chips should not be floating above EMPTY squares!
        return false;
      }
      if (board[i][j] === PLAYER1) {
        PLAYER1Count++;
      }
      if (board[i][j] === PLAYER2) {
        PLAYER2Count++;
      }
    }
  }
  if (PLAYER1Count < PLAYER2Count || PLAYER1Count > PLAYER2Count + 1) {
    return false;
  }
  return true;
};

export const getCurrentPlayer = board => {
  let PLAYER1Count = 0;
  let PLAYER2Count = 0;
  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      let square = board[i][j];
      if (square === PLAYER1) {
        PLAYER1Count++;
      } else if (square === PLAYER2) {
        PLAYER2Count++;
      }
    }
  }
  return PLAYER1Count === PLAYER2Count ? PLAYER1 : PLAYER2;
};
