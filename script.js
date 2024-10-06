let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let difficulty = "easy";

const boxes = document.querySelectorAll(".box");
const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleBoxClick(event) {
  const boxId = parseInt(event.target.id);
  if (!gameOver && gameBoard[boxId] === "") {
    gameBoard[boxId] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkWinner();
    if (!gameOver && currentPlayer === "O") {
      makeComputerMove();
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerText.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = gameBoard[condition[0]];
    const b = gameBoard[condition[1]];
    const c = gameBoard[condition[2]];
    if (a === b && b === c && a !== "") {
      gameOver = true;
      playerText.innerText = `Player ${a} Wins!`;
      return;
    }
  }

  const tie = gameBoard.every((box) => box !== "");
  if (tie) {
    gameOver = true;
    playerText.innerText = "It's a Tie!";
  }
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  boxes.forEach((box) => (box.innerText = ""));
}