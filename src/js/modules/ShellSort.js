
export default class ShellSort {
    constructor(canvas, elementCount = 16, fontSize = 13) {
        this.sortName = '希尔排序算法';
        this.elementCount = elementCount;
        this.array = null;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.animationDuration = 400;
        this.xCoordFactor = this.canvas.width / this.elementCount;
        this.yCoordFactor = 40;
        this.fontSize = fontSize;
        this.ctx.font = ` ${this.fontSize}px serif`;
        this.sortDrawDate = {};
        this.yMoveDuration = 1;
    }
    begin() {
        this.random();
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

            let x = this.xCoordFactor * (i);
            let y = this.yCoordFactor;
            let color = '#666'
            if (this.sortDrawDate.begin != undefined && i % this.sortDrawDate.group === this.sortDrawDate.begin) {
                x = this.xCoordFactor * (i);
                y = this.yCoordFactor + this.xCoordFactor;
                if (this.array[this.sortDrawDate.targetIndex] > this.array[this.sortDrawDate.sourceIndex] &&
                    this.sortDrawDate.xChangeTime) {
                    let ratioX = (new Date() - this.sortDrawDate.xChangeTime) / this.animationDuration;
                    let multiplier = 0;
                    if (i === this.sortDrawDate.targetIndex) {
                        multiplier = 1;
                    }
                    if (i === this.sortDrawDate.sourceIndex) {
                        multiplier = -1;
                    }
                    x = this.xCoordFactor * (i) + ratioX * this.xCoordFactor * this.sortDrawDate.group * multiplier;
                }
                if ((new Date() - this.sortDrawDate.ydownChangeTime) < this.animationDuration) {
                    let ratioY = (new Date() - this.sortDrawDate.ydownChangeTime) / this.animationDuration;
                    y = this.yCoordFactor + this.xCoordFactor * ratioY;
                }
                if ((new Date() - this.sortDrawDate.yUpChangeTime) < this.animationDuration && this.sortDrawDate.group != 1) {
                    let ratioY = (new Date() - this.sortDrawDate.yUpChangeTime) / this.animationDuration;
                    y = this.yCoordFactor + this.xCoordFactor - this.xCoordFactor * ratioY;
                }
                if (i <= this.sortDrawDate.sortRange) {
                    color = 'green'
                }
                if (i === this.sortDrawDate.sourceIndex) {
                    color = '#f25022'
                }
                if (i === this.sortDrawDate.targetIndex) {
                    color = '#ffb901'
                }
                if (this.sortDrawDate.done) {
                    color = 'green'
                }
            }
            this.drawOne(x, y, i, color)
        }
        window.requestAnimationFrame(() => { this.draw() })
    }
    drawOne(x, y, index, color) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x + this.xCoordFactor / 2, y + this.xCoordFactor / 2, this.xCoordFactor / 2 - 1, 0, Math.PI * 2)
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.array[index], x + this.xCoordFactor / 2, y + this.xCoordFactor / 2);
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
                this.sort(Math.floor(group / 2));
            }
        })
    }
    sortPromise(begin, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortDrawDate = {
            begin,
            group,
            ydownChangeTime: new Date()
        }
        setTimeout(() => {
            this.sortInsert(begin, group, resolve)
        }, this.animationDuration * 2 * this.yMoveDuration)
        return promise;
    }

    sortInsert(begin, group, resolve) {
        this.sortInsertPromise(begin, group).then(() => {
            if (begin + group < this.array.length) {
                this.sortDrawDate.sortRange = begin + group;
                this.sortInsert(begin + group, group, resolve)
            } else {
                this.sortDrawDate.done = true;
                this.sortDrawDate.yUpChangeTime = new Date()
                setTimeout(() => {
                    resolve();
                }, this.animationDuration * this.yMoveDuration)
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
        this.sortDrawDate.sourceIndex = i;
        this.sortDrawDate.targetIndex = j;
        if (j >= 0 && this.array[j] > this.array[i]) {
            this.sortDrawDate.xChangeTime = new Date();

            setTimeout(() => {
                let temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
                this.sortInsertMove(j, group, resolve);
            }, this.animationDuration)
        } else {
            delete this.sortDrawDate.xChangeTime;
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