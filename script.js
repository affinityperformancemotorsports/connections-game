const puzzle = [
    {
        category: "Social Status Slang",
        color: "#f9df6d",
        words: ["MOGGING", "AURA", "RIZZ", "GYATT"]
    },
    {
        category: "Masculinity Archetypes",
        color: "#a0c35a",
        words: ["ALPHA", "BETA", "SIGMA", "GIGACHAD"]
    },
    {
        category: "States and Behaviours",
        color: "#b0c4ef",
        words: ["CRASH OUT", "LOCKED IN", "COOKED", "STANDING ON BUSINESS"]
    },
    {
        category: "Storytelling and Gaming",
        color: "#ba81c5",
        words: ["CANON EVENT", "SIDE QUEST", "NPC", "LORE"]
    }
];

let words = puzzle.flatMap(group => group.words);
let selectedWords = [];
let solvedGroups = [];
let mistakes = 0;

const maxMistakes = 4;

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit-button");
const shuffleButton = document.getElementById("shuffle-button");

const solvedContainer = document.createElement("div");
solvedContainer.id = "solved-groups";
gameBoard.parentNode.insertBefore(solvedContainer, gameBoard);

const mistakeCounter = document.createElement("p");
mistakeCounter.id = "mistake-counter";
gameBoard.parentNode.insertBefore(mistakeCounter, submitButton);

function shuffleWords() {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
}

function updateMistakes() {
    mistakeCounter.textContent = "Mistakes remaining: " + (maxMistakes - mistakes);
}

function selectWord(word) {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(item => item !== word);
    } else if (selectedWords.length < 4) {
        selectedWords.push(word);
    }

    createBoard();
}

function createBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        const tile = document.createElement("button");

        tile.textContent = words[i];
        tile.classList.add("tile");

        if (selectedWords.includes(words[i])) {
            tile.classList.add("selected");
        }

        tile.addEventListener("click", function() {
            selectWord(words[i]);
        });

        gameBoard.appendChild(tile);
    }
}

function showSolvedGroup(group) {
    const row = document.createElement("div");
    row.classList.add("solved-row");
    row.style.backgroundColor = group.color;

    const title = document.createElement("strong");
    title.textContent = group.category.toUpperCase();

    const wordList = document.createElement("span");
    wordList.textContent = group.words.join(", ");

    row.appendChild(title);
    row.appendChild(wordList);

    solvedContainer.appendChild(row);
}

function submitGuess() {
    if (selectedWords.length !== 4) {
        message.textContent = "Select exactly four words!";
        return;
    }

    const correctGroup = puzzle.find(group =>
        group.words.every(word => selectedWords.includes(word))
    );

    if (correctGroup) {
        solvedGroups.push(correctGroup);

        showSolvedGroup(correctGroup);

        words = words.filter(word => !correctGroup.words.includes(word));
        selectedWords = [];

        createBoard();

        message.textContent = "Correct!";

        if (solvedGroups.length === 4) {
            message.textContent = "YOU WIN! Brainrot champion!";
            submitButton.disabled = true;
            shuffleButton.disabled = true;
        }

        return;
    }

    mistakes++;

    updateMistakes();

    const oneAway = puzzle.some(group => {
        if (solvedGroups.includes(group)) {
            return false;
        }

        const matches = group.words.filter(word =>
            selectedWords.includes(word)
        );

        return matches.length === 3;
    });

    if (oneAway) {
        message.textContent = "One away...";
    } else {
        message.textContent = "Not quite! Try again.";
    }

    selectedWords = [];
    createBoard();

    if (mistakes >= maxMistakes) {
        message.textContent = "Game over! Better luck next time.";
        submitButton.disabled = true;
        shuffleButton.disabled = true;

        const tiles = document.querySelectorAll(".tile");

        tiles.forEach(tile => {
            tile.disabled = true;
        });
    }
}

submitButton.addEventListener("click", submitGuess);

shuffleButton.addEventListener("click", function() {
    shuffleWords();
    createBoard();
});

shuffleWords();
createBoard();
updateMistakes();

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
    words = puzzle.flatMap(group => group.words);
    selectedWords = [];
    solvedGroups = [];
    mistakes = 0;

    solvedContainer.innerHTML = "";
    message.textContent = "";

    submitButton.disabled = false;
    shuffleButton.disabled = false;

    shuffleWords();
    createBoard();
    updateMistakes();
});
