// script.js
const coin = document.getElementById('coin');
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');
const result = document.getElementById('result');
const attemptsTable = document.getElementById('attempts-table').getElementsByTagName('tbody')[0];

let attempts = 0;

function flipCoin(guess) {
  attempts++;
  const random = Math.random();
  const isHeads = random < 0.5;
  const outcome = isHeads ? 'Heads' : 'Tails';
  const isCorrect = guess === outcome;

  // Flip the coin
  coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';

  // Display result
  result.textContent = `It's ${outcome}! You guessed ${guess}. ${isCorrect ? 'Correct!' : 'Wrong!'}`;
  result.style.color = isCorrect ? 'green' : 'red';

  // Add attempt to the table
  const row = attemptsTable.insertRow();
  row.insertCell().textContent = attempts;
  row.insertCell().textContent = guess;
  row.insertCell().textContent = outcome;
  row.insertCell().textContent = isCorrect ? 'Hit' : 'Miss';
  row.style.color = isCorrect ? 'green' : 'red';
}

headsButton.addEventListener('click', () => flipCoin('Heads'));
tailsButton.addEventListener('click', () => flipCoin('Tails'));
