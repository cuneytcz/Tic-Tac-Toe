const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

let turn;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const messageElement = document.querySelector("[data-message]");
const messageTextElement = document.querySelector("[data-message-text]");
const restart = document.querySelector("[data-restart]");

restart.addEventListener("click", startGame);

startGame();

function startGame() {
   turn = false;

   cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);

      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
   });

   setBoardHoverClass();

   messageElement.classList.remove("show");
}

function handleClick(e) {
   const cell = e.target;
   const currentClass = turn ? O_CLASS : X_CLASS;

   placeMark(cell, currentClass);

   if (checkWin(currentClass)) {
      endGame(false);
   } else if (isDraw()) {
      endGame(true);
   } else {
      swapTurns();
      setBoardHoverClass();
   }
}

function endGame(draw) {
   if (draw) {
      messageTextElement.innerText = "Draw!";
   } else {
      messageTextElement.innerText = `${turn ? "O's" : "X's"} Win!`;
   }

   messageElement.classList.add("show");
}

function isDraw() {
   return [...cellElements].every((cell) => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
   });
}

function placeMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function swapTurns() {
   turn = !turn;
}

function setBoardHoverClass() {
   board.classList.remove(X_CLASS);
   board.classList.remove(O_CLASS);

   if (turn) {
      board.classList.add(O_CLASS);
   } else {
      board.classList.add(X_CLASS);
   }
}

function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some((combinations) => {
      return combinations.every((index) => {
         return cellElements[index].classList.contains(currentClass);
      });
   });
}
