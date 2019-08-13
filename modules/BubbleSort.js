export default function BubbleSort(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.timeOut = 500;
    this.xCoord = 30;
    this.yCoord = 30;
    this.fontSize = 24;
    this.ctx.font = `${this.fontSize}px`; 
}

BubbleSort.prototype.random = function () {
    this.array = new Array();
    for (let i = 0; i < 8; i++) {
        this.array.push(Math.floor(Math.random() * 100));
    }
}
BubbleSort.prototype.sort = function (i = 0, j = 1, loop = 0) {
    if (loop === this.array.length) return;
    if (i === this.array.length || j === this.array.length - loop) {
        this.sort(0, 1, ++loop);
        return;
    }
    if (this.array[i] > this.array[j]) {
        this.drawSort(i, j);
        window.setTimeout(() => this.sort(j, j + 1, loop), this.timeOut);
    } else {
        this.sort(j, j + 1, loop);
    }
}

BubbleSort.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.array.length; i++) {
        this.ctx.fillText(this.array[i], this.xCoord, this.yCoord * (i + 1));
    }
}
BubbleSort.prototype.drawSort = function (i, j) { 
    let temp = this.array[j];
    this.array[j] = this.array[i];
    this.array[i] = temp;
    this.draw();
}