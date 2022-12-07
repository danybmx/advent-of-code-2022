const fs = require('fs');
const _ = require('lodash');

function chunk(chunkSize) {
  return (result, item, index) =>  {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }

    result[chunkIndex].push(item);

    return result;
  }
}

function transpose(matrix) {
  return _.unzip(matrix);
}

function readFile() {
  return fs.readFileSync('input.txt').toString();
}

function getCrates(input) {
  let crates = input.split('\n\n')[0]
    .split("")
    .reduce(chunk(4), [])
    .map(chunk => chunk.filter(i => {
      return i.trim() !== "" && i !== '[' && i !== ']';
    }))
    .reduce(chunk(9), [])
  crates.pop();
  return transpose(crates)
    .map(col => col.filter(c => c.length > 0).flat());
}

function getMovements(input) {
  return input.split('\n\n')[1].split('\n').filter(line => line);
}

function parseMovement(movement) {
  const parsed = movement.split(' ');
  return [parsed[1], parsed[3], parsed[5]];
}

function puzzleOne() {
  const input = readFile();
  const crates = getCrates(input);
  getMovements(input).forEach((movement) => {
    const [count, from, to] = parseMovement(movement);
    for (let x = 0; x < count; x++) {
      const picked = crates[from-1].shift();
      crates[to-1].unshift(picked);
    }
  });
  return crates.map(col => col[0]).flat().join('');
}

function puzzleTwo() {
  const input = readFile();
  const crates = getCrates(input);
  getMovements(input).forEach((movement) => {
    const [count, from, to] = parseMovement(movement);
    const picked = crates[from-1].splice(0, count);
    crates[to-1].unshift(...picked);
  });
  return crates.map(col => col[0]).flat().join('');
}

console.log(puzzleOne());
console.log(puzzleTwo());

