const fs = require('fs');

function loadInput() {
    return fs.readFileSync("input.txt").toString();
}

function asStartEndArray(line) {
    return line.split(",").map(elf => elf.split("-").map((i) => parseInt(i)));
}

function isContained(a, b) {
    return (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]);
}

function overlaps(a, b) {
    return (a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1]) || (b[1] >= a[0] && b[1] <= a[1]);
}

function puzzleOne() {
    return loadInput()
        .split("\n")
        .map(asStartEndArray)
        .filter((item) => {
            return isContained(item[0], item[1]);
        })
        .length;
}

function puzzleTwo() {
    return loadInput()
        .split("\n")
        .map(asStartEndArray)
        .filter((item) => {
            return overlaps(item[0], item[1]);
        })
        .length;
}

console.log('One', puzzleOne());
console.log('Two', puzzleTwo());