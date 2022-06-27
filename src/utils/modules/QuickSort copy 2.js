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
                    this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)), change: true });
                    break;
                }
                this.changeArray.push({ sourceIndex: start1, targetIndex: end1, snapshot: JSON.parse(JSON.stringify(this.array)) });

            }
            for (start1; start1 < end1; start1++) {
                if (this.array[start1] > this.array[end1]) {
                    let temp = this.array[start1];
                    this.array[start1] = this.array[end1];
                    this.array[end1] = temp
                    this.changeArray.push({ sourceIndex: end1, targetIndex: start1, snapshot: JSON.parse(JSON.stringify(this.array)), change: true });
                    break;
                }
                this.changeArray.push({ sourceIndex: end1, targetIndex: start1, snapshot: JSON.parse(JSON.stringify(this.array)) });

            }
        }
        this.sort(start, start1)
        this.sort(start1 + 1, end)
    }

    drawSort(loop) {
        let dateTimeNow = new Date();
        let changeArrayItem = this.changeArray[loop];
        if (changeArrayItem.change) {
            this.drawChangeItem(changeArrayItem, dateTimeNow)
        } else {
            this.drawUnChangeItem(changeArrayItem)
        }
        if (loop < this.changeArray.length - 1) {
            setTimeout(() => { this.drawSort(++loop); }, this.animationDuration)
        } else {
            setTimeout(() => { this.draw(); }, this.animationDuration)
        }
    }
    drawChangeItem(changeArrayItem, dateTime) {
        let ratio = (new Date() - dateTime) / this.animationDuration;
        if (ratio > 1) return;
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.elementCount; i++) {
            let height = this.yCoordHeight * (changeArrayItem.snapshot[i] / 100);
            if (i === changeArrayItem.sourceIndex) {
                this.ctx.fillStyle = '#f25022';
                this.ctx.globalCompositeOperation = "source-over";
                let x = this.itemWidth * changeArrayItem.sourceIndex * 2 + this.itemWidth / 2 + ((changeArrayItem.targetIndex - changeArrayItem.sourceIndex) * this.itemWidth * 2) * ratio
                this.ctx.fillRect(x, this.yCoordEnd, this.itemWidth, -height);

            } else if (i === changeArrayItem.targetIndex) {
                this.ctx.fillStyle = '#ffb901';
                this.ctx.globalCompositeOperation = "source-over";
                let x = this.itemWidth * changeArrayItem.targetIndex * 2 + this.itemWidth / 2 + ((changeArrayItem.sourceIndex - changeArrayItem.targetIndex) * this.itemWidth * 2) * ratio
                this.ctx.fillRect(x, this.yCoordEnd, this.itemWidth, -height);

            } else {
                this.ctx.fillStyle = '#ccc'
                this.ctx.globalCompositeOperation = "destination-over";
                this.ctx.fillRect(this.itemWidth * i * 2 + this.itemWidth / 2, this.yCoordEnd, this.itemWidth, -height);
            }
        }
        this.ctx.restore();
        this.drawParenthesesLine(changeArrayItem);
        window.requestAnimationFrame(() => { this.drawChangeItem(changeArrayItem, dateTime) });
    }
    drawUnChangeItem(changeArrayItem) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.elementCount; i++) {
            let height = this.yCoordHeight * (changeArrayItem.snapshot[i] / 100);
            if (i === changeArrayItem.sourceIndex) {
                this.ctx.fillStyle = '#f25022';
            } else if (i === changeArrayItem.targetIndex) {
                this.ctx.fillStyle = '#ffb901';
            } else {
                this.ctx.fillStyle = '#ccc'
            }
            this.ctx.fillRect(this.itemWidth * i * 2 + this.itemWidth / 2, this.yCoordEnd, this.itemWidth, -height);
        }
        this.drawParenthesesLine(changeArrayItem);
    }
    drawParenthesesLine(changeArrayItem) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = '#666'
        if (changeArrayItem.sourceIndex <= changeArrayItem.targetIndex) {
            this.ctx.bezierCurveTo(this.itemWidth * changeArrayItem.sourceIndex * 2 + this.itemWidth / 2, this.yCoordEnd + 5,
                this.itemWidth * (changeArrayItem.sourceIndex + changeArrayItem.targetIndex) + this.itemWidth, this.yCoordEnd + 60,
                this.itemWidth * changeArrayItem.targetIndex * 2 + this.itemWidth +  this.itemWidth / 2, this.yCoordEnd + 5);
        } else {
            this.ctx.bezierCurveTo(this.itemWidth * changeArrayItem.sourceIndex * 2 + this.itemWidth + this.itemWidth / 2, this.yCoordEnd + 5,
                this.itemWidth * (changeArrayItem.sourceIndex + changeArrayItem.targetIndex) + this.itemWidth, this.yCoordEnd + 60,
                this.itemWidth * changeArrayItem.targetIndex * 2 + this.itemWidth / 2, this.yCoordEnd + 5);
        }
        this.ctx.stroke();
    }

}