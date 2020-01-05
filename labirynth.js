"use strict"; // strict mode

import {clearDiv, Hero, taxiDist} from "./utils.js";

// Constant DOM element pointers
const html = document.getElementsByTagName("html")[0];
const board = document.getElementById("board");

//Global variables
let tiles;
let tilesX;
let tilesY;
let tileSize;
let hero;

// ***********************************************************************


// Main Code
initBoard("board1");

/*let {startX, startY} = data; // heroX = data.startX; heroY = data.startY; // object destructuring
tiles = data.tiles;

tilesY = tiles.length;
tilesX = tiles[0].length;
tileSize = 80; // Byłoby dobrze, gdyby było ustalane na podstawie ilości kafelków w poziomie

// Zamiast zmieniać ustawienia grida, zmieniamy same css variables
html.style.setProperty("--board-tile-size", tileSize+"px");
html.style.setProperty("--board-tiles-x", tilesX);
html.style.setProperty("--board-tiles-y", tilesY);

// Czyszczonko planszy
clearDiv(board);

// I wypełnianko kafelkami
for(let i=1; i<=tilesY; i++) {
    for(let j=1; j<=tilesX; j++) {
        const tile = document.createElement("div");
        tile.setAttribute("id",`tile-${i}-${j}`);
        tile.setAttribute("class",`tile-${tiles[i-1][j-1]}`);
        tile.style.setProperty("grid-area", `${i} / ${j}`);
        tile.onclick = () => hero.move(j, i); // event kliknięcia
        board.appendChild(tile);
    }
}

//Tworzenie i dodawanie do planszy bohatera
const hero = new Hero(startX, startY, board);*/

// ***********************************************************************



// Functions
async function initBoard(name) {
    let data;
    switch(name) {
        case "board1":
            data = await fetch("./board1.json")
                .then(response => response.json())
                .catch(err => console.log(err));
            //const response = await fetch("./board1.json");
            //data = await response.json();
            break;
    }
    if (data && validateBoardData(data)) {
        tiles = data.tiles;

        tilesY = tiles.length;
        tilesX = tiles[0].length;
        tileSize = 80; // Byłoby dobrze, gdyby było ustalane na podstawie ilości kafelków w poziomie

        // Zamiast zmieniać ustawienia grida, zmieniamy same css variables
        html.style.setProperty("--board-tile-size", tileSize+"px");
        html.style.setProperty("--board-tiles-x", tilesX);
        html.style.setProperty("--board-tiles-y", tilesY);

        // Czyszczonko planszy
        clearDiv(board);

        // I wypełnianko kafelkami
        for(let i=1; i<=tilesY; i++) {
            for(let j=1; j<=tilesX; j++) {
                const tile = document.createElement("div");
                tile.setAttribute("id",`tile-${i}-${j}`);
                //tile.setAttribute("class",`tile-${tiles[i-1][j-1]}`);
                tile.style.setProperty("grid-area", `${i} / ${j}`);
                //tile.onclick = () => hero.move(j, i); // event kliknięcia
                board.appendChild(tile);
            }
        }

        //Tworzenie i dodawanie do planszy bohatera
        const {startX, startY} = data; // heroX = data.startX; heroY = data.startY; // object destructuring
        hero = new Hero(startX, startY, board);

        setTilesVisibility();
    }
}

function validateBoardData(data) {
    return true;
}

function setTilesVisibility() {
    for(let i=1; i<=tilesY; i++) {
        for(let j=1; j<=tilesX; j++) {
            const tile = document.querySelector(`#tile-${i}-${j}`);
            if (taxiDist(j,i,hero.x,hero.y)<=2) {
                tile.setAttribute("class",`tile-${tiles[i-1][j-1]}`);
            } else {
                tile.setAttribute("class", "tile-dark");
            }
            if(taxiDist(j,i,hero.x,hero.y)===1 && tiles[i-1][j-1]==="ground") {
                tile.onclick = () => {
                    hero.move(j, i);
                    setTilesVisibility();
                } // event kliknięcia
            } else {
                tile.onclick = null;
            }
        }
    }
}