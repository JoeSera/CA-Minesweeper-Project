// Players board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i<numberOfRows; i++){
    let row = [];
    for (let j= 0; j<numberOfColumns; j++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//--------------------------------------------------------------

// bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i = 0; i<numberOfRows; i++){
    let row = [];
    for (let j= 0; j<numberOfColumns; j++){
      row.push(null);
    }
    board.push(row);
  }

  // Placing bombs
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfRows);
    if (board[randomRowIndex][randomColumnIndex] !== 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
    };

    numberOfBombsPlaced++;
    // possible that bomb will be placed on the same spot
  }
  return board;
};

//--------------------------------------------------------------

// Get number of adjecent bombs

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  // finding adject indices from [rowIndex, columnIndex]
  const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  // check if adject box has bomb
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns){
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ){
          numberOfBombs++;
        };
      };

  });
  return numberOfBombs;
};
//--------------------------------------------------------------

// allow user to flip board

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // check if tile already been flipped ic. = ' '
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    return console.log('This tile has already been flipped!')

  } else if (playerBoard[rowIndex][columnIndex] === 'B'){
    return playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
    return playerBoard;
  }
};

//--------------------------------------------------------------


// Print Board
const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

//--------------------------------------------------------------

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

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
