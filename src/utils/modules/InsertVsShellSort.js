import ShellSort from './ShellSort.js'
import InsertSort from './InsertSort.js'
export default class InsertVsShellSort {
    static sortName = '希尔vs插入排序';
    constructor(option) {
        this.shellShort = new ShellSort(option);
        this.insertSort = new InsertSort(option)
        this.insertSort.yCoordFactor = 290
        this.insertSort.canvas.style = "position:absolute; left:0; top:0;"
    }
    begin() {
        this.shellShort.yMoveDuration = 0;
        this.insertSort.yMoveDuration = 0;
        this.shellShort.random();
        this.insertSort.array = JSON.parse(JSON.stringify(this.shellShort.array));
        this.shellShort.draw();
        this.insertSort.draw();
       
        this.shellShort.sort(Math.floor(this.insertSort.array.length / 2) || 1);
        this.insertSort.sort(1);
    }
    destory() {
        this.shellShort.destory();
        this.insertSort.destory();
    }

}