const fs = require('fs');

const DARK = ' ';
const LIGHT = '#';

function readFile() {
  return fs.readFileSync('input.txt').toString();
}

function getCycles(input) {
  let x = 1;
  const cycles = [x];
  input
    .split('\n')
    .forEach((line) => {
      if (line === "noop") {
        cycles.push(x);
      } else {
        const value = parseInt(line.split(" ")[1]);
        cycles.push(x);
        cycles.push(x);
        x += value;
      }
    });
  return cycles;
}

function puzzleOne() {
  const input = readFile();
  const cycles = getCycles(input);
  return cycles[20] * 20 + cycles[60] * 60 + cycles[100] * 100 + cycles[140] * 140 + cycles[180] * 180 + cycles[220] * 220;
}

function puzzleTwo() {
  const input = readFile();
  const cycles = getCycles(input);
  const crt = [];
  cycles.slice(1).forEach((value, i) => {
    const crtRow = Math.floor(i/40);
    if (crtRow > 5) return;
    if (!crt[crtRow]) crt[crtRow] = [];
    const crtCol = (i % 40) + 1;
    if (crtCol >= value && crtCol <= value + 2) {
      crt[crtRow].push(LIGHT);
    } else {
      crt[crtRow].push(DARK);
    }
  });
  return crt.map(row => row.join(''));
}

console.log(puzzleOne());
console.log(puzzleTwo());
