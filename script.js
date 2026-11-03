const puzzle = [
{
    category: "Social Slang",
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
    category: "Gaming Terms, New Meanings",
    color: "#ba81c5",
    words: ["CANNON EVENT", "SIDE QUEST", "NPC", "LORE"]
}

];

const words = puzzle.flatMap(group => group.words);
const gameBoard = document. getElementById("game-board");

function shuffleWords() {
    for (let i = words.length -1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [words[i], words[j]] = [words[j], words[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        const tile = document.createElement("button");

        tile.textContent = words[i];
        tile.classList.add("tile");
        gameBoard.appendChild(tile);
    }
}
