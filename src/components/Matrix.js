
// var m = new Matrix(50, 40)

function Matrix(rows, cols) {
    console.log('hi');
    
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let i = 0; i < this.rows; i++) {
        this.matrix[i] = [];
        for (let j = 0; j < this.cols; j++) {
            this.matrix[i][j] = 0;
        }
    }
}

var m = new Matrix(2, 3)
console.log('m', m);


export default Matrix;