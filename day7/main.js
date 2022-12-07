const { dir } = require('console');
const fs = require('fs');

function readFile() {
  return fs.readFileSync('input.txt').toString();
}

function getCommandsAndOutputs(input) {
  const commands = [];
  let commandIndex = -1;
  for (let line of input.split("\n")) {
    if (!line) continue;
    if (line.startsWith('$ ')) {
      commands[++commandIndex] = {
        command: line.substring(2),
        output: [],
      }
    } else {
      commands[commandIndex]['output'].push(line);
    }
  }
  return commands;
}

function getTreeFromCommands(commands) {
  const tree = {files: {}, directories: {}, size: 0, directoriesSumSize: 0};
  let current = tree;
  for (let {command, output} of commands) {
    if (command.startsWith('cd')) {
      const folder = command.substring(3);
      if (folder === '/') {
        current = tree;
      } else if (folder === '..') {
        if (!current.prev) {
          throw new Error('Parent directory does not exists');
        }
        current.prev.directoriesSumSize += current.size + current.directoriesSumSize;
        current = current.prev;
      } else {
        current.directories[folder] = {
          prev: current,
          size: 0,
          files: {},
          directories: {},
          directoriesSumSize: 0,
        };
        current = current.directories[folder];
      }
    } else if (command.startsWith('ls')) {
      output
        .filter(f => !f.startsWith('dir'))
        .map((file) => file.split(' '))
        .forEach(([size, name]) => {
          current.files[name] = parseInt(size);
          current.size += current.files[name];
        });
    }
  }
  return tree;
}

function getDirectoriesSizesAndTotalFromCommands(commands) {
  const directories = {};
  let current = [];
  let total = 0;
  for (let {command, output} of commands) {
    if (command.startsWith('cd')) {
      const folder = command.substring(3);
      if (folder === '/') {
        current = [];
      } else if (folder === '..') {
        if (current.length === 0) {
          throw new Error('Parent directory does not exists');
        }
        current.pop();
      } else {
        current.push(folder);
        if (!directories[current.join('.')]) {
          directories[current.join('.')] = 0;
        }
      }
    } else if (command.startsWith('ls')) {
      output
        .filter(f => !f.startsWith('dir'))
        .map((file) => file.split(' '))
        .forEach(([size]) => {
          total += parseInt(size);
          for (let i = 1; i <= current.length; i++) {
            directories[current.slice(0, i).join('.')] += parseInt(size);
          }
        });
    }
  }
  return { directories, total };
}

function getAllDirectoriesSize(tree) {
  const sizes = [];
  for (let name in tree.directories) {
    const directory = tree.directories[name];
    if (Object.values(directory.directories).length > 0) {
      sizes.push(directory.size);
      sizes.push(...getAllDirectoriesSize(directory));
    } else {
      sizes.push(directory.size);
    }
  }
  return sizes;
}

function puzzleOne() {
  const input = readFile();
  const commands = getCommandsAndOutputs(input);
  const tree = getTreeFromCommands(commands);
  return getAllDirectoriesSize(tree)
    .filter(size => size <= 100000)
    .reduce((sum, a) => sum + a, 0);
}

function puzzleTwo() {
  const totalSpace = 70000000;
  const spaceNeeded = 30000000;

  const input = readFile();
  const commands = getCommandsAndOutputs(input);
  const {directories, total} = getDirectoriesSizesAndTotalFromCommands(commands);
  const spaceLeft = totalSpace - total;
  const needed = spaceNeeded - spaceLeft;
  return Math.min.apply(null, Object.values(directories).filter(s => s >= needed));
}

console.log(puzzleOne());
console.log(puzzleTwo());
