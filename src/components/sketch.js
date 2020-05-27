import p5 from '../../libraries/p5';
import Matrix from './Matrix.js'

let grid;
let cols;
let rows;
let resolution = 10;

const s = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(window.screen.width, window.screen.height);
        cols = sketch.width / resolution;
        rows = sketch.height / resolution;

        grid = new Matrix(cols, rows);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = sketch.floor(sketch.random(2));
            }
        }
        console.table(grid);
        
    };

    sketch.draw = () => {
        sketch.background(0);

        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                let x = i * resolution;
                let y = j * resolution;
                
                if (grid[i][j] == 1) {
                    sketch.fill(255);
                    sketch.stroke(0)
                    sketch.rect(x, y, resolution-1, resolution-1);
                }
            }
        }

        // creating another matrix that represents the new/next generation
        let next = new Matrix(cols, rows);

        // compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];

                // count nearby cells
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);
                
                // if there are 3 neighbors, the cell will become alive
                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                }
                // if the cell is alive and there are less than 2 or more than 3 neighbors, the cell dies
                else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                }
                else next[i][j] = state;
            }
        }
        grid = next;
    };
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}



let myP5 = new p5(s)
