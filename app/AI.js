makeAiMove = function () {
  return findBestMove();
};

findBestMove = function () {
  let bestVal = -10000;
  let col = -1;
  let row = -1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] == null) {
        grid[i][j] = 1;
        let moveVal = minimax(grid, 0, false);
        grid[i][j] = null;

        if (moveVal > bestVal) {
          row = i;
          col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  return [row, col];
};

minimax = function (grid, depth, isMax) {
  let score = evaluate(grid);

  if (score == 10 || score == -10) return score;

  if (isMovesLeft(grid) == false) return 0;

  if (isMax) {
    let best = -10000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] == null) {
          grid[i][j] = 1;
          let score = minimax(grid, depth + 1, false);

          grid[i][j] = null;
          best = Math.max(best, score);
        }
      }
    }
    return best;
  } else {
    let best = 10000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] == null) {
          grid[i][j] = 0;
          let score = minimax(grid, depth + 1, true);

          grid[i][j] = null;
          best = Math.min(best, score);
        }
      }
    }
    return best;
  }
};

isMovesLeft = function () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] == null) return true;
    }
  }
  return false;
};

evaluate = function () {
  //horizontal
  for (let x = 0; x < 3; x++) {
    if (
      grid[x][0] != null &&
      grid[x][0] == grid[x][1] &&
      grid[x][1] == grid[x][2]
    ) {
      if (grid[x][0] == 1) return +10;
      else if (grid[x][0] == 0) return -10;
    }
  }

  //vertical
  for (let y = 0; y < 3; y++) {
    if (
      grid[0][y] != null &&
      grid[0][y] == grid[1][y] &&
      grid[1][y] == grid[2][y]
    ) {
      if (grid[0][y] == 1) return +10;
      else if (grid[0][y] == 0) return -10;
    }
  }

  //others
  if (
    (grid[0][0] != null &&
      grid[0][0] == grid[1][1] &&
      grid[1][1] == grid[2][2]) ||
    (grid[2][0] != null && grid[2][0] == grid[1][1] && grid[1][1] == grid[0][2])
  ) {
    if (grid[1][1] == 1) return +10;
    else if (grid[1][1] == 0) return -10;
  }

  return 0;
};
