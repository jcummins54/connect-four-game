import {
  PLAYER1,
  PLAYER2,
  EMPTY,
  BOARD_ROWS,
  BOARD_COLS,
  WINCOUNT,
} from "./config";

import { getCurrentPlayer } from "./boardState";

export const getLegalMoves = board => {
  let moves = [];
  let square;
  let squareBelow;
  colLoop: for (let x = 0; x < BOARD_COLS; x++) {
    for (let y = BOARD_ROWS - 1; y >= 0; y--) {
      square = board[y][x];
      if (y === BOARD_ROWS - 1) {
        if (square === EMPTY) {
          moves.push({ x, y });
          // We're done searching this column, skip to the next one.
          continue colLoop;
        }
      } else {
        squareBelow = board[y + 1][x];
        if (square === EMPTY && squareBelow !== EMPTY) {
          moves.push({ x, y });
          // We're done searching this column, skip to the next one.
          continue colLoop;
        }
      }
    }
  }
  return moves;
};

export const sortDescending = (a, b) => {
  return a > b ? -1 : b > a ? 1 : 0;
};

export const getMoveValues = board => {
  const legalMoves = getLegalMoves(board);
  const currentPlayer = getCurrentPlayer(board);
  let moveValues = [];

  for (let i = 0; i < legalMoves.length; i++) {
    let move = legalMoves[i];
    let defenseValues = [];
    let attackValues = [];

    let rowVals = checkRow(board, currentPlayer, move.x, move.y);
    let colVals = checkCol(board, currentPlayer, move.x, move.y);
    let drVals = checkDiagDownRight(board, currentPlayer, move.x, move.y);
    let dlVals = checkDiagDownLeft(board, currentPlayer, move.x, move.y);

    defenseValues.push(rowVals.defenseValue);
    defenseValues.push(colVals.defenseValue);
    defenseValues.push(drVals.defenseValue);
    defenseValues.push(dlVals.defenseValue);

    attackValues.push(rowVals.attackValue);
    attackValues.push(colVals.attackValue);
    attackValues.push(drVals.attackValue);
    attackValues.push(dlVals.attackValue);

    let moveValue = {
      ...move,
      defenseValue: defenseValues.sort(sortDescending)[0],
      attackValue: attackValues.sort(sortDescending)[0],
    };
    moveValues.push(moveValue);
  }
  return moveValues;
};

export const evaluatePosition = (rowSquares, currentPlayer, x) => {
  const opponent = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
  const left = x - WINCOUNT < 0 ? 0 : x - WINCOUNT;

  let attackValue = 0;
  let defenseValue = 0;

  for (let i = left; i <= x; i++) {
    let av = 0;
    let dv = 0;
    let right =
      i + WINCOUNT > rowSquares.length ? rowSquares.length : i + WINCOUNT;
    let square;

    for (let j = i; j < right; j++) {
      square = rowSquares[j];
      if (square === currentPlayer) {
        av++;
        dv = 0;
      } else if (square === opponent) {
        dv++;
        av = 0;
      }
    }
    attackValue = av > attackValue ? av : attackValue;
    defenseValue = dv > defenseValue ? dv : defenseValue;
  }

  return { attackValue, defenseValue };
};

export const checkRow = (board, currentPlayer, x, y) => {
  let rowSquares = [];

  for (let i = 0; i < BOARD_COLS; i++) {
    rowSquares.push(board[y][i]);
  }

  return evaluatePosition(rowSquares, currentPlayer, x);
};

export const checkCol = (board, currentPlayer, x, y) => {
  let rowSquares = [];

  for (let i = 0; i < BOARD_ROWS; i++) {
    rowSquares.push(board[i][x]);
  }
  // setMessage(`checkCol x:${x} ${JSON.stringify(rowSquares)}`);

  return evaluatePosition(rowSquares, currentPlayer, y);
};

export const checkDiagDownRight = (board, currentPlayer, x, y) => {
  let rowSquares = [];
  let posX;
  let col = x > y ? x - y : 0;
  let row = x < y ? y - x : 0;

  while (col < BOARD_COLS && row < BOARD_ROWS) {
    if (col === x && row === y) {
      posX = col;
    }
    rowSquares.push(board[row][col]);
    col++;
    row++;
  }

  return evaluatePosition(rowSquares, currentPlayer, posX);
};

export const checkDiagDownLeft = (board, currentPlayer, x, y) => {
  const topOfDiagonal = y - BOARD_COLS + 1 + x;

  let rowSquares = [];
  let posX;
  let col = x > y ? x + y : BOARD_COLS - 1;
  let row = topOfDiagonal > 0 ? topOfDiagonal : 0;

  while (col >= 0 && row < BOARD_ROWS) {
    if (col === x && row === y) {
      posX = col;
    }
    rowSquares.push(board[row][col]);
    col--;
    row++;
  }

  return evaluatePosition(rowSquares, currentPlayer, posX);
};

export const sortMoveAttackValuesDescending = (a, b) => {
  return a.attackValue > b.attackValue
    ? -1
    : b.attackValue > a.attackValue
    ? 1
    : 0;
};

export const sortMoveDefenseValuesDescending = (a, b) => {
  return a.defenseValue > b.defenseValue
    ? -1
    : b.defenseValue > a.defenseValue
    ? 1
    : 0;
};

export const getComputerNextMove = board => {
  const moveValues = getMoveValues(board);
  const attackMoves = moveValues.slice().sort(sortMoveAttackValuesDescending);
  const defenseMoves = moveValues.slice().sort(sortMoveDefenseValuesDescending);
  const topAttackMove = attackMoves[0];
  const topDefenseMove = defenseMoves[0];

  // Computer wins!
  if (topAttackMove.attackValue === WINCOUNT - 1) {
    return topAttackMove.x;
  }

  // We have to block if next opponent move wins!
  if (topDefenseMove.defenseValue === WINCOUNT - 1) {
    return topDefenseMove.x;
  }

  const colMid = BOARD_COLS / 2;

  if (topAttackMove.attackValue > topDefenseMove.defenseValue) {
    const topAttackMoves = attackMoves
      .slice()
      .filter(move => move.attackValue === topAttackMove.attackValue);
    // Prefer the center of the board
    const centerAttack = topAttackMoves.reduce((a, b) =>
      Math.abs(b.x - colMid) < Math.abs(a.x - colMid) ? b : a
    );
    return centerAttack.x;
  }

  const topDefenseMoves = defenseMoves
    .slice()
    .filter(move => move.defenseValue === topDefenseMove.defenseValue);
  // Prefer the center of the board
  const centerDefense = topDefenseMoves.reduce((a, b) =>
    Math.abs(b.x - colMid) < Math.abs(a.x - colMid) ? b : a
  );
  return centerDefense.x;
};
