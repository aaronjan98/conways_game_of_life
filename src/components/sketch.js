import p5 from '../../libraries/p5';

let cols = 50;
let rows = 50;

const s = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(1500, 700);
    };

    sketch.draw = () => {
        sketch.background(51);
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                let x = i * 30;
                let y = j * 30;
                sketch.stroke(0);
                sketch.fill(255);
                sketch.rect(x, y, 30, 30);

            }
        }
    };
}

let myP5 = new p5(s)
