export default class QuickSort {
    static sortName = '快速排序';
    constructor(option) {
        this.elementCount = option.elementCount;
        this.animationDuration = option.animationDuration || 400;

        this.canvas = document.createElement("canvas");
        this.canvas.width = option.canvasPositon.width;
        this.canvas.height = option.canvasPositon.height;
        document.body.appendChild(this.canvas);


        this.yCoordStart = 10;
        this.yCoordEnd = this.canvas.height - 80;
        this.yCoordHeight = this.yCoordEnd - this.yCoordStart;

        this.ctx = this.canvas.getContext("2d");
        this.array = null;
        this.itemWidth = this.canvas.width / this.elementCount / 2;
        this.changeArray = [];

    }
    destory() {
        document.body.removeChild(this.canvas);
    }
    begin() {
        this.random();
        this.draw();
        this.sort(0, this.elementCount - 1);
        this.drawSort(0);
    }
    random() {
        this.array = new Array();
        for (let i = 0; i < this.elementCount; i++) {
            this.array.push(Math.floor(Math.random() * 100 + 1));
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ccc'
        for (let i = 0; i < this.elementCount; i++) {
            let height = this.yCoordHeight * (this.array[i] / 100);
            this.ctx.fillRect(this.itemWidth * i * 2 + this.itemWidth / 2, this.yCoordEnd, this.itemWidth, -height);
        }
    }
   
}