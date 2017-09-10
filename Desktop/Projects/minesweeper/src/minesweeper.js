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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    // possible that bomb will be placed on the same spot
  }
  return board;
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
