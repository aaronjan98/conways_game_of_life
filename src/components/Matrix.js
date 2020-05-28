
class Cell {
    constructor() {
        this.currentstate = Math.floor(Math.random() * 2);
        this.total = 0;
    }
    setState(state) {
        this.currentstate = state;
        this.total += state;
    }
}

function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let i = 0; i < this.rows; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < this.cols; j++) {
            this.matrix[i][j] = new Cell();
        }
    }
    return this.matrix;
}


export default Matrix;