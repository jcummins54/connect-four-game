import {
  PLAYER1,
  PLAYER2,
  EMPTY,
  BOARD_ROWS,
  BOARD_COLS,
  WINCOUNT,
} from "./config.js";

import { getCurrentPlayer } from "./boardState.js";

export const getLegalMoves = (board) => {
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

export const getMoveValues = (board, currentPlayer) => {
  const legalMoves = getLegalMoves(board);
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
    if (i + WINCOUNT > rowSquares.length) {
      continue;
    }
    let av = 0;
    let dv = 0;
    let right = i + WINCOUNT;
    let square;
    let isLossPossible = true;

    for (let j = i; j < right; j++) {
      square = rowSquares[j];
      if (square === currentPlayer) {
        av++;
        dv = 0;
        isLossPossible = false;
      } else if (square === opponent) {
        av = 0;
        if (isLossPossible) {
          dv++;
        }
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

  posX = rowSquares.length - BOARD_COLS + posX;

  return evaluatePosition(rowSquares, currentPlayer, posX);
};

export const checkDiagDownLeft = (board, currentPlayer, x, y) => {
  const topOfDiagonal = y - BOARD_COLS + 1 + x;

  let rowSquares = [];
  let posX;
  let col = topOfDiagonal < 0 ? x + y : BOARD_COLS - 1;
  let row = topOfDiagonal > 0 ? topOfDiagonal : 0;

  while (col >= 0 && row < BOARD_ROWS) {
    if (col === x && row === y) {
      posX = col;
    }
    rowSquares.push(board[row][col]);
    col--;
    row++;
  }
  
  rowSquares.reverse();

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

export const getComputerNextMove = (board) => {
  const currentPlayer = getCurrentPlayer(board);
  const moveValues = getMoveValues(board, currentPlayer);

  let i;
  let j;
  let x;

  const futureMoves = future(board, currentPlayer);
  if (futureMoves.winning.length > 0) {
    for (i = 0; i < futureMoves.winning.length; i++) {
      x = futureMoves.winning[i];
      for (j = 0; j < moveValues.length; j++) {
        if (moveValues[j].x === x && moveValues[j].attackValue < WINCOUNT - 2) {
          moveValues[j].attackValue = WINCOUNT - 2;
        }
      }
    }
  }
  if (futureMoves.losing.length > 0) {
    for (i = 0; i < futureMoves.losing.length; i++) {
      x = futureMoves.losing[i];
      for (j = 0; j < moveValues.length; j++) {
        if (
          moveValues[j].x === x &&
          moveValues[j].defenseValue < WINCOUNT - 1
        ) {
          moveValues[j].defenseValue = 0;
          // Making this move will lose on next turn, so don't make it unless this move wins
          if (moveValues[j].attackValue < WINCOUNT - 1) {
            moveValues[j].attackValue = 0;
          }
        }
      }
    }
  }

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
      .filter((move) => move.attackValue === topAttackMove.attackValue);
    // Prefer the center of the board
    const centerAttack = topAttackMoves.reduce((a, b) =>
      Math.abs(b.x - colMid) < Math.abs(a.x - colMid) ? b : a
    );
    return centerAttack.x;
  }

  const topDefenseMoves = defenseMoves
    .slice()
    .filter((move) => move.defenseValue === topDefenseMove.defenseValue);
  // Prefer the center of the board
  const centerDefense = topDefenseMoves.reduce((a, b) =>
    Math.abs(b.x - colMid) < Math.abs(a.x - colMid) ? b : a
  );
  return centerDefense.x;
};

export const future = (board, currentPlayer) => {
  const legalMoves = getLegalMoves(board);
  const opponent = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;

  let losing = [];
  let winning = [];
  let newBoard;
  for (let i = 0; i < legalMoves.length; i++) {
    let move = legalMoves[i];
    newBoard = JSON.parse(JSON.stringify(board));
    newBoard[move.y][move.x] = currentPlayer;
    let moveValues = getMoveValues(newBoard, opponent);
    let attackMoves = moveValues.slice().sort(sortMoveAttackValuesDescending);
    let defenseMoves = moveValues.slice().sort(sortMoveDefenseValuesDescending);
    let topAttackMove = attackMoves[0];
    let topDefenseMove = defenseMoves[0];

    // Opponent wins!
    if (
      topAttackMove &&
      topAttackMove.attackValue === WINCOUNT - 1 &&
      losing.indexOf(move.x) === -1
    ) {
      losing.push(move.x);
    }

    // Computer wins!
    if (
      topDefenseMove &&
      topDefenseMove.defenseValue === WINCOUNT - 1 &&
      winning.indexOf(move.x) === -1
    ) {
      winning.push(move.x);
    }
  }
  return { winning, losing };
};
