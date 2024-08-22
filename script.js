function getSudoku() {
    const inputs = document.querySelectorAll('.sudoku input');
    const sudoku = [];

    for (let i = 0; i < inputs.length; i += 9) {
        const row = Array.from(inputs).slice(i, i + 9).map(input => input.value || '.');
        sudoku.push(row);
    }

    return sudoku;
}

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
    console.log(res);
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

function showResult(res) {
    const inputs = document.querySelectorAll('.sudoku input');

    const idx = 0; //i == 8 idx++ input.val = res[idx][i]
    for (let i = 0; i < inputs.length; i++) {
        if (i % 9 === 0 && i > 0) idx++;
        inputs[i].value = res[idx][i % 9];
    }
}

function solveSudoku() {
    const sudoku = getSudoku();
    console.log(sudoku);
    const isValid = isValidSudoku(sudoku);
    if (isValid) {
        const res = sudokuSolver(sudoku);
        showResult(res);
    } else {
        console.log("Some error occured!");
    }


}

console.log("aa");