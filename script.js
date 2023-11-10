document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.getElementById("game-board");
  const rows = 7;
  const cols = 6;
  const cardSuits = ["♠", "♣", "♦", "♥"];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = getRandomSuit();
      cell.addEventListener("click", handleCellClick);
      cell.addEventListener("mouseover", handleCellMouseOver);
      cell.addEventListener("mouseout", handleCellMouseOut);
      gameBoard.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    const selectedCell = event.target;
    const selectedRow = parseInt(selectedCell.dataset.row);
    const selectedCol = parseInt(selectedCell.dataset.col);
    const selectedValue = selectedCell.textContent;

    removeConnectedCells(selectedRow, selectedCol, selectedValue);
  }

  function handleCellMouseOver(event) {
    const selectedCell = event.target;
    const selectedRow = parseInt(selectedCell.dataset.row);
    const selectedCol = parseInt(selectedCell.dataset.col);
    const selectedValue = selectedCell.textContent;

    highlightConnectedCells(selectedRow, selectedCol, selectedValue);
  }

  function handleCellMouseOut(event) {
    const selectedCell = event.target;
    removeHighlightFromCells();
  }

  function removeHighlightFromCells() {
    const highlightedCells = document.querySelectorAll(".highlighted");
    highlightedCells.forEach((cell) => cell.classList.remove("highlighted"));
  }

  function highlightConnectedCells(row, col, value) {
    const stack = [{ row, col }];
    const visited = new Set();

    while (stack.length > 0) {
      const { row, col } = stack.pop();
      const cell = document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      );

      if (cell && !visited.has(cell) && cell.textContent === value) {
        cell.classList.add("highlighted");

        const neighbors = [
          { row: row - 1, col },
          { row: row + 1, col },
          { row, col: col - 1 },
          { row, col: col + 1 },
        ];

        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }

      visited.add(cell);
    }
  }

  function removeConnectedCells(row, col, value) {
    const stack = [{ row, col }];
    const visited = new Set();

    while (stack.length > 0) {
      const { row, col } = stack.pop();
      const cell = document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      );

      if (cell && !visited.has(cell) && cell.textContent === value) {
        cell.textContent = "";
        cell.classList.add("removed");
        const neighbors = [
          { row: row - 1, col },
          { row: row + 1, col },
          { row, col: col - 1 },
          { row, col: col + 1 },
        ];

        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }

      visited.add(cell);
    }
  }

  function getRandomSuit() {
    return cardSuits[Math.floor(Math.random() * cardSuits.length)];
  }
});
