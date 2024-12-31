let score = 0;
let roundsPlayed = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let isAnimating = false;

// Get references to elements
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');
const resetButton = document.getElementById('reset');
const resultText = document.getElementById('result-text');
const scoreText = document.getElementById('score-text');
const bestScoreText = document.getElementById('best-score');
const gameOverText = document.getElementById('game-over');
const roundsLeftText = document.getElementById('rounds-left');
const progressBar = document.getElementById('progress');
const coin = document.querySelector('.coin');

// Initialize best score display
bestScoreText.textContent = bestScore;

// Function to update progress bar
function updateProgress() {
    const progress = (roundsPlayed / 10) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to generate a random result
function flipCoin() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

// Function to animate the coin flip
function animateCoin(result) {
    return new Promise((resolve) => {
        coin.classList.add('flipping');
        
        setTimeout(() => {
            coin.classList.remove('flipping');
            coin.style.transform = result === 'heads' ? 'rotateY(0)' : 'rotateY(180deg)';
            resolve();
        }, 1500);
    });
}

// Function to handle the user's guess
async function handleGuess(userGuess) {
    if (roundsPlayed >= 10 || isAnimating) return;
    
    isAnimating = true;
    const result = flipCoin();
    
    // Disable buttons during animation
    headsButton.disabled = true;
    tailsButton.disabled = true;
    
    await animateCoin(result);
    
    roundsPlayed++;
    updateProgress();
    
    if (userGuess === result) {
        score++;
        resultText.textContent = '🎉 Correct!';
        resultText.style.color = '#4CAF50';
    } else {
        resultText.textContent = '❌ Wrong!';
        resultText.style.color = '#ff5252';
    }
    
    scoreText.textContent = `${score} / ${roundsPlayed}`;
    roundsLeftText.textContent = 10 - roundsPlayed;
    
    if (roundsPlayed === 10) {
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            bestScoreText.textContent = bestScore;
            gameOverText.innerHTML = `🏆 New High Score: ${score}!<br>Can you beat it?`;
        } else {
            gameOverText.textContent = `Game Over! Final Score: ${score}`;
        }
    }
    
    // Re-enable buttons
    headsButton.disabled = false;
    tailsButton.disabled = false;
    isAnimating = false;
}

// Function to reset the game
function resetGame() {
    score = 0;
    roundsPlayed = 0;
    resultText.textContent = '';
    scoreText.textContent = '0 / 0';
    gameOverText.textContent = '';
    roundsLeftText.textContent = '10';
    progressBar.style.width = '0%';
    coin.style.transform = 'rotateY(0)';
    resultText.style.color = '#1e3c72';
}

// Add event listeners
headsButton.addEventListener('click', () => handleGuess('heads'));
tailsButton.addEventListener('click', () => handleGuess('tails'));
resetButton.addEventListener('click', resetGame);
