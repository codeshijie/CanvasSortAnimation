import AlgorithmCanvas from "./AlgorithmCanvas.js" 
import "../style/style.css"
import "../style/font_1356766_67kn1ki45s.css"
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