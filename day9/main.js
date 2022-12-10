const { uniq, cloneDeep } = require('lodash');
const fs = require('fs');

function readFile() {
  return fs.readFileSync('input.txt').toString();
}

function isAway(head, tail) {
  const [x, y] = tail;
  const [pX, pY] = head;
  const diffX = Math.abs(pX - x);
  const diffY = Math.abs(pY - y);
  return diffX > 1 || diffY > 1;
}

function puzzleOne() {
  const input = readFile();
  const tailPositions = [];
  let head = [500,500];
  let tail = [500,500];
  input.split('\n').forEach(movement => {
    const [direction, times] = movement.split(' ');
    for (let z = 0; z < times; z++) {
      const oldHead = head;
      switch (direction) { // L - D - L
        case 'U':
          head = [head[0], head[1]-1];
          break;
        case 'D':
          head = [head[0], head[1]+1];
          break;
        case 'L':
          head = [head[0]-1, head[1]];
          break;
        case 'R':
          head = [head[0]+1, head[1]];
          break;
      }
      if (isAway(head, tail)) {
        // move only when needed
        tail = oldHead;
      }
      tailPositions.push(tail);
    }
  })
  return uniq(tailPositions.map(([x, y]) => `${x},${y}`)).length;
}

function puzzleTwo() {
  const input = readFile();
  const tailPositions = [];
  const knots = Array(9).fill([500, 500]);
  let head = [500,500];
  input.split('\n').forEach(movement => {
    const [direction, times] = movement.split(' ');
    for (let z = 0; z < times; z++) {
      switch (direction) {
        case 'U':
          head = [head[0], head[1]-1];
          break;
        case 'D':
          head = [head[0], head[1]+1];
          break;
        case 'L':
          head = [head[0]-1, head[1]];
          break;
        case 'R':
          head = [head[0]+1, head[1]];
          break;
      }

      for (let i = 0; i < knots.length; i++) {
        const prev = i === 0 ? head : knots[i-1];
        const current = knots[i];
        if (isAway(prev, current)) {
          knots[i] = moveTail(prev, current);
        }
      }
      tailPositions.push(knots[knots.length - 1]);
    }
  })
  return uniq(tailPositions.map(([x, y]) => `${x},${y}`)).length;
}

function moveTail(prevKnot, current) {
  let [x, y] = current;
  const [pX, pY] = prevKnot;
  const diffX = Math.abs(pX - x);
  const diffY = Math.abs(pY - y);

  if (diffX > 1 && !diffY) {
    x += pX - x > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    y += pY - y > 0 ? 1 : -1;
  } else {
    x += pX - x > 0 ? 1 : -1;
    y += pY - y > 0 ? 1 : -1;
  }

  return [x, y];
}

console.log(puzzleOne());
console.log(puzzleTwo());
  
