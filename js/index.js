import BubbleSort from "../modules/BubbleSort.js"

export default function AlgorithmCanvas(ele) {
    this.canvas = document.querySelector(ele);
}

AlgorithmCanvas.prototype.init = function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

AlgorithmCanvas.prototype.drawBubbleSort = function () {
    let ctx = this.canvas.getContext('2d')
    ctx.font = "14px serif";
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let bubbleSort = new BubbleSort(ctx)
    bubbleSort.random();
    bubbleSort.draw();
    bubbleSort.sort();
};