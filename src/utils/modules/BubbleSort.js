export default class BubbleSort {
    static sortName = '冒泡排序';
    constructor(option) {
        this.elementCount = option.elementCount;
        this.animationDuration = option.animationDuration || 400;


        this.canvas = document.createElement("canvas");
        this.canvas.width = option.canvasPositon.width;
        this.canvas.height = option.canvasPositon.height;
        document.body.appendChild(this.canvas);


        this.xCoordFactor = 50;
        this.yCoordFactor = (this.canvas.height - 50) / this.elementCount;
        this.fontSize = this.canvas.height / this.elementCount / 1.5;


        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = `bold ${this.fontSize}px serif`;


        this.iMove = {};
        this.jMove = {};
        this.array = null;
        //时间， 记录动画时刻
        this.timeAnimation = null;
        this.loop = 0;

    }
    destory() {
        document.body.removeChild(this.canvas);
    }

    begin() {
        this.random();
        this.draw();
        this.sort();
    }

    random() {
        this.array = new Array();
        for (let i = 0; i < this.elementCount; i++) {
            this.array.push(Math.floor(Math.random() * 100));
        }
    }

    sort(i = 0, j = 1) {
        if (this.loop === this.array.length) return;
        if (i === this.array.length || j === this.array.length - this.loop) {
            this.sort(0, 1, ++this.loop);
            return;
        }
        if (this.array[i] > this.array[j]) {
            this._changeSort(i, j, true);
        } else {
            this._changeSort(i, j, false);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.array.length; i++) {
            this.ctx.fillText(this.array[i], this.xCoordFactor, this.yCoordFactor * (i + 1));
        }
    }

    _changeSort(i, j, changeBoolen) {
        this.timeAnimation = new Date();
        this.iMove = { x: this.xCoordFactor, y: this.yCoordFactor * (i + 1), index: i };
        this.jMove = { x: this.xCoordFactor, y: this.yCoordFactor * (j + 1), index: j };
        this._step(changeBoolen);
    }

    _step(changeBoolen) {
        if (new Date() - this.timeAnimation <= this.animationDuration) {
            let ratioY = (new Date() - this.timeAnimation) / this.animationDuration;
            let ratioX = Math.sin(Math.PI * ratioY);
            this._drawStep(this.iMove, ratioX * (changeBoolen ? 0.5 : 0.5), (changeBoolen ? ratioY : 0));
            this._drawStep(this.jMove, ratioX * (changeBoolen ? 1.5 : 0.5), (changeBoolen ? -ratioY : 0));
            window.requestAnimationFrame(() => { this._step(changeBoolen) });
        } else {
            if (changeBoolen) {
                let temp = this.array[this.jMove.index];
                this.array[this.jMove.index] = this.array[this.iMove.index];
                this.array[this.iMove.index] = temp;
            }
            this.draw();
            this.sort(this.jMove.index, this.jMove.index + 1);
        }
    }
    _drawStep(move, ratioX, ratioY) {
        this.ctx.clearRect(move.x, move.y - this.fontSize, this.fontSize, this.fontSize);
        move.x = this.xCoordFactor + this.xCoordFactor * ratioX;
        move.y = this.yCoordFactor * (move.index + 1) + this.yCoordFactor * ratioY;
        this.ctx.fillText(this.array[move.index], move.x, move.y);

    }



}




