import BubbleSort from "../modules/BubbleSort.js"

export default function AlgorithmCanvas(ele) {
    this.canvas = document.querySelector(ele);
}

AlgorithmCanvas.prototype.init = function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

AlgorithmCanvas.prototype.drawBubbleSort = function () {
    let bubbleSort = new BubbleSort(this.canvas)
    bubbleSort.random();
    bubbleSort.draw();
    bubbleSort.sort();
};