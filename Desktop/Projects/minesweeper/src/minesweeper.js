class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game Over');
      this._board.print();
    }else if (this._board.hasSafeTiles() === false){
      console.log("You Won!")
      return this._board.print();
    } else {
      console.log("Current Board: ")
      this._board.print();
    }
  }
};


class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs){
  this._numberOfBombs = numberOfBombs;
  this._numberOfTiles = numberOfRows * numberOfColumns;
  this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
  this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
    // check if tile already been flipped ic. = ' '
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!')
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
    return this._playerBoard;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    // finding adject indices from [rowIndex, columnIndex]
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    // check if adject box has bomb
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 &&
          neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 &&
          neighborColumnIndex < numberOfColumns){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ){
            numberOfBombs++;
          };
        };

    });
    this._numberOfBombs = numberOfBombs;
    return this._numberOfBombs;
  }

  hasSafeTiles(){
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let i = 0; i<numberOfRows; i++){
      let row = [];
      for (let j= 0; j<numberOfColumns; j++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let i = 0; i<numberOfRows; i++){
      let row = [];
      for (let j= 0; j<numberOfColumns; j++){
        row.push(null);
      }
      board.push(row);
    }
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
  }
};

const g = new Game(3,3,3)
g.playMove(0,0);
