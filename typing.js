
const playBtn = document.getElementById('play-btn');
const wordArea = document.getElementById('word-area');
const inputBox = document.getElementById('input-box');
const scoreDisplay = document.getElementById('score-display');
const shooter = document.getElementById('shooter');
let gameActive = false; // Start with game inactive
let words = [];
let accuracy=0;
let score = 0;
let speed = 0;
let timeLeft = 10; // Timer starts at 10 seconds
let timerInterval;

// Function to get a random word
function getRandomWord() {
  const wordList = ['hello', 'world', 'game', 'type', 'javascript', 'code', 'fun', 'speed'];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    } else {
      clearInterval(timerInterval);
      endGame(); // End the game when time runs out
    }
  }, 1000);
}

// Function to end the game
function endGame() {
  gameActive = false; // Stop game actions
  inputBox.disabled = true; // Disable input
  // Show Game Over message as a button
  const gameOverButton = document.createElement("button");
  gameOverButton.id = "game-over";
  gameOverButton.innerText = "Game Over";
  gameOverButton.style.display = "block";
  gameOverButton.style.margin = "20px auto";
  gameOverButton.style.padding = "10px 20px";
  gameOverButton.style.background = "#ff0000";
  gameOverButton.style.color = "#fff";
  gameOverButton.style.border = "none";
  gameOverButton.style.borderRadius = "5px";
  gameOverButton.style.fontSize = "20px";
  wordArea.appendChild(gameOverButton);
  console.log(score);
  localStorage.setItem('score',score)
  localStorage.setItem('speed',score*6)
  localStorage.setItem('accuracy',score/score+"%");
  document.getElementById("game-over").addEventListener("click", function () {
    window.location.assign("typing3.html"); // Replace with your URL
  });
  

}


// Function to reset the game
function resetGame() {
  clearInterval(timerInterval); // Stop any ongoing timer
  gameActive = true; // Reactivate the game
  timeLeft = 10; // Reset the timer
  score = 0; // Reset the score
  inputBox.disabled = false; // Enable input box
  inputBox.value = ''; // Clear the input box
  document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
  scoreDisplay.textContent = `Score: ${score}`;
  console.log('score - ', score)
  words.forEach((word) => wordArea.removeChild(word)); // Clear all existing words
  words = []; // Reset the word array
  startTimer(); // Start the timer
  gameLoop(); // Restart the game loop
}

// Function to spawn a word
function spawnWord() {
  const word = document.createElement('div');
  word.className = 'word';
  word.innerText = getRandomWord();
  word.style.position = 'absolute';
  word.style.left = `${Math.random() * (wordArea.offsetWidth - 50)}px`;
  word.style.top = '0px';
  wordArea.appendChild(word);
  words.push(word);
}

// Function to create and animate spark effect
function createSparkEffect(x, y) {
const spark = document.createElement('div');
spark.classList.add('spark');
spark.style.left = `${x}px`;
spark.style.top = `${y}px`;
wordArea.appendChild(spark);
setTimeout(() => {
spark.remove(); // Remove spark after animation completes
}, 500);
}

// Event listener for input box
inputBox.addEventListener('input', () => {
const currentTypedWord = inputBox.value.trim();
words.forEach((word, index) => {
if (word.innerText === currentTypedWord) {
  // Increase score
  score++;
  scoreDisplay.innerText = `Score: ${score}`;
  
  // Create spark effect at the word's position
  createSparkEffect(parseInt(word.style.left), parseInt(word.style.top));

  // Remove the word from the game area
  wordArea.removeChild(word);
  words.splice(index, 1);

  // Clear the input box
  inputBox.value = '';
}
});
});


// Function to move words down
function moveWords() {
  words.forEach((word, index) => {
    const currentTop = parseInt(word.style.top);
    if (currentTop < wordArea.offsetHeight - 50) {
      word.style.top = `${currentTop + 2}px`;
    } else {
      wordArea.removeChild(word);
      words.splice(index, 1);
    }
  });
}

// Game loop
function gameLoop() {
  if (!gameActive) return; // Stop loop if game is inactive
  moveWords();
  if (Math.random() < 0.01) spawnWord();
  requestAnimationFrame(gameLoop);
}

// Event listener for Play Game button
playBtn.addEventListener('click', () => {
  document.getElementById('start-menu').style.display = 'none'; // Hide start menu
  gameActive = true; // Activate the game
  startTimer(); // Start the timer
  gameLoop(); // Start the game loop
});

// Event listener for input box
inputBox.addEventListener('input', () => {
  const currentTypedWord = inputBox.value.trim();
  words.forEach((word, index) => {
    if (word.innerText === currentTypedWord) {
      score++;
      scoreDisplay.innerText = `Score: ${score}`;
      wordArea.removeChild(word);
      words.splice(index, 1);
      inputBox.value = '';
    }
  });
});



// Event listener for Play Again button
document.getElementById('play-again').addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementById('toggle-theme');

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
  });
});