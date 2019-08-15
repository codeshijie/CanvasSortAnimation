import BubbleSort from "../modules/BubbleSort.js"

export default function AlgorithmCanvas(ele) {

    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
}


AlgorithmCanvas.prototype.destory = function () {
    document.body.removeChild(this.canvas);
}

AlgorithmCanvas.prototype.drawBubbleSort = function () {
    this.bubbleSort = new BubbleSort(this.canvas)
    this.bubbleSort.random();
    this.bubbleSort.draw();
    this.bubbleSort.sort();
};