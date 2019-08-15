import AlgorithmCanvas from "./AlgorithmCanvas.js"
let canvas = new AlgorithmCanvas();
canvas.drawBubbleSort();

document.querySelector("button").onclick = () => {
    canvas.destory();
    canvas = new AlgorithmCanvas();
    canvas.drawBubbleSort();
}