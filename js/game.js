import {
  isColumnFull,
  isBoardStateValid,
  getCurrentPlayer,
} from "./boardState.js";
import { checkWinner } from "./checkWinner.js";
import { getComputerNextMove } from "./computerOpponent.js";
import { buildBoard, printBoard, dropChip } from "./display.js";
import { PLAYER1, PLAYER2, EMPTY, BOARD_COLS } from "./config.js";

const doPlay = async (board, col, computer) => {
  if (!isBoardStateValid(board)) {
    alert("Board is in an invalid state... game over!");
  }

  const currentPlayer = getCurrentPlayer(board);

  if (isColumnFull(board, col, currentPlayer)) {
    alert("That column is full, choose another column");
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
    const getKey = (event) => {      
      const col = parseInt(event.key, 10) - 1;
      if (event.key.match(/^[0-9]+$/) && (col < 0 || col >= BOARD_COLS)) {
        document.removeEventListener('keydown', getKey);
        doPlay(board, col, computer);
      }      
    }
    document.addEventListener('keydown', getKey);

    const columnSelect = (event) => {
      if (event.target.classList[1] && event.target.classList[1].substr(0, 3) === "col") {
        document.getElementById("game").onclick = null;
        const col = parseInt(event.target.classList[1].substr(3), 10);
        console.log(col)
        doPlay(board, col, computer);
      }
    }
    document.getElementById("game").onclick = columnSelect;
  }
};

const endGame = winner => {
  let question;
  if (winner === EMPTY) {
    question = "Tie game!!! Play again?";
  } else {
    const winnerName = winner === PLAYER1 ? "Player 1" : "Player 2";
    question = `<span class="winner">${winner}</span>${winnerName} wins!!! Play again (y or n)?`;
  }
  const gameOver = document.getElementById("game-over");
  gameOver.innerHTML = `${question} <button id="new-game">Ok</button>`;
  document.getElementById("new-game").onclick = (event) => {
    gameOver.hidden = true;
    document.getElementById("new-game").onclick = null;
    gameOver.innerHTML = "";
    startGame();
  }
  gameOver.hidden = false;
};

const choosePlayer = event => {
  if (event.target.id === "player1-btn" || event.target.id === "player2-btn") {
    document.getElementById("choose-player").onclick = null;
    document.getElementById("overlay").hidden = true;
    const computer = event.target.id === "player2-btn" ? PLAYER1 : PLAYER2;
    play(buildBoard(), computer);
  }
}

const startGame = () => {
  document.getElementById("overlay").hidden = false;
  document.getElementById("choose-player").onclick = choosePlayer;

  // rlInterface.question("1 or 2 players?", answer => {
  //   if (answer === "1") {
  //     rlInterface.question("Do you want to be player 1 or 2?", answer => {
  //       const computer = answer === "2" ? PLAYER1 : PLAYER2;
  //       play(buildBoard(), computer);
  //     });
  //   } else {
  //     play(buildBoard(), false);
  //   }
  // });
};

startGame();
