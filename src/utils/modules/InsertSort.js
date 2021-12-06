import ShellSort from './ShellSort.js'
export default class InsertSort extends ShellSort {
    static sortName =  '插入排序';
    constructor(option) {
        super(option); 
    }
    begin() {
        this.random();
        this.draw();
        this.sort(1);
    }
}