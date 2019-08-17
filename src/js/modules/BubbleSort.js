export default class BubbleSort {

    constructor(canvas) {

        this.animationDuration = 400;
        this.xCoordFactor = 50;
        this.yCoordFactor = 50;
        this.fontSize = 24;
        this.timeAnimation = new Date();

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = `bold ${this.fontSize}px serif`;
        this.iMove = {};
        this.jMove = {};
        this.array = null;
        this.random();
        this.draw();
        this.sort();
    }

    random() {
        this.array = new Array();
        for (let i = 0; i < 8; i++) {
            this.array.push(Math.floor(Math.random() * 100));
        }
    }

    sort(i = 0, j = 1, loop = 0) {
        if (loop === this.array.length) return;
        if (i === this.array.length || j === this.array.length - loop) {
            this.sort(0, 1, ++loop);
            return;
        }
        if (this.array[i] > this.array[j]) {
            this._changeSort(i, j, loop);
        } else {
            this.sort(j, j + 1, loop);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.array.length; i++) {
            this.ctx.fillText(this.array[i], this.xCoordFactor, this.yCoordFactor * (i + 1));
        }
    }

    _changeSort(i, j, loop) {
        this.timeAnimation = new Date();
        this.iMove = { x: this.xCoordFactor, y: this.yCoordFactor * (i + 1), index: i, loop: loop };
        this.jMove = { x: this.xCoordFactor, y: this.yCoordFactor * (j + 1), index: j, loop: loop };
        window.requestAnimationFrame(() => { this._step() });
    }

    _step() {
        if (new Date() - this.timeAnimation <= this.animationDuration) {
            let ratioY = (new Date() - this.timeAnimation) / this.animationDuration;
            let ratioX = Math.sin(Math.PI * ratioY);
            this._drawStepI(ratioX, ratioY);
            this._drawStepJ(ratioX, ratioY);
            window.requestAnimationFrame(() => { this._step() });
        } else {
            let temp = this.array[this.jMove.index];
            this.array[this.jMove.index] = this.array[this.iMove.index];
            this.array[this.iMove.index] = temp;
            this.draw();
            this.sort(this.jMove.index, this.jMove.index + 1, this.jMove.loop);
        }
    }
    _drawStepI(ratioX, ratioY) {
        this.ctx.clearRect(this.iMove.x, this.iMove.y - this.fontSize, this.fontSize, this.fontSize);
        this.iMove.x = this.xCoordFactor + this.xCoordFactor * 0.5 * ratioX;
        this.iMove.y = this.yCoordFactor * (this.iMove.index + 1) + this.yCoordFactor * (this.jMove.index - this.iMove.index) * ratioY;
        this.ctx.fillText(this.array[this.iMove.index], this.iMove.x, this.iMove.y);

    }
    _drawStepJ(ratioX, ratioY) {
        this.ctx.clearRect(this.jMove.x, this.jMove.y - this.fontSize, this.fontSize, this.fontSize);
        this.jMove.x = this.xCoordFactor + this.xCoordFactor * 1.6 * ratioX;
        this.jMove.y = this.yCoordFactor * (this.jMove.index + 1) - this.yCoordFactor * (this.jMove.index - this.iMove.index) * ratioY;
        this.ctx.fillText(this.array[this.jMove.index], this.jMove.x, this.jMove.y);
    }

}




