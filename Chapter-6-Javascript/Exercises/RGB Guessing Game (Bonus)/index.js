// Starting values
let lives = 3;
let score = 0;
let currentRGB;
let options = [];
let numOptions = 4; // Total number of color boxes shown

// Get elements from the page
const rgbDisplay = document.getElementById('rgbDisplay');
const colorsContainer = document.getElementById('colorsContainer');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const endGameModal = document.getElementById('endGameModal');
const finalScoreDisplay = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);

// When you click the "Play Again" button
playAgainBtn.addEventListener('click', () => {
    endGameModal.style.display = 'none'; // Hide the game over screen
    resetGame(); // Set score and lives back to starting values
    initGame(); // Start a new game
});

/**
 * Set up the game with a new color and new choices
 */
function initGame() {
    currentRGB = generateRandomRGB(); // Pick a random color
    generateColorOptions(); // Make color options (1 correct + 3 wrong)

    // Show the RGB value to guess
    rgbDisplay.textContent = `RGB(${currentRGB.r}, ${currentRGB.g}, ${currentRGB.b})`;

    // Show the boxes on the screen
    displayColorOptions();

    // Clear any message from last round
    clearMessage();
}

/**
 * Make a random RGB color
 */
function generateRandomRGB() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

/**
 * Create the correct answer and 3 random ones
 */
function generateColorOptions() {
    options = [];

    // Add the correct color to the list
    options.push({
        r: currentRGB.r,
        g: currentRGB.g,
        b: currentRGB.b,
        isCorrect: true
    });

    // Add more random colors (wrong answers)
    for (let i = 1; i < numOptions; i++) {
        const randomColor = generateRandomRGB();
        options.push({
            r: randomColor.r,
            g: randomColor.g,
            b: randomColor.b,
            isCorrect: false
        });
    }

    // Mix them up so the correct one isn't always first
    shuffleArray(options);
}

/**
 * Shuffle the order of colors randomly
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Show the color boxes on the page
 */
function displayColorOptions() {
    colorsContainer.innerHTML = ''; // Remove old boxes

    options.forEach((color) => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

        // When you click a color
        colorBox.addEventListener('click', () => handleColorSelection(color));

        colorsContainer.appendChild(colorBox);
    });
}

/**
 * What happens when a player clicks a color box
 */
function handleColorSelection(selectedColor) {
    if (selectedColor.isCorrect) {
        score += 1;
        scoreDisplay.textContent = score;
        showMessage('Correct!', 'correct');

        // Wait a second, then start the next round
        setTimeout(() => {
            initGame();
        }, 1500);
    } else {
        lives -= 1;
        livesDisplay.textContent = lives;
        showMessage('Incorrect! Try again.', 'incorrect');

        // End the game if there are no lives left
        if (lives <= 0) {
            setTimeout(() => {
                endGame();
            }, 1000);
        }
    }
}

/**
 * Show a message (either Correct or Incorrect)
 */
function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;
}

/**
 * Clear the message area
 */
function clearMessage() {
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
}

/**
 * Show the game over screen with the final score
 */
function endGame() {
    finalScoreDisplay.textContent = score;
    endGameModal.style.display = 'flex';
}

/**
 * Reset score and lives when starting a new game
 */
function resetGame() {
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
}