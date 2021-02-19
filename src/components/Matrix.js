
class Cell {
    constructor() {
        this.currentstate = 0;
        this.total = 0;
    }
    setState(state) {
        this.currentstate = state;
        this.total += state;
    }
    randomGrid() {
        this.currentstate = Math.floor(Math.random() * 2);
    }
    clear() {
        this.currentstate = 0;
    }
}

function Matrix(rows, cols, pattern) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let i = 0; i < this.rows; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < this.cols; j++) {
            this.matrix[i][j] = new Cell();
            if (pattern == 'clear'){
                this.matrix[i][j].clear();
            }
            if (pattern == 'random') {
                this.matrix[i][j].randomGrid();
            }
        }
    }
    return this.matrix;
}


export default Matrix;