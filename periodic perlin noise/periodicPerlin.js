function Perlin() {
}

Perlin.prototype.rand_vect = function () {
    let theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
};

Perlin.prototype.dot_prod_grid = function (x, y, vx, vy, period) {
    let g_vect;
    let d_vect = { x: x - vx, y: y - vy };

    vx %= period;
    vy %= period;

    if (this.gradients[[vx, vy]]) {
        g_vect = this.gradients[[vx, vy]];
    } else {
        g_vect = this.rand_vect();
        this.gradients[[vx, vy]] = g_vect;
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
};

Perlin.prototype.smootherstep = function (x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
};

Perlin.prototype.interp = function (x, a, b) {
    return a + this.smootherstep(x) * (b - a);
};

Perlin.prototype.seed = function () {
    this.gradients = {};
    this.memory = {};
};

Perlin.prototype.get = function (x, y, period) {
    if (this.memory.hasOwnProperty([x, y]))
        return this.memory[[x, y]];

    let xf = Math.floor(x);
    let yf = Math.floor(y);

    let tl = this.dot_prod_grid(x, y, xf, yf, period);
    let tr = this.dot_prod_grid(x, y, xf + 1, yf, period);
    let bl = this.dot_prod_grid(x, y, xf, yf + 1, period);
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1, period);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);
    this.memory[[x, y]] = v;
    return v;
};