import BubbleSort from "./modules/BubbleSort.js"
import QuickSort from "./modules/QuickSort.js"

export default class AlgorithmCanvas {
    constructor() {
        this.sort = [QuickSort, BubbleSort]
        this.sortIndex = 0;
    }
    start() {
        if (this.canvas) {
            this.destoryCanvas();
        }
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.max(window.innerWidth, 320);
        this.canvas.height = Math.max(window.innerHeight, 568) - 50;
        document.body.appendChild(this.canvas);
        let temp = new this.sort[this.sortIndex](this.canvas);
        document.title = temp.sortName;
        temp.begin();
    }
    prior() {
        if (this.sortIndex === 0) {
            this.sortIndex = this.sort.length - 1;
        } else {
            this.sortIndex--;
        }
        this.start();
    }
    next() {
        if (this.sortIndex === this.sort.length - 1) {
            this.sortIndex = 0;
        } else {
            this.sortIndex++;
        }
        this.start();
    }
    destoryCanvas() {
        document.body.removeChild(this.canvas);
    }

}


