import Matrix from './components/Matrix.js'

const app = () => {
    // document.getElementById('app').innerHTML = Matrix();
    document.getElementById('app').appendChild(Matrix());
}
let n = new Matrix(5, 3);
console.table(n.matrix);
// Load app
app()
