export default function BubbleSort(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.fontSize = 25;
    this.ctx.font = `bold 24px serif`;
    this.iMove = {};
    this.jMove = {};
    this.timeOut = 500;
    this.timeAnimation = new Date();
    this.xCoord = 50;
    this.yCoord = 50;
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
        this.changeSort(i, j, loop);
    } else {
        this.sort(j, j + 1, loop);
    }
}

BubbleSort.prototype.changeSort = function (i, j, loop) {
    this.timeAnimation = new Date();
    this.iMove = { x: this.xCoord, y: this.yCoord * (i + 1), index: i, loop: loop };
    this.jMove = { x: this.xCoord, y: this.yCoord * (j + 1), index: j, loop: loop };
    window.requestAnimationFrame(() => { this.step() });
}

BubbleSort.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.array.length; i++) {
        this.ctx.fillText(this.array[i], this.xCoord, this.yCoord * (i + 1));
    }
}

BubbleSort.prototype.step = function () {
    if (new Date() - this.timeAnimation <= this.timeOut) {
        let ratioY = (new Date() - this.timeAnimation) / this.timeOut;
        let ratioX = Math.sin(Math.PI * ratioY);
        this.drawStepI(ratioX, ratioY);
        this.drawStepJ(ratioX, ratioY);
        window.requestAnimationFrame(() => { this.step() });
    } else {
        let temp = this.array[this.jMove.index];
        this.array[this.jMove.index] = this.array[this.iMove.index];
        this.array[this.iMove.index] = temp;
        this.draw();
        this.sort(this.jMove.index, this.jMove.index + 1, this.jMove.loop);
    }
}

BubbleSort.prototype.drawStepI = function (ratioX, ratioY) {
    this.ctx.clearRect(this.iMove.x, this.iMove.y - this.fontSize, this.fontSize, this.fontSize);
    this.iMove.x = this.xCoord + this.xCoord * 0.5 * ratioX;
    this.iMove.y = this.yCoord * (this.iMove.index + 1) + this.yCoord * (this.jMove.index - this.iMove.index) * ratioY;
    this.ctx.fillText(this.array[this.iMove.index], this.iMove.x, this.iMove.y);

}

BubbleSort.prototype.drawStepJ = function (ratioX, ratioY) {
    this.ctx.clearRect(this.jMove.x, this.jMove.y - this.fontSize, this.fontSize, this.fontSize);
    this.jMove.x = this.xCoord + this.xCoord * 1.6 * ratioX;
    this.jMove.y = this.yCoord * (this.jMove.index + 1) - this.yCoord * (this.jMove.index - this.iMove.index) * ratioY;
    this.ctx.fillText(this.array[this.jMove.index], this.jMove.x, this.jMove.y);
}
