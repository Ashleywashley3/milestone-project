//Defining to display the status of the game.
const statusDisplay = document.querySelector('.game--status');

let gameActive = true; //game is active.
let currentPlayer = "X";//First current player is 'X'.
let gameState = ["", "", "", "", "", "", "", "", ""]; //String of each 'cell', 0 through 8.


//This is what each message will prompt when the game is over depending on who wins or if it's a tie game.//
const winningMessage = () => `Player ${currentPlayer} has won!`;
const tieMessage = () => `Tie game!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();


//These are the winning contitions for each 'cell' clicked. These are the methods you can win if you can click the numbered 'cell'.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//This function handles each 'cell that is clicked/played. You cannot click on a 'cell' that has already been played.
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//This helps the computer to know whose turn it is based on whether player 'X' or player 'O' clicked the cell for their turn.
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //this is the conditional (ternary) statement to determine which players turn it is. This was a lot easier and cleaner to use instead of the if/else statement. 
    statusDisplay.innerHTML = currentPlayerTurn();
}


//I used the for loop followed by a if statement to determine the condition of the game. 
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue; //this continue statement is used to break one itteration in the loop if and only if one or more of the winning conditions occur.
        }
        if (a === b && b === c) {
            roundWon = true;
            break; //the break statement is being used to basically make the loop stop if 'a' is strictly equal to 'b' if and only if 'b' is strictly equal to 'c'. 
        }
    }

    //If someone wins the round then the winning message will appear based on which player has won. And the game will not be active until the 'restart game' button is clicked.
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false; 
        return;
    }

    //If the game is a draw then the 'tie game' message will appear. Game will not be active until 'restart game' button is clicked.
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = tieMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}



function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}


//restarts the game and resets the board with the following condtions.
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//event listeners for each 'cell' on the board and the 'restart game' button as well when clicked.
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); //inputs your 'X' or 'O' by clicking inside the box(cell).
document.querySelector('.game--restart').addEventListener('click', handleRestartGame); //restarts the game and clears the board by clicking the 'restart game' button.
 
