export default class QuickSort {

    constructor(canvas) {
        this.sortName = '快速排序算法';
        this.elementCount = 14;
        this.yCoordStart = 10;
        this.yCoordEnd = 520;
        this.animationDuration = 200;
        this.yCoordHeight = this.yCoordEnd - this.yCoordStart;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.array = null;
        this.itemWidth = this.canvas.width / this.elementCount / 2;
        this.changeArray = [];

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
                    this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)) });
                    break;
                }
                this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)) });

            }
            for (start1; start1 < end1; start1++) {
                if (this.array[start1] > this.array[end1]) {
                    let temp = this.array[start1];
                    this.array[start1] = this.array[end1];
                    this.array[end1] = temp
                    this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)) });
                    break;
                }
                this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)) });

            }
        }
        this.sort(start, start1)
        this.sort(start1 + 1, end)
    }

    drawSort(loop) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let changeArrayItem = this.changeArray[loop];
        for (let i = 0; i < this.elementCount; i++) {
            let height = this.yCoordHeight * (changeArrayItem.snapshot[i] / 100);
            if (i === changeArrayItem.sourceIndex) {
                this.ctx.fillStyle = '#333'
            } else {
                this.ctx.fillStyle = '#999'
            }
            this.ctx.fillRect(this.itemWidth * i * 2 + this.itemWidth / 2, this.yCoordEnd, this.itemWidth, -height);
        }
        this.ctx.beginPath()
        this.ctx.bezierCurveTo(this.itemWidth * changeArrayItem.sourceIndex * 2 + this.itemWidth / 2, this.yCoordEnd + 5,
            this.itemWidth * (changeArrayItem.sourceIndex + changeArrayItem.targetIndex) + this.itemWidth, this.yCoordEnd + 60,
            this.itemWidth * changeArrayItem.targetIndex * 2 + this.itemWidth + + this.itemWidth / 2, this.yCoordEnd + 5);

        this.ctx.stroke();
        if (loop < this.changeArray.length - 1) {
            setTimeout(() => { this.drawSort(++loop); }, this.animationDuration)
        } else {
            setTimeout(() => { this.draw(); }, this.animationDuration)

        }
    }
}