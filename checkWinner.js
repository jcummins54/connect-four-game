import {
  PLAYER1,
  PLAYER2,
  EMPTY,
  BOARD_ROWS,
  BOARD_COLS,
  WINCOUNT,
} from "./config";

export const getSquareCounts = (square, counts) => {
  if (square === EMPTY) {
    // No winner if any square in a row is empty
    return false;
  }
  if (square === PLAYER1) {
    counts.player1Count++;
  } else if (square === PLAYER2) {
    counts.player2Count++;
  }
  if (counts.player1Count > 0 && counts.player2Count > 0) {
    // No winner if both players have squares in a row
    return false;
  }
  return counts;
};

// x and y are row and column position of square
// xDir and yDir determine search direction and should be a value of 1, 0, or -1
export const checkDirection = (board, x, y, xDir, yDir) => {
  let i;
  let j;
  let k;
  let square;
  let counts = {
    player1Count: 0,
    player2Count: 0,
  };

  // Check if calculation is needed on this square
  if (xDir === 1 && x + WINCOUNT > BOARD_COLS) {
    return false;
  }
  if (yDir === 1 && y + WINCOUNT > BOARD_ROWS) {
    return false;
  }
  if (xDir === -1 && x - WINCOUNT < 0) {
    return false;
  }
  if (yDir === -1 && y - WINCOUNT < 0) {
    return false;
  }

  for (i = 0; i < WINCOUNT; i++) {
    let xInc = i * xDir;
    let yInc = i * yDir;
    square = board[y + yInc][x + xInc];
    counts = getSquareCounts(square, counts);
    if (!counts) {
      return false;
    }
  }
  if (counts.player1Count === WINCOUNT) {
    return PLAYER1;
  } else if (counts.player2Count === WINCOUNT) {
    return PLAYER2;
  }
  return false;
};

export const checkWinner = board => {
  colLoop: for (let x = 0; x < BOARD_COLS; x++) {
    for (let y = BOARD_ROWS - 1; y >= 0; y--) {
      let square = board[y][x];
      if (square === EMPTY) {
        // The column squares above have to be empty as well, we can skip to the next column
        continue colLoop;
      }

      const checkRight = checkDirection(board, x, y, 1, 0);
      if (checkRight) {
        return checkRight;
      }

      const checkLeft = checkDirection(board, x, y, -1, 0);
      if (checkLeft) {
        return checkLeft;
      }

      const checkDown = checkDirection(board, x, y, 0, 1);
      if (checkDown) {
        return checkDown;
      }

      const checkUp = checkDirection(board, x, y, 0, -1);
      if (checkUp) {
        return checkUp;
      }

      const checkDownRight = checkDirection(board, x, y, 1, 1);
      if (checkDownRight) {
        return checkDownRight;
      }

      const checkDownLeft = checkDirection(board, x, y, -1, 1);
      if (checkDownLeft) {
        return checkDownLeft;
      }

      const checkUpRight = checkDirection(board, x, y, 1, -1);
      if (checkUpRight) {
        return checkUpRight;
      }

      const checkUpLeft = checkDirection(board, x, y, -1, -1);
      if (checkUpLeft) {
        return checkUpLeft;
      }
    }
  }
  return null;
};
