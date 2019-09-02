export default class ShellSort {
    constructor(canvas) {
        this.sortName = '希尔排序算法';
        this.elementCount = 12;
        this.array = null;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.animationDuration = 400;
        this.xCoordFactor = this.canvas.width / this.elementCount;
        this.yCoordFactor = 40;
        this.fontSize = 10;
        this.ctx.font = ` ${this.fontSize}px serif`;

        this.sortNowDate = {};
        this.sortNowDatPrevious = {};
    }
    begin() {
        this.random();
        this.draw();
        this.sort(Math.round(this.array.length / 2));
    }
    random() {
        this.array = new Array();
        for (let i = 0; i < this.elementCount; i++) {
            this.array.push(Math.floor(Math.random() * 100 + 1));
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.array.length; i++) {
            if (this.sortNowDate.begin != undefined && i % this.sortNowDate.group === this.sortNowDate.begin) {
                let color = '#666'
                if (i <= this.sortNowDate.sortRange) {
                    color = 'green'
                }
                if (i === this.sortNowDate.sourceIndex) {
                    color = '#f25022'
                }
                if (i === this.sortNowDate.targetIndex) {
                    color = '#ffb901'
                }
                if (i < this.sortNowDate.sourceIndex && i < this.sortNowDate.targetIndex) {
                    color = 'green'
                }
                if (this.sortNowDate.done) {
                    color = 'green'
                }
                this.drawOne(this.xCoordFactor * (i), this.yCoordFactor + this.xCoordFactor, this.array[i], color)
            } else {
                this.drawOne(this.xCoordFactor * (i), this.yCoordFactor, this.array[i])
            }
        }
    }
    drawOne(x, y, value, color) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x + this.xCoordFactor / 2, y + this.xCoordFactor / 2, this.xCoordFactor / 2 - 5, 0, Math.PI * 2)
 
        if (color) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.fillStyle = "#fff";
        } else {
            this.ctx.fillStyle = "#000";
            this.ctx.stroke();
        }
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(value, x + this.xCoordFactor / 2, y + this.xCoordFactor / 2);
        this.ctx.restore();
    }
    drawLoop() {
        window.requestAnimationFrame()
    }
    sort(group, begin = 0) {
        this.sortPromise(begin, group).then(res => {
            if (begin + 1 < group) {
                this.sort(group, ++begin);
            } else if (group > 1) {
                this.sort(Math.round(group / 2));
            }
        })
    }
    sortPromise(begin, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortNowDate = {
            begin,
            group
        }
        this.draw();
        setTimeout(() => {
            this.sortInsert(begin, group, resolve)
        }, this.animationDuration)
        return promise;
    }

    sortInsert(begin, group, resolve) {
        this.sortInsertPromise(begin, group).then(() => {
            if (begin + group < this.array.length) {
                this.sortNowDate.sortRange = begin + group;
                this.sortInsert(begin + group, group, resolve)
            } else {
                this.sortNowDate.done = true;
                this.draw();
                setTimeout(() => {
                    resolve();
                }, this.animationDuration)
            }
        })
    }
    sortInsertPromise(i, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortInsertMove(i, group, resolve);
        return promise;
    }
    sortInsertMove(i, group, resolve) {
        let j = i - group;
        this.sortNowDate.sourceIndex = i;
        this.sortNowDate.targetIndex = j;
        if (j >= 0 && this.array[j] > this.array[i]) {
            this.draw();
            setTimeout(() => {
                let temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
                this.sortInsertMove(j, group, resolve);
            }, this.animationDuration)
        } else {
            this.draw();
            if (j < 0) {
                resolve();
            } else {
                setTimeout(() => {
                    resolve();
                }, this.animationDuration)
            }

        }
    }
}