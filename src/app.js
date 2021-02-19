import Matrix from './components/Matrix.js'
// import sketch from './components/sketch.js'

const app = () => {
    // document.getElementById('app').innerHTML = sketch();
    document.getElementById('app').appendChild(Matrix());
}

// Load app
app()
