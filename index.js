let isPlayerOne = true;
let cells = document.getElementsByClassName("cell");
let gameOver = false;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', userMove)
}

function userMove(e) {
    if (gameOver) return;

    let cell = e.target;
    let columnIndex = Array.from(cell.parentElement.children).indexOf(cell) % 7;

    for (let row = 5; row >= 0; row--) {
        let index = row * 7 + columnIndex;
        let targetCell = cells[index];
        if (!targetCell.style.background || targetCell.style.background === 'linear-gradient(to bottom, rgb(26, 26, 26), #3498db)') {
            targetCell.style.background = isPlayerOne ? "Red" : "yellow";

            setTimeout(() => {
                if (checkWin(index)) {
                    gameOver = true;
                    alert(isPlayerOne ? "Player 2 (Yellow) Wins!" : "Player 1 (Red) Wins!");

                    setTimeout(()=>{
                        location.reload();
                    },500);
                }
            },10)


            isPlayerOne = !isPlayerOne;
            break;
        }
    }

}

function checkWin(cellIndex) {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const rows = 6;
    const columns = 7;
    const row = Math.floor(cellIndex / columns);
    const col = cellIndex % columns;
    const currentColor = cells[cellIndex].style.backgroundColor;

    // 1. Check (→)
    for (let i = Math.max(0, col - 3); i <= Math.min(columns - 4, col); i++) {
        if (cells[row * columns + i].style.backgroundColor === currentColor &&
            cells[row * columns + i + 1].style.backgroundColor === currentColor &&
            cells[row * columns + i + 2].style.backgroundColor === currentColor &&
            cells[row * columns + i + 3].style.backgroundColor === currentColor) {
            return true;
        }
    }

    // 2. Check (↓)
    if (row <= rows - 4) {
        if (cells[cellIndex].style.backgroundColor === currentColor &&
            cells[(row + 1) * columns + col].style.backgroundColor === currentColor &&
            cells[(row + 2) * columns + col].style.backgroundColor === currentColor &&
            cells[(row + 3) * columns + col].style.backgroundColor === currentColor) {
            return true;
        }
    }

    // 3. Check (↘)
    for (let i = -3; i <= 0; i++) {
        if (row + i >= 0 && row + i + 3 < rows && col + i >= 0 && col + i + 3 < columns) {
            if (cells[(row + i) * columns + (col + i)].style.backgroundColor === currentColor &&
                cells[(row + i + 1) * columns + (col + i + 1)].style.backgroundColor === currentColor &&
                cells[(row + i + 2) * columns + (col + i + 2)].style.backgroundColor === currentColor &&
                cells[(row + i + 3) * columns + (col + i + 3)].style.backgroundColor === currentColor) {
                return true;
            }
        }
    }

    // 4. Check (↙)
    for (let i = -3; i <= 0; i++) {
        if (row + i >= 0 && row + i + 3 < rows && col - i - 3 >= 0 && col - i < columns) {
            if (cells[(row + i) * columns + (col - i)].style.backgroundColor === currentColor &&
                cells[(row + i + 1) * columns + (col - i - 1)].style.backgroundColor === currentColor &&
                cells[(row + i + 2) * columns + (col - i - 2)].style.backgroundColor === currentColor &&
                cells[(row + i + 3) * columns + (col - i - 3)].style.backgroundColor === currentColor) {
                return true;
            }
        }
    }

    return false;
}