import Sort from "./utils/Sort.js"

let sort = new Sort(Number(location.search.replace("?", "")));

document.body.innerHTML += `
    <footer>
        <button ></button>
        <button ></button>
        <button ></button>
    </footer> `;
document.querySelector("button:nth-of-type(1)").onclick = () => {
    sort.prior();
    uiChange();
}
document.querySelector("button:nth-of-type(2)").onclick = () => {
    sort.start();
}
document.querySelector("button:nth-of-type(3)").onclick = () => {
    sort.next();
    uiChange();
}
function uiChange() {
    document.querySelector("button:nth-of-type(1)").innerHTML = "⇦ " + sort.preSortName;
    document.querySelector("button:nth-of-type(2)").innerHTML =  sort.sortName + " ↺";
    document.querySelector("button:nth-of-type(3)").innerHTML =   sort.nextSortName + " ⇨";
    history.replaceState({},sort.sortName,`?${sort.sortIndex}`)
}
document.querySelector("button:nth-of-type(2)").click();
uiChange();
