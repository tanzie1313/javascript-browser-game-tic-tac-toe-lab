/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], 
    //   those are rows
    [0,3,6], [1,4,7], [2,5,8],
    // columns
        [0,4,8], [2,4,6]
        // diagonals
    ];


/*---------------------------- Variables (state) ----------------------------*/
// required variables used to track game state
let board;  
let turn;
let winner;
let tie;
let squareIndex;
let reset;


const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board');
const resetBtnEl = document.createElement('button');

//create the reset button
resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset Game';

boardContainer.appendChild(resetBtnEl);
//  console.log(messageEl)




/*-------------------------------- Functions --------------------------------*/
function init() {
    board = Array(9).fill('');
    turn = 'X'; //current player
    winner = false;
    tie = false;
    render();
    // console.log('clicked reset button');
}
function render() {
    updateBoard();
    updateMessage();
    checkForTie();
    placePiece();
    checkForWinner();
}

function updateBoard() {
    board.forEach((mark, index) => {
        squareEls[index].textContent = mark;
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = "It's a tie!";
    } else if (tie) {
        messageEl.textContent = 'It's a tie!';
    } else {
        messageEl.textContent = `${turn}'s turn`;
    }
    
}

function placePiece() { 
    squareEls.forEach((square, index) => {
        square.addEventListener('click', () => {
            if (board[index] || winner) return;
            board[index] = turn;
            render();
            switchPlayerTurn();
        });
    });
}

function checkForWinner() {
    if (winner) return;
    winningCombos.forEach((combo) => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
            console.log("Winner: " + winner);
        }
    });
}

function checkForTie() {   
    if (winner) return;
    if (board.every((square) => square)) {
        tie = true;
    }
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
    console.log("Current turn: " + turn);
}   



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square, idx) {
    square.addEventListener('click', function() {
        if (board[idx] || winner) return;
        board[idx] = turn;
        render();
        switchPlayerTurn();
    });
});
resetBtnEl.addEventListener('click', init);
init();