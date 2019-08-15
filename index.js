import * as readline from "readline";
import {
  isColumnFull,
  isBoardStateValid,
  getCurrentPlayer,
} from "./boardState";
import { checkWinner } from "./checkWinner";
import { getComputerNextMove } from "./computerOpponent";
import { PLAYER1, PLAYER2, EMPTY, BOARD_ROWS, BOARD_COLS } from "./config";

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let messages = [];
export const setMessage = msg => {
  messages.push(msg);
};

const buildBoard = () => {
  let boardArray = [];
  for (let i = 0; i < BOARD_ROWS; i++) {
    boardArray[i] = [];
    for (let j = 0; j < BOARD_COLS; j++) {
      boardArray[i][j] = EMPTY;
    }
  }
  return boardArray;
};

const printBoard = board => {
  let output = "\n";
  let divider = "";
  let square = "";
  let colLabels = "";
  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      divider += "+---";
      square += `| ${board[i][j]} `;
      if (j === BOARD_COLS - 1) {
        divider += "+";
        square += "|";
      }
    }
    output += ` ${divider}\n ${square}\n`;
    divider = square = "";
  }
  for (let j = 0; j < BOARD_COLS; j++) {
    divider += "+---";
    colLabels += j > 9 ? `  ${j + 1}` : `   ${j + 1}`;
  }
  output += ` ${divider}+\n${colLabels}\n`;
  console.clear();
  console.log(output);
};

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const dropChip = async (board, col, currentPlayer) => {
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

const doPlay = async (board, col, computer) => {
  if (!isBoardStateValid(board)) {
    console.log("Board is in an invalid state... quitting");
    process.exit(1);
  }

  const currentPlayer = getCurrentPlayer(board);

  if (isColumnFull(board, col, currentPlayer)) {
    setMessage("That column is full, choose another column");
  } else {
    await dropChip(board, col, currentPlayer);
    const winner = checkWinner(board);
    if (winner) {
      return endGame(winner);
    }
  }
  play(board, computer);
};

const play = (board, computer) => {
  printBoard(board);
  for (let i = 0; i < messages.length; i++) {
    console.log(`${messages[i]}\n`);
  }
  messages = [];
  const currentPlayer = getCurrentPlayer(board);

  // Check for tie
  let isTie = true;
  for (let i = 0; i < BOARD_COLS; i++) {
    if (board[0][i] === EMPTY) {
      isTie = false;
      break;
    }
  }
  if (isTie) {
    return endGame(EMPTY);
  }

  if (computer === currentPlayer) {
    doPlay(board, getComputerNextMove(board), computer);
  } else {
    rlInterface.question(`Choose a column [1 - ${BOARD_COLS}]:`, answer => {
      const col = parseInt(answer, 10) - 1;
      if (!answer.match(/^[0-9]+$/) || (col < 0 || col >= BOARD_COLS)) {
        setMessage(`Please enter a number between 1 and ${BOARD_COLS}`);
        return play(board, computer);
      }
      doPlay(board, col, computer);
    });
  }
};

const endGame = winner => {
  let question;
  if (winner === EMPTY) {
    question = "Tie game!!! Play again (y or n)?";
  } else {
    const winnerName = winner === PLAYER1 ? "Yellow" : "Red";
    question = `\n${winnerName} wins!!! Play again (y or n)?`;
  }
  rlInterface.question(question, answer => {
    if (answer === "y") {
      startGame();
    } else {
      console.log("Thanks for playing! Bye");
      process.exit(0);
    }
  });
};

const startGame = () => {
  rlInterface.question("1 or 2 players?", answer => {
    if (answer === "1") {
      rlInterface.question("Do you want to be player 1 or 2?", answer => {
        const computer = answer === "2" ? PLAYER1 : PLAYER2;
        play(buildBoard(), computer);
      });
    } else {
      play(buildBoard(), false);
    }
  });
};

startGame();

rlInterface.on("close", function() {
  console.log("\nBye!");
  process.exit(0);
});
