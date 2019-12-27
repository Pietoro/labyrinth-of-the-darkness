"use strict"; // strict mode

// Constant DOM element pointers
const html = document.getElementsByTagName("html")[0];
const board = document.getElementById("board");

// ***********************************************************************



// Main Code
const data = {
    "startX": 2,
    "startY": 1,
    "tiles": [
        ["wall", "ground", "wall", "water", "water", "ground", "water", "wall"],
        ["wall", "ground", "ground", "ground", "water", "ground", "water", "water"],
        ["water", "wall", "ground", "wall", "ground", "ground", "ground", "wall"],
        ["water", "wall", "ground", "ground", "ground", "wall", "ground", "wall"],
        ["ground", "ground", "ground", "wall", "wall", "ground", "ground", "wall"],
        ["wall", "wall", "ground", "ground", "wall", "ground", "wall", "wall"]
    ]
};

let {startX: heroX, startY: heroY} = data; // heroX = data.startX; heroY = data.startY; // object destructuring
const tiles = data.tiles;

const tilesY = tiles.length;
const tilesX = tiles[0].length;
const tileSize = 80; // Byłoby dobrze, gdyby było ustalane na podstawie ilości kafelków w poziomie

// Zamiast zmieniać ustawienia grida, zmieniamy same css variables
html.style.setProperty("--board-tile-size", tileSize+"px");
html.style.setProperty("--board-tiles-x", tilesX);
html.style.setProperty("--board-tiles-y", tilesY);

// Czyszczonko planszy
while (board.hasChildNodes()) {
    board.removeChild(board.lastChild);
}

// I wypełnianko kafelkami
for(let i=1; i<=tilesY; i++) {
    for(let j=1; j<=tilesX; j++) {
        const tile = document.createElement("div");
        tile.setAttribute("id",`tile-${i}-${j}`);
        tile.setAttribute("class",`tile-${tiles[i-1][j-1]}`);
        tile.style.setProperty("grid-area", `${i} / ${j}`);
        tile.onclick = () => move(j, i); // event kliknięcia
        board.appendChild(tile);
    }
}

//Tworzenie i dodawanie do planszy bohatera
const hero = document.createElement("div");
hero.setAttribute("class", "game-obj");
hero.style.setProperty("grid-area", `${heroY} / ${heroX}`); // przy zmianie rozmiaru kafelków nic się nie rozjedzie
const heroInside = document.createElement("div");
heroInside.setAttribute("id", "hero");
hero.appendChild(heroInside);
board.appendChild(hero);

// ***********************************************************************



// Functions, classess etc...
function move(x, y) {
    heroX = x;
    heroY = y;
    hero.style.setProperty("grid-area", `${heroY} / ${heroX}`);
}