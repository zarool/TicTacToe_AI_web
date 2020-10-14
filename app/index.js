let canvas = document.querySelector(".content");
let tiles = [[], [], []];

if (Math.random() < 0.5) players = ["O", "X"];
else players = ["X", "O"];

drawBoard();
setSize();

window.onresize = function () {
  setSize();
};

function setSize() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tiles[i][j].style.height = tiles[i][j].offsetWidth + "px";
    }
  }
}

function drawBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tile = document.createElement("div");
      tile.className = "tile";
      tiles[i][j] = tile;
      canvas.appendChild(tile);
    }
  }
}
