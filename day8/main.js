const { dir } = require('console');
const fs = require('fs');

function readFile() {
  return fs.readFileSync('input.txt').toString();
}

function getGrid(input) {
    return input.split('\n').map(l => l.split('').map(v => parseInt(v)));
}

function getVisible(grid) {
    const height = grid.length;
    const width = grid[0].length;
    const onTheEdge = (width * 2 + height * 2) - 4;

    let visible = onTheEdge;

    for (let y = 1; y < grid.length-1; y++) {
        for (let x = 1; x < grid[y].length-1; x++) {
            const current = grid[y][x];
            const currentTop = grid.slice(0, y).map(row => row[x]);
            const currentBottom = grid.slice(y + 1).map(row => row[x]);
            const currentLeft = grid[y].slice(0, x);
            const currentRight = grid[y].slice(x + 1);
            if (
                Math.max.apply(null, currentTop) < current
                || Math.max.apply(null, currentBottom) < current
                || Math.max.apply(null, currentLeft) < current
                || Math.max.apply(null, currentRight) < current
            ) {
                visible += 1;
            }
        }
    }
    return visible;
}

function getSpotScore(grid) {
    function getScore(options, height, distance = 1) {
        if (options.length < 1) return distance - 1;
        const current = options.shift();
        if (current < height) {
            return getScore(options, height, distance+1);
        }
        return distance;
    }

    let highScore = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const current = grid[y][x];
            const topOptions = grid.slice(0, y).map(row => row[x]).reverse();
            const bottomOptions = grid.slice(y + 1).map(row => row[x]);
            const leftOptions = grid[y].slice(0, x).reverse();
            const rightOptions = grid[y].slice(x + 1);
            const top = getScore(topOptions, current);
            const bottom = getScore(bottomOptions, current);
            const left = getScore(leftOptions, current);
            const right = getScore(rightOptions, current);
            const score = left * right * top * bottom;
            if (score > highScore) {
                highScore = score;
            }
        }
    }
    return highScore;
}

function puzzleOne() {
  const input = readFile();
  const grid = getGrid(input);
  return getVisible(grid);
  return visible;
}

function puzzleTwo() {
  const input = readFile();
  const grid = getGrid(input);
  return getSpotScore(grid);
}

console.log(puzzleOne());
console.log(puzzleTwo());
