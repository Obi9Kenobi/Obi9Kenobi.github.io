const cardData = ["🍎","🍌","🍇","🍓","🥝","🍍"];

const gameBoard = document.getElementById("gameBoard");
const movesEl = document.getElementById("moves");
const matchesEl = document.getElementById("matches");
const winMessage = document.getElementById("winMessage");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const difficultySelector = document.getElementById("difficulty");

let cardsArray = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let totalPairs = 0;

// Generate board based on difficulty
function initGame() {
    // Reset
    gameBoard.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = true; // Lock the board initially
    moves = 0;
    matches = 0;
    movesEl.textContent = moves;
    matchesEl.textContent = matches;
    winMessage.textContent = "";

    // Determine grid size
    const difficulty = difficultySelector.value;
    let rows, cols;

    if (difficulty === "easy") { rows = 3; cols = 4; } // 12 cards
    else { rows = 4; cols = 6; } // 24 cards

    totalPairs = (rows * cols) / 2;

    // Duplicate and shuffle cards
    cardsArray = [];
    for (let i = 0; i < totalPairs; i++) {
        const item = cardData[i % cardData.length];
        cardsArray.push(item, item);
    }
    cardsArray = shuffle(cardsArray);

    // Set grid
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 80px)`;

    const newCards = []; 
    
    // Create card elements
    cardsArray.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.item = item;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${item}</div>
                <div class="card-back"></div>
            </div>
        `;

        // 1. ADD 'flipped' CLASS: Cards are created FACE-UP
        card.classList.add("flipped"); 

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        newCards.push(card);
    });

    // 2. Initial flip-down delay and unlock the board
    setTimeout(() => {
        // 3. REMOVE 'flipped' CLASS: Flips the cards back FACE-DOWN
        newCards.forEach(card => {
            card.classList.remove("flipped");
        });
        
        lockBoard = false; // Unlock the board
    }, 1500);
}

// Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Flip card logic
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    moves++;
    movesEl.textContent = moves;

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.item === secondCard.dataset.item;

    if (isMatch) {
        matches++;
        matchesEl.textContent = matches;
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetTurn();

        if (matches === totalPairs) {
        winMessage.textContent = "🎉 You won! 🎉";
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped"); // *** FIXED SYNTAX ERROR ***
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Event listeners
startBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", initGame);
difficultySelector.addEventListener("change", initGame);