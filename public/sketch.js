import p5 from '../libraries/p5';

const s = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(300, 300);
    };

    sketch.draw = () => {
        sketch.background(51);
    };
}

let myP5 = new p5(s)