const boardSize = 10;
const bombCount = 20;

const gameBoard = document.querySelector('.game-board');
const squares = [];

function generateBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener('click', () => revealSquare(row, col));
            gameBoard.appendChild(square);
            squares.push(square);
        }
    }

    // Generate bombs
    for (let i = 0; i < bombCount; i++) {
        const randomIndex = Math.floor(Math.random() * squares.length);
        squares[randomIndex].classList.add('bomb');
    }
}
let gameOver = false;
function revealSquare(row, col) {
    if (gameOver) {
        return; 
    }
    const square = squares.find(sq => sq.dataset.row == row && sq.dataset.col == col);

    if (square.classList.contains('bomb')) {
        square.classList.add('revealed', 'bomb-revealed');
        alert('Game Over!');
        setTimeout(() => {
            resetGame(); // Reset the game after a delay
        }, 1000); // Adjust the delay as needed
    } else {
        const bombCount = countAdjacentBombs(row, col);
        square.classList.add('revealed');
        square.textContent = bombCount > 0 ? bombCount : '';
    }
}

function countAdjacentBombs(row, col) {
    let count = 0;

    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                if (squares.find(sq => sq.dataset.row == r && sq.dataset.col == c).classList.contains('bomb')) {
                    count++;
                }
            }
        }
    }

    return count;
}
function resetGame() {
    gameOver = false; // Reset game state
    // Clear the game board
    for (const square of squares) {
        square.classList.remove('revealed', 'bomb-revealed');
        square.textContent = '';
    }

    // Remove bombs from the previous game
    for (const square of squares) {
        square.classList.remove('bomb');
    }

    // Generate new bombs
    for (let i = 0; i < bombCount; i++) {
        const randomIndex = Math.floor(Math.random() * squares.length);
        squares[randomIndex].classList.add('bomb');
    }
}

generateBoard();

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
