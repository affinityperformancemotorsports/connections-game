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

const words = puzzle.flatMap(group => group.words);

const gameBoard = document.getElementById("game-board");

let selectedWords = [];

function shuffleWords() {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [words[i], words[j]] = [words[j], words[i]];
    }
}

function selectWord(tile, word) {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(item => item !== word);
        tile.classList.remove("selected");
    } else {
        if (selectedWords.length < 4) {
            selectedWords.push(word);
            tile.classList.add("selected");
        }
    }
}

function createBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        const tile = document.createElement("button");

        tile.textContent = words[i];
        tile.classList.add("tile");

        tile.addEventListener("click", function() {
            selectWord(tile, words[i]);
        });

        gameBoard.appendChild(tile);
    }
}

shuffleWords();
createBoard();
