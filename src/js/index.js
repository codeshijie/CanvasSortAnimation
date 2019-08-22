import AlgorithmCanvas from "./AlgorithmCanvas.js"
import "../style/style.css"
import "../style/font_1356766_67kn1ki45s.css"
let algorithmCanvas = new AlgorithmCanvas();

document.body.innerHTML = `    
    <footer>
        <button class="iconfont icon-prior"></button>
        <button class="iconfont icon-restart"></button>
        <button class="iconfont icon-next"></button>
    </footer> `;
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