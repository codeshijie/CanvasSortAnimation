import ShellSort from './ShellSort.js'
export default class InsertSort extends ShellSort {
    constructor(canvas, elementCount = 16,fontSize = 13) {
        super(canvas, elementCount,fontSize);
        this.yCoordFactor = this.yCoordFactor * 6;
        this.yMoveDuration = 0;
        this.animationDuration = 300;
    }
}