import BubbleSort from "./modules/BubbleSort.js"
import QuickSort from "./modules/QuickSort.js"
import ShellSort from "./modules/ShellSort.js"
import InsertSort from "./modules/InsertSort.js"
import InsertVsShellSort from "./modules/InsertVsShellSort.js"
export default class Sort {
    constructor(index) {
        this.sortClassArray = [InsertSort, ShellSort, InsertVsShellSort, QuickSort, BubbleSort]
        this.sortIndex = index || 0;
        this.sortObject = null;
    }
    get sortName() {
        return this.sortClassArray[this.sortIndex].sortName;
    }
    get preSortName() {
        if (this.sortIndex === 0) {
            return this.sortClassArray[this.sortClassArray.length - 1].sortName;;
        } else {
            return this.sortClassArray[this.sortIndex - 1].sortName;
        }
    }
    get nextSortName() {
        if (this.sortIndex === this.sortClassArray.length - 1) {
            return this.sortClassArray[0].sortName;;
        } else {
            return this.sortClassArray[this.sortIndex + 1].sortName;;
        }
    }
    start() {
        if (this.sortObject && this.sortObject.destory) {
            this.sortObject.destory();
        }

        let option = {
            canvasPositon: {
                width: Math.max(window.innerWidth, 375),
                height: Math.max(window.innerHeight, 667) - 50
            },
            //排序元素数量
            elementCount: 12
        }
        if (this.sortClassArray[this.sortIndex] === InsertVsShellSort) {
            //动画间隔时间
            option.animationDuration = 20;
            option.elementCount = 60;
        }
        this.sortObject = new this.sortClassArray[this.sortIndex](option);
        this.sortObject.begin();
    }
    prior() {
        if (this.sortIndex === 0) {
            this.sortIndex = this.sortClassArray.length - 1;
        } else {
            this.sortIndex--;
        }
        this.start();
    }
    next() {
        if (this.sortIndex === this.sortClassArray.length - 1) {
            this.sortIndex = 0;
        } else {
            this.sortIndex++;
        }
        this.start();
    }

}


