let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let perlin = new Perlin();
perlin.seed();

let w = 256;
canvas.width = canvas.height = w;
let numOfPoints = 5;

function createPerlinTexture() {
    let imageData = ctx.createImageData(w, w);
    for (let y = 0; y < w; y++) {
        for (let x = 0; x < w; x++) {
            let v = parseInt((perlin.get(x * numOfPoints / w, y * numOfPoints / w, numOfPoints) / 2 + 0.5) * 255);
            let index = (y * w + x) * 4;
            imageData.data[index] = v;
            imageData.data[index + 1] = v;
            imageData.data[index + 2] = v;
            imageData.data[index + 3] = 255;
        }
    }
    return imageData;
}

function render() {
    let imageData = createPerlinTexture();
    ctx.putImageData(imageData, 0, 0);
}
render();
