let fileName = window.location.pathname.split("/").pop();
let opponent = document.querySelectorAll(".player")[1].innerHTML;
let round = 0;
let grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

names = document.querySelectorAll(".player");
names[round].style.textDecoration = "underline 4px solid wheat";

for (let i = 0; i < tiles.length; i++) {
  for (let j = 0; j < tiles[i].length; j++) {
    let element = tiles[i][j];
    let x = i;
    let y = j;

    element.addEventListener("click", () => {
      makeMove(element, x, y);
    });
  }
}

function makeMove(element, x, y) {
  if (element.innerHTML == "" && grid[x][y] == null) {
    element.innerHTML = players[round];
    grid[x][y] = round;
    checkWin();

    if (fileName == "player.html") {
      names[round].style.textDecoration = "none";
      round = 1 - round;
      names[round].style.textDecoration = "underline 4px solid wheat";
    } else if (
      fileName == "ai.html" ||
      fileName == "index.html" ||
      fileName == ""
    ) {
      moves = makeAiMove();
      grid[moves[0]][moves[1]] = 1;
      tiles[moves[0]][moves[1]].innerHTML = players[1];
      checkWin();
    }
  }
}

function checkWin() {
  //horizontal
  for (let x = 0; x < 3; x++) {
    if (
      grid[x][0] != null &&
      grid[x][0] == grid[x][1] &&
      grid[x][1] == grid[x][2]
    ) {
      win(grid[x][0] == 0 ? "Player" : opponent);
      return true;
    }
  }

  //vertical
  for (let y = 0; y < 3; y++) {
    if (
      grid[0][y] != null &&
      grid[0][y] == grid[1][y] &&
      grid[1][y] == grid[2][y]
    ) {
      win(grid[0][y] == 0 ? "Player" : opponent);
      return true;
    }
  }

  //others
  if (
    (grid[0][0] != null &&
      grid[0][0] == grid[1][1] &&
      grid[1][1] == grid[2][2]) ||
    (grid[2][0] != null && grid[2][0] == grid[1][1] && grid[1][1] == grid[0][2])
  ) {
    win(grid[1][1] == 0 ? "Player" : opponent);
    return true;
  }

  if (!isMovesLeft()) {
    win("nobody");
  }
}

function win(name) {
  const reset = document.querySelector(".reset");

  reset.classList.add("active");
  reset.innerHTML =
    "<h1> The game is won by " +
    name +
    "<h1><br>" +
    "<button type='button' class='reset-btn btn btn-outline-secondary'>New game</button>";

  let btn = document.querySelector(".reset-btn");
  btn.addEventListener("click", () => {
    reset.classList.remove("active");
    reset.innerHTML = "";

    resetGrid();
  });
}

function resetGrid() {
  round = 0;
  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      let element = tiles[i][j];
      element.innerHTML = "";
    }
  }
}

function isMovesLeft() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] == null) return true;
    }
  }
  return false;
}
