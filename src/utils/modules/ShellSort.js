
export default class ShellSort {
    static sortName = '希尔排序';
    constructor(option) {
        this.elementCount = option.elementCount;
        this.animationDuration = option.animationDuration || 400;

        this.canvas = document.createElement("canvas");
        this.canvas.width = option.canvasPositon.width;
        this.canvas.height = option.canvasPositon.height;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.xCoordFactor = this.canvas.width / this.elementCount;
        this.yCoordFactor = 30;
        this.groupFactor = 2;
        this.fontSize = this.xCoordFactor / 1.5;
        this.ctx.font = ` ${this.fontSize}px serif`;
        this.sortInsertData = {};
        this.yMoveDuration = 1;
        this.array = null;

    }
    destory() {
        document.body.removeChild(this.canvas);
    }
    begin() {
        this.random();
        this.draw();
        this.sort(Math.floor(this.array.length / this.groupFactor) || 1);
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
            if (this.sortInsertData.begin != undefined && i % this.sortInsertData.group === this.sortInsertData.begin) {
                x = this.xCoordFactor * (i);
                y = this.yCoordFactor + this.xCoordFactor;
                if (this.sortInsertData.targetIndex && 
                    this.array[this.sortInsertData.targetIndex] > this.array[this.sortInsertData.sourceIndex] &&
                    this.sortInsertData.xChangeTime) {
                    let ratioX = (new Date() - this.sortInsertData.xChangeTime) / this.animationDuration;
                    let multiplier = 0;
                    if (i === this.sortInsertData.targetIndex) {
                        multiplier = 1;
                    }
                    if (i === this.sortInsertData.sourceIndex) {
                        multiplier = -1;
                    }
                    x = this.xCoordFactor * (i) + ratioX * this.xCoordFactor * this.sortInsertData.group * multiplier;
                }
                if ((new Date() - this.sortInsertData.ydownChangeTime) < this.animationDuration) {
                    let ratioY = (new Date() - this.sortInsertData.ydownChangeTime) / this.animationDuration;
                    y = this.yCoordFactor + this.xCoordFactor * ratioY;
                }
                if ((new Date() - this.sortInsertData.yUpChangeTime) < this.animationDuration && this.sortInsertData.group != 1) {
                    let ratioY = (new Date() - this.sortInsertData.yUpChangeTime) / this.animationDuration;
                    y = this.yCoordFactor + this.xCoordFactor - this.xCoordFactor * ratioY;
                }
                if (i <= this.sortInsertData.sortRange) {
                    color = 'green'
                }
                if (i === this.sortInsertData.sourceIndex) {
                    color = '#f25022'
                }
                if (i === this.sortInsertData.targetIndex) {
                    color = '#ffb901'
                }
                if (this.sortInsertData.done) {
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
        this.ctx.arc(x + this.xCoordFactor / 2, y + this.xCoordFactor / 2, this.xCoordFactor / 2 - 0.5, 0, Math.PI * 2)
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.array[index], x + this.xCoordFactor / 2, y + this.xCoordFactor / 2);
        this.ctx.restore();
    }
    //group拆分
    sort(group, begin = 0) {
        this.sortPromise(begin, group).then(res => {
            if (begin + 1 < group) {
                this.sort(group, ++begin);
            } else if (group > 1) {
                this.sort(Math.floor(group / this.groupFactor) || 1);
            }
        })
    }
    //group数据初始化，返回promise
    sortPromise(begin, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortInsertData = {
            begin,
            group,
            ydownChangeTime: new Date()
        }
        setTimeout(() => {
            this.sortInsert(begin, group, resolve)
        }, this.animationDuration * 2 * this.yMoveDuration)
        return promise;
    }

    //数据直接插入排序，begin递增并递归调用，结束执行resolve
    sortInsert(begin, group, resolve) {
        this.sortInsertPromise(begin, group).then(() => {
            if (begin + group < this.array.length) {
                this.sortInsertData.sortRange = begin + group;
                this.sortInsert(begin + group, group, resolve)
            } else {
                this.sortInsertData.sortRange = this.array.length;
                this.sortInsertData.done = true;
                this.sortInsertData.yUpChangeTime = new Date()
                setTimeout(() => {
                    resolve();
                }, this.animationDuration * this.yMoveDuration)
            }
        })
    }
    //数据直接插入排序一次排序，返回promise
    sortInsertPromise(i, group) {
        let resolve = null;
        let promise = new Promise((res) => {
            resolve = res;
        });
        this.sortInsertMove(i, group, resolve);
        return promise;
    }
      //数据直接插入排序一次排序，i递减并递归调用，结束执行resolve
    sortInsertMove(i, group, resolve) {
        let j = i - group;
        this.sortInsertData.sourceIndex = i;
        this.sortInsertData.targetIndex = j;
        if (j >= 0 && this.array[j] > this.array[i]) {
            this.sortInsertData.xChangeTime = new Date();

            setTimeout(() => {
                let temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
                this.sortInsertMove(j, group, resolve);
            }, this.animationDuration)
        } else {
            delete this.sortInsertData.xChangeTime;
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