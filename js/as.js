// script.js
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let currentPlayer = 'X';
const board = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let balance = 100;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        resetGame();
        updateBalanceDisplay();
    } else {
        document.getElementById('loginError').textContent = 'Please enter a username and password.';
    }
}

function logout() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').textContent = '';
}

function showGame(gameId) {
    document.querySelectorAll('.game').forEach(game => {
        game.style.display = 'none';
    });
    document.getElementById(gameId).style.display = 'block';
}

function placeBet(gameId) {
    if (balance < 10) {
        alert('Insufficient balance to place bet.');
        return;
    }
    balance -= 10;
    updateBalanceDisplay();
    if (gameId === 'guessingGame') {
        secretNumber = Math.floor(Math.random() * 100) + 1; // Reset number for guessing game
        attempts = 0; // Reset attempts
        document.getElementById('guessResult').textContent = '';
    } else if (gameId === 'ticTacToe') {
        resetGame();
    }
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    attempts++;
    const resultText = document.getElementById('guessResult');

    if (guess < secretNumber) {
        resultText.textContent = 'Too low! Try again.';
    } else if (guess > secretNumber) {
        resultText.textContent = 'Too high! Try again.';
    } else {
        resultText.textContent = `Correct! It took you ${attempts} attempts. You win $20!`;
        balance += 20;
        updateBalanceDisplay();
    }
}

function makeMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;

        if (checkWinner()) {
            document.getElementById('gameStatus').textContent = `${currentPlayer} wins! You win $20!`;
            balance += 20;
            updateBalanceDisplay();
        } else if (board.every(cell => cell)) {
            document.getElementById('gameStatus').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board.fill(null);
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    document.getElementById('gameStatus').textContent = '';
}

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance;
}
