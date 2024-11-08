/*-------------------------------- Constants --------------------------------*/
const WinningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board');

//  reset button
const resetBtnEl = document.createElement('button');
resetBtnEl.id = "reset";
resetBtnEl.textContent = "Reset Game";
document.body.appendChild(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = Array(9).fill('');
    turn = 'X'; // current Player
    winner = false;
    tie = false;
    render();
}

// Renders the DOM elements to reflect the current game state
function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark;
    });
}

function updateMessage() {
    if (winner && !tie) {
        messageEl.textContent = `${turn} Winner!`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Current turn: ${turn}`;
    }
}

function handleClick(event) {
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] || winner) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    console.log(board);
}

function checkForWinner() {
    for (const combo of WinningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
        }
    }
}

function checkForTie() {
    if (winner) return;
    tie = board.every(square => square !== "");
    console.log("Tie: " + tie);
}

function switchPlayerTurn() {
    if (winner) return; 
    turn = turn === "X" ? "O" : "X";
    console.log("Current Turn: " + turn);
}

/*----------------------------- Event Listeners -----------------------------*/
boardContainer.addEventListener('click', handleClick);

resetBtnEl.addEventListener('click', init);

init();