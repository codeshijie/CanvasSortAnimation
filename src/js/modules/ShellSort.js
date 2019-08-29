export default class ShellSort {
    constructor() {
        this.elementCount = 10;
        this.array = null;
    }
    begin() {
        this.random();
        console.log(this.array);
        this.sort(Math.floor(this.array.length / 2));
        console.log(this.array);
    }
    random() {
        this.array = new Array();
        for (let i = 0; i < this.elementCount; i++) {
            this.array.push(Math.floor(Math.random() * 100 + 1));
        }
    }
    sort(group) {
        for (let i = 0; i < group; i++) {
            this.sortInsert(i, group);
        }
        if (group > 1) {
            this.sort(Math.floor(group / 2));
        }
    }
    sortInsert(begin, group) {
        for (let i = begin; i < this.array.length; i = i + group) {
            if (this.array[i] < this.array[i - group]) {
                let temp = this.array[i];
                let j = i - group;
                for (; j >= 0 && this.array[j] > temp; j = j - group) {
                    this.array[j + group] = this.array[j];
                }
                this.array[j + group] = temp;
            }
        }
    }
}