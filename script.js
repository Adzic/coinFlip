let score = 0;
let roundsPlayed = 0;
let bestScore = 0;

// Get references to the buttons and result elements
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');
const resetButton = document.getElementById('reset');
const resultText = document.getElementById('result-text');
const scoreText = document.getElementById('score-text');
const bestScoreText = document.getElementById('best-score');
const gameOverText = document.getElementById('game-over');

// Function to generate a random result (heads or tails)
function flipCoin() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

// Function to handle the user's guess
function handleGuess(userGuess) {
    if (roundsPlayed >= 10) {
        return; // Stop the game after 10 rounds
    }

    const result = flipCoin();
    roundsPlayed++;

    // Play sound effect
    const coinSound = new Audio('coin-flip.mp3');
    coinSound.play();

    // Display coin flip animation
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.textContent = result.toUpperCase();
    resultText.innerHTML = '';
    resultText.appendChild(coin);

    // Check if the user guessed correctly
    if (userGuess === result) {
        score++;
        resultText.appendChild(document.createTextNode(`You guessed correctly!`));
    } else {
        resultText.appendChild(document.createTextNode(`You guessed wrong.`));
    }

    // Update the score display
    scoreText.textContent = `Score: ${score} / ${roundsPlayed}`;

    // Check if the game is over
    if (roundsPlayed === 10) {
        if (score > 5) {
            gameOverText.textContent = "Congratulations! You won the game!";
        } else {
            gameOverText.textContent = "Game over! You didn't guess enough correctly.";
        }

        // Update the best score
        if (score > bestScore) {
            bestScore = score;
            bestScoreText.textContent = `Best Score: ${bestScore}`;
        }
    }
}

// Function to reset the game
function resetGame() {
    score = 0;
    roundsPlayed = 0;
    resultText.textContent = '';
    scoreText.textContent = 'Score: 0 / 0';
    gameOverText.textContent = '';
}

// Add event listeners to the buttons
headsButton.addEventListener('click', () => handleGuess('heads'));
tailsButton.addEventListener('click', () => handleGuess('tails'));
resetButton.addEventListener('click', resetGame);