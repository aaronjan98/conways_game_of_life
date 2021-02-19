import p5 from '../../libraries/p5';
import Matrix from './Matrix.js';

let   grid
    , next
    , cols
    , rows
    , resolution = 10
    , maxTotal = 0
    , genCounter = 0
    , counter = 0
    , timer
    , fr = 40
    , interval = true
    , button
    , pauseBtn
    , clearBtn;

const s = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        cols = sketch.width / resolution;
        rows = sketch.height / resolution;

        createGrid();
        
        // Button event to pause and play
        pauseBtn = sketch.createButton('pause');
        pauseBtn.mousePressed(changeFrameRate);
        // Button event to clear the grid
        clearBtn = sketch.createButton('clear');
        clearBtn.mousePressed(clearGrid);
    };

    function createGrid() {
        grid = new Matrix(cols, rows, 'random');
        return grid;
    }

    function changeFrameRate() {
        if(interval) {
            fr = 0;
            sketch.frameRate(fr);
            pauseBtn.html('play');
            interval = false;
        }
        else {
            fr = 40;
            sketch.frameRate(fr);
            pauseBtn.html('pause');
            interval = true;
        }
    }

    function clearGrid() {
        interval = true;
        changeFrameRate();
        grid = new Matrix(cols, rows, 'clear');
        genCounter = 0;
        sketch.redraw();
    }

    sketch.draw = () => {
        
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                let x = i * resolution;
                let y = j * resolution;
                
                if (grid[i][j].total > maxTotal) {
                    maxTotal = grid[i][j].total;
                }

                // normalize maxTotal and scale the hsl value accordingly
                const normalized = grid[i][j].total / maxTotal;
                if (grid[i][j].total == 0) {
                    normalized = 0;
                }
                // normalized should be a value between 0 and 1
                const h = (1 - normalized) * 240;
                
                sketch.fill(`hsl(${Math.floor(h)}, 100%, 50%)`);
                // sketch.noStroke();
                sketch.rect(x, y, resolution, resolution);
            }
        }


        // creating another matrix that represents the new/next generation
        next = new Matrix(cols, rows, 'clear');
        // if (genCounter == 1) {
        //     fr = 0;
        // }
        // debugger

        // compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // transfer total count from the prev gen. to this next generation
                next[i][j].total = grid[i][j].total;
                let state = grid[i][j].currentstate;

                // count nearby cells
                let neighbors = countNeighbors(grid, i, j);
                
                // if there are 3 neighbors, the cell will become alive
                if (state == 0 && neighbors == 3) {
                    next[i][j].setState(1);
                }
                // if the cell is alive and there are less than 2 or more than 3 neighbors, the cell dies
                else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j].setState(0);
                }
                // if surrounded by two or three cells, it'll stay alive
                else next[i][j].setState(state);
            }
        }
        genCounter += 1;
        

        // calls to display generation
        drawWords();
        
        // swap the hidden buffer to display
        grid = next;

    };

    // display generation
    function drawWords() {
        sketch.fill(200);
        sketch.text(`Generation: ${genCounter}`, sketch.windowWidth / 2 - 50, sketch.windowHeight - 10);
        
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row].currentstate;
        }
    }
    sum -= grid[x][y].currentstate;
    return sum;
}

new p5(s)