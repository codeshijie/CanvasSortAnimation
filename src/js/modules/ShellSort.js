export default class ShellSort {
    constructor(canvas) {
        this.sortName = '希尔排序算法';
        this.elementCount = 16;
        this.array = null;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.animationDuration = 400;
        this.xCoordFactor = this.canvas.width / this.elementCount;
        this.yCoordFactor = 40;
        this.fontSize = 12;
        this.ctx.font = ` ${this.fontSize}px serif`;

        this.sortNowDate = {};
    }
    begin() {
        this.random();
        console.log(this.array);
        this.draw();
        this.sort(Math.floor(this.array.length / 2));


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
            console.log(this.sortNowDate.begin, this.sortNowDate.group)
            if (this.sortNowDate.begin != undefined && i % this.sortNowDate.group === this.sortNowDate.begin) {
                this.drawOne(this.xCoordFactor * (i), this.yCoordFactor + this.xCoordFactor, this.array[i])
            } else {
                this.drawOne(this.xCoordFactor * (i), this.yCoordFactor, this.array[i])
            }
        }
    }
    drawOne(x, y, value) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x + this.xCoordFactor / 2, y + this.xCoordFactor / 2, this.xCoordFactor / 2 - 5, 0, Math.PI * 2)
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(value, x + this.xCoordFactor / 2, y + this.xCoordFactor / 2);

        this.ctx.stroke();
        this.ctx.restore();
    }
    sort(group, begin = 0) {
        this.sortInsert(begin, group).then(res => {
            if (begin + 1 < group) {
                this.sort(group, ++begin);
            } else if (group > 1) {
                this.sort(Math.floor(group / 2));
            }
        })
    }
    sortInsert(begin, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortNowDate = {
            begin,
            group
        }
        this.draw();
        this.sortInsertOne(begin, group, resolve)
        return promise;
    }

    sortInsertOne(begin, group, resolve) {
        this.sortInsertOneCompare(begin, group).then(() => {
            if (begin < this.array.length) {
                this.sortInsertOne(begin + group, group, resolve)
            } else {
                resolve();
            }
        })
    }
    sortInsertOneCompare(i, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        if (this.array[i] < this.array[i - group]) {
            this.sortInsertOneMove(i, group, this.array[i], resolve);
        } else {
            setTimeout(() => {
                resolve();
            }, this.animationDuration)

        }
        return promise;
    }
    sortInsertOneMove(i, group, moveValue, resolve) {
        let j = i - group;
        if (j >= 0 && this.array[j] > moveValue) {
            setTimeout(() => {
                this.array[j + group] = this.array[j];
                this.sortInsertOneMove(j, group, moveValue, resolve);
            }, this.animationDuration)
        } else {
            setTimeout(() => {
                this.array[j + group] = moveValue;
                resolve();
            }, this.animationDuration)

        }
        console.log(this.array);
    }
}