import AlgorithmCanvas from "./AlgorithmCanvas.js" 
let algorithmCanvas = new AlgorithmCanvas();

document.querySelector("button:nth-of-type(1)").onclick = () => {
    algorithmCanvas.prior(); 
}
document.querySelector("button:nth-of-type(2)").onclick = () => {
    algorithmCanvas.start();
}
document.querySelector("button:nth-of-type(3)").onclick = () => {
    algorithmCanvas.next(); 
}
document.querySelector("button:nth-of-type(2)").click();