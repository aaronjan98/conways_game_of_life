import p5 from '../../libraries/p5';
import Matrix from './Matrix.js'

let grid;
let cols;
let rows;
let resolution = 20;

const s = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(600, 400);
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
        // creating another matrix that represents the new/next generation
        let next = new Matrix(cols, rows);

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
    };
}



let myP5 = new p5(s)
