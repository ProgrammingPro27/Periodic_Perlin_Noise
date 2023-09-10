let perlin = new Perlin();
perlin.seed();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = 256;
canvas.width = canvas.height = w;
let gridSize = 4 //10;
let resolution = 256;

const colorStops = [
    { value: 0.0, color: { r: 0, g: 0, b: 0 } },
    { value: 0.5, color: { r: 50, g: 0, b: 50 } },
    { value: 0.55, color: { r: 0, g: 255, b: 0 } },
    { value: 0.6, color: { r: 255, g: 0, b: 0 } },
    { value: 0.7, color: { r: 20, g: 0, b: 0 } },
    { value: 1, color: { r: 0, g: 0, b: 0 } }
];

// default parameters (must be always 2 minimum !)
// const colorStops = [
//     { value: 0.0, color: { r: 0, g: 0, b: 0 } }, 
//     { value: 1, color: { r: 0, g: 255, b: 0 } }  
// ];

function getColorFromValue(value) {
    let lowerStop, upperStop;
    for (let i = 0; i < colorStops.length; i++) {
        if (value >= colorStops[i].value && value <= colorStops[i + 1].value) {
            lowerStop = colorStops[i];
            upperStop = colorStops[i + 1];
        }
    }

    // Interpolate between the two color stops based on the noise value.
    const t = (value - lowerStop.value) / (upperStop.value - lowerStop.value);
    const r = Math.round(lowerStop.color.r + t * (upperStop.color.r - lowerStop.color.r));
    const g = Math.round(lowerStop.color.g + t * (upperStop.color.g - lowerStop.color.g));
    const b = Math.round(lowerStop.color.b + t * (upperStop.color.b - lowerStop.color.b));

    return `rgb(${r},${g},${b})`;
}

function render() {
    let pixSize = w / resolution;
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    for (let y = 0; y < gridSize; y += gridSize / resolution) {
        for (let x = 0; x < gridSize; x += gridSize / resolution) {
            let noiseValue = (perlin.get(x, y, gridSize) / 2 + 0.5);
            ctx.fillStyle = getColorFromValue(noiseValue);
            ctx.fillRect(x * (w / gridSize), y * (w / gridSize), pixSize, pixSize);
        }
    }
}

render();