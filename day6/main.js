const fs = require("fs");

function readFile() {
  return fs.readFileSync("input.txt").toString();
}

function getMarkerOfDistinctCharacters(stream, numOfDistinctCharacters) {
  const marker = [];
  let markerPosition = -1;
  for (let characterIndex in stream) {
    const character = stream[characterIndex];
    if (marker.includes(character)) {
      marker.splice(0, marker.indexOf(character)+1);
    }
    marker.push(character);
    if (marker.length === numOfDistinctCharacters) {
      markerPosition = parseInt(characterIndex) + 1;
      break;
    }
  }
  return markerPosition;
}

function puzzleOne() {
  return getMarkerOfDistinctCharacters(readFile(), 4);
}

function puzzleTwo() {
  return getMarkerOfDistinctCharacters(readFile(), 14);
}

console.log('One', puzzleOne());
console.log('Two', puzzleTwo());

