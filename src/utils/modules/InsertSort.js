import ShellSort from './ShellSort.js'
export default class InsertSort extends ShellSort {
    static sortName =  'ζε₯ζεΊ';
    constructor(option) {
        super(option); 
    }
    begin() {
        this.random();
        this.draw();
        this.sort(1);
    }
}