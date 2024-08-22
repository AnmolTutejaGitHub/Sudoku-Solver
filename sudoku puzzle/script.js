function isValidSudoku(sudoku) {
    const rows = [];
    for (let i = 0; i < 9; i++) rows.push(new Set());

    const cols = [];
    for (let i = 0; i < 9; i++) cols.push(new Set());

    const boxes = [];
    for (let i = 0; i < 3; i++) {
        const box = [];
        boxes.push(box);
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boxes[i].push(new Set());
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == '.') continue;
            if (rows[i].has(sudoku[i][j])) return false;
            rows[i].add(sudoku[i][j]);

            if (cols[j].has(sudoku[i][j])) return false;
            cols[j].add(sudoku[i][j]);

            const a = Math.floor(i / 3);
            const b = Math.floor(j / 3);
            if (boxes[a][b].has(sudoku[i][j])) return false;
            boxes[a][b].add(sudoku[i][j]);
        }
    }
    return true;
}


function sudokuSolver(sudoku) {
    const res = [];
    for (let i = 0; i < 9; i++) res.push([]);
    backtrack(sudoku, 0, 0, res);
    return res;
}

function backtrack(sudoku, row, col, res) {
    if (row == 9) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                res[i][j] = sudoku[i][j];
            }
        }
        return;
    }

    if (sudoku[row][col] != '.') {
        if (col < 8) backtrack(sudoku, row, col + 1, res);
        else backtrack(sudoku, row + 1, 0, res);
        return;
    }

    for (let i = 1; i <= 9; i++) {
        if (canPlace(i, sudoku, row, col)) {
            if (col < 8) backtrack(sudoku, row, col + 1, res);
            else backtrack(sudoku, row + 1, 0, res);
            sudoku[row][col] = '.';
        }
    }
}

function canPlace(cur, sudoku, row, col) {
    const curr = String(cur);
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] == curr || sudoku[i][col] == curr) return false;
    }

    const nRow = (Math.floor(row / 3)) * 3;
    const nCol = (Math.floor(col / 3)) * 3;

    for (let i = nRow; i < nRow + 3; i++) {
        for (let j = nCol; j < nCol + 3; j++) {
            if (sudoku[i][j] == curr) return false;
        }
    }

    sudoku[row][col] = curr;
    return true;

}

///////////////////////////
function generateSudoku() {
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
        sudoku.push([]);
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudoku[i].push('.');
        }
    }

    //clearInputs();
    fillDiagonalSubgrids(sudoku);
    const newSudoku = sudokuSolver(sudoku);
    removeRandomly(newSudoku);
    displayUser(newSudoku);
    //const solvedSudoku = sudokuSolver(newSudoku);
    // console.log(solvedSudoku);
}

function fillDiagonalSubgrids(sudoku) {

    arr = [];
    for (let i = 1; i <= 9; i++) arr.push(i);


    let idx = 0;
    randomShuffle(arr);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            sudoku[i][j] = String(arr[idx++]);
        }
    }

    idx = 0;
    randomShuffle(arr);
    for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 6; j++) {
            sudoku[i][j] = String(arr[idx++]);
        }
    }

    idx = 0;
    randomShuffle(arr);
    for (let i = 6; i < 9; i++) {
        for (let j = 6; j < 9; j++) {
            sudoku[i][j] = String(arr[idx++]);
        }
    }
}

function randomShuffle(arr) {
    for (let i = 0; i < 9; i++) {
        let j = Math.floor(Math.random() * 9);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}


function removeRandomly(sudoku) {
    for (let l = 0; l < 75; l++) {
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        sudoku[i][j] = '.';
    }
}

function displayUser(sudoku) {
    const inputs = document.querySelectorAll(".sudoku input");

    let r = 0;
    let c = 0;

    for (let i = 0; i < inputs.length; i++) {
        if (c == 9) {
            r++;
            c = 0;
        }
        if (sudoku[r][c] != '.') inputs[i].value = sudoku[r][c];
        c++;
    }
}


