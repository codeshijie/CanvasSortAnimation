export default class QuickSort {

    constructor(canvas) {

        this.elementCount = 14;
        this.yCoordStart = 30;
        this.yCoordEnd = 500;
        this.yCoordHeight = this.yCoordEnd - this.yCoordStart;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.array = null;
        this.itemWidth = this.canvas.width / this.elementCount / 2;
        this.random();
        this.draw();
        setTimeout(() => {

            this.sort(0, this.elementCount - 1);
            this.draw();
        }, 1000)
    }
    random() {
        this.array = new Array();
        for (let i = 0; i < this.elementCount; i++) {
            this.array.push(Math.floor(Math.random() * 100));
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#999'
        for (let i = 0; i < this.elementCount; i++) {
            let height = this.yCoordHeight * (this.array[i] / 100);
            this.ctx.fillRect(this.itemWidth * i * 2 + this.itemWidth / 2, this.yCoordEnd, this.itemWidth, -height);
        }
    }
    sort(start, end) {
        if (start >= end) return;
        let start1 = start;
        let end1 = end;
        while (true) {
            if (start1 >= end1) {
                break;
            }
            for (end1; end1 > start1; end1--) {
                if (this.array[start1] > this.array[end1]) {
                    let temp = this.array[start1];

                    this.array[start1] = this.array[end1];
                    this.array[end1] = temp;
                    break;
                }

            }
            for (start1; start1 < end1; start1++) {
                if (this.array[start1] > this.array[end1]) {
                    let temp = this.array[start1];
                    this.array[start1] = this.array[end1];
                    this.array[end1] = temp
                    break;
                }

            }
        }
        this.sort(start, start1)
        this.sort(start1 + 1, end)
    }
}