export default function bubbleSort(ctx) {
    this.ctx = ctx;
    this.timeOut = 2000;
}

bubbleSort.prototype.random = function () {
    this.array = new Array(3, 4, 56, 2, 1);
}
bubbleSort.prototype.sort = function (i,j) {
    for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[i] > this.array[j]) {
            let temp = this.array[j];
            this.array[j] = this.array[i];
            this.array[i] = temp;
            this.drawSort(i,j);
            return   setTimeout(this.sort(i+1,i+2), this.timeOut);
        }
    }
}
bubbleSort.prototype.draw = function(){
    for (let i = 0; i < this.array.length; i++) {
        this.ctx.fillText(this.array[i], 30, 30*(i+1));
    }
}
