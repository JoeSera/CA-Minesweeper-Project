'use strict';

// Players board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//--------------------------------------------------------------

// bomb board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  // Placing bombs
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfRows);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
    };

    numberOfBombsPlaced++;
    // possible that bomb will be placed on the same spot
  }
  return board;
};

//--------------------------------------------------------------

// Get number of adjecent bombs

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  // finding adject indices from [rowIndex, columnIndex]
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;
  // check if adject box has bomb
  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      };
    };
  });
  return numberOfBombs;
};
//--------------------------------------------------------------

// allow user to flip board

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  // check if tile already been flipped ic. = ' '
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    return console.log('This tile has already been flipped!');
  } else if (playerBoard[rowIndex][columnIndex] === 'B') {
    return playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    return playerBoard;
  }
};

//--------------------------------------------------------------


// Print Board
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

//--------------------------------------------------------------

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

// Print Players Board
console.log('Player Board: ');
printBoard(playerBoard);

// Print Bomb Board
console.log('Bomb Board: ');
printBoard(bombBoard);

// User flip the board
flipTile(playerBoard, bombBoard, 2, 2);
console.log('Update Player Board: ');
printBoard(playerBoard);