/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
      [0,1,2], [3,4,5,], [6,7,8,], 
    //   those are rows
    [0,3,6,], [1,4,7], [2,5,8],
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
init();
function render() {
    updateBoard();
    updateMessage();
    checkForTie();
    placePiece();
    checkForWinner();

}
function updateBoard() {
    board.forEach ((mark, index) => {
        const square = squareEls[index];
        square.textContent = mark;
    });
}

function updateMessage() {
    if (winner === true && tie === false) {
        messageEl.textContent = `${turn} Winner!`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'It is a tie!';
    } else if (winner === false && tie === false){
        messageEl.textContent = `Current turn : ${turn}`;
    }
}
    
    function handleClick(event) {
        const squareIndex = (parseInt(event.target.id));
        if (board[squareIndex] || winner === true) return;
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
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                winner = true;
                console.log("Winner: " + winner);
                return;
            }
        }
    }
    
    function checkForTie() {
        if (winner === true) return;
        tie = board.every(square => square !== '');
        console.log("Tie: " + tie);
    }
    
    function switchPlayerTurn() {
        if (winner) return;
        turn = turn === 'X' ? 'O' : 'X';
        console.log("Current turn: " + turn);

    }
}
    


/*----------------------------- Event Listeners -----------------------------*/

boardContainer.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
    init();