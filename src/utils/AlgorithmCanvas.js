import BubbleSort from "./modules/BubbleSort.js"
import QuickSort from "./modules/QuickSort.js"
import ShellSort from "./modules/ShellSort.js"
import InsertVsShellSort from "./modules/InsertVsShellSort.js"
export default class AlgorithmCanvas {
    constructor() {
        this.sortArray = [QuickSort, ShellSort, InsertVsShellSort, BubbleSort]
        this.sortIndex = 0;
        this.sortObject = null;
    }
    start() {
        if (this.canvas) {
            this.destoryCanvas();
        }
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.max(window.innerWidth, 320);
        this.canvas.height = Math.max(window.innerHeight, 568) - 50;
        document.body.appendChild(this.canvas);
        this.sortObject = new this.sortArray[this.sortIndex](this.canvas);
        document.title = this.sortObject.sortName;
        this.sortObject.begin();

    }
    prior() {
        if (this.sortIndex === 0) {
            this.sortIndex = this.sortArray.length - 1;
        } else {
            this.sortIndex--;
        }
        this.start();
    }
    next() {
        if (this.sortIndex === this.sortArray.length - 1) {
            this.sortIndex = 0;
        } else {
            this.sortIndex++;
        }
        this.start();
    }
    destoryCanvas() {
        if (this.sortObject && this.sortObject.destory) {
            this.sortObject.destory();
        }
        document.body.removeChild(this.canvas);
    }

}


