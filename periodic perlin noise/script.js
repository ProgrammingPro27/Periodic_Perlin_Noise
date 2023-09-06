let perlin = new Perlin();
perlin.seed();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = 256;
canvas.width = canvas.height = w;
let gridSize = 4;
let resolution = 64;

function render() {
    let pixSize = w / resolution;
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    for (let y = 0; y < gridSize; y += gridSize / resolution) {
        for (let x = 0; x < gridSize; x += gridSize / resolution) {
            let v = parseInt((perlin.get(x, y, gridSize) / 2 + 0.5) * 255);
            ctx.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
            ctx.fillRect(x * (w / gridSize), y * (w / gridSize), pixSize, pixSize);
        }
    }
}
render();