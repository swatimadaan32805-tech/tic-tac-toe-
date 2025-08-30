let P1 = true; // Player 1 (X) starts
let moves = [];
let choice = [null, null, null, null, null, null, null, null, null];
let emptyCells = 9;

// Reset the game
function resetGame() {
  P1 = true;
  emptyCells = 9;
  moves = [];
  choice = [null, null, null, null, null, null, null, null, null];
  document.getElementById("result").innerHTML = "1st Player Turn";
  for (let i = 1; i <= 9; i++) {
    const button = document.getElementById("box" + i);
    button.innerHTML = "";
    button.disabled = false;
  }
}

// Undo last move
function undoMove() {
  if (moves.length > 0) {
    const idx = moves.pop();
    const button = document.getElementById("box" + idx);
    button.innerHTML = "";
    button.disabled = false;
    choice[idx - 1] = null;
    P1 = !P1;
    document.getElementById("result").innerHTML = P1 ? "1st Player Turn" : "2nd Player Turn";
    emptyCells++;
  }
}

// Handle player move
function box(idx) {
  let pos = idx - 1;
  if (choice[pos] == null) {
    let cell = document.getElementById("box" + idx);
    cell.innerHTML = P1 ? "X" : "O";
    choice[pos] = P1 ? "X" : "O";
    moves.push(idx);
    cell.disabled = true;
    emptyCells--;
    P1 = !P1;
    document.getElementById("result").innerHTML = P1 ? "1st Player Turn" : "2nd Player Turn";
    checkResult();
  }
}

// Check for winner or draw
function checkResult() {
  let winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  let hasWinner = false;
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (choice[a] && choice[a] === choice[b] && choice[b] === choice[c]) {
      playWinSound();
      document.getElementById("result").innerHTML = choice[a] == "X" ? "Player 1 Wins!" : "Player 2 Wins!";
      for (let i = 1; i <= 9; i++) {
        document.getElementById("box" + i).disabled = true;
      }
      hasWinner = true;
      setTimeout(resetGame, 4000);
      return;
    }
  }
  if (!hasWinner && emptyCells == 0) {
    document.getElementById("result").innerHTML = "It's a Draw!";
    playTieSound();
    setTimeout(resetGame, 4000);
  }
}

// Audio functions
function playWinSound() {
  document.getElementById("win").play();
}
function playTieSound() {
  document.getElementById("tie").play();
}