
/* eslint-disable no-labels */

// factory of the players
const Player = (name, sign) => {
  this.player = {};
  this.player.name = name;
  this.player.sign = sign;
  return this.player;
};

const GameBoard = (function () {
  this.board = 'Start new game';

  // function to initiate new board
  const initBoard = () => {
    const newBoard = new Array(3);

    // counter for initial value of the newBoard
    let j = 1;
    for (let i = 0; i < 3; i += 1) {
      newBoard[i] = new Array(3);
      for (let k = 0; k < 3; k += 1) {
        newBoard[i][k] = j;
        j += 1;
      }
    }
    console.log(newBoard);
    this.board = newBoard;
    return newBoard;
  };
  const gameStart = () => {
    this.board = initBoard();
  };
  const makeMove = (player, position) => {
    if (this.board[position[0]][position[1]] !== 'X' && this.board[position[0]][position[1]] !== 'O') {
      this.board[position[0]][position[1]] = player.sign;
    }
  };
  const boardState = () => {
    //
    console.log('Board state: ', this.board.toString());
    return this.board;
  };
  const checkBoard = () => {
    // check horizontal direction
    for (let i = 0; i < 3; i += 1) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][0] === this.board[i][2]) {
        console.log('We got a winner');
      }
    }
    // check vertical direction
    for (let i = 0; i < 3; i += 1) {
      if (this.board[0][i] === this.board[1][i] && this.board[0][i] === this.board[2][i]) {
        console.log('We got a winner');
      }
    }
    // check cross-directions
    if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
      console.log('We got a winner');
    }
    if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
      console.log('We got a winner');
    }

    // eslint-disable-next-line no-restricted-syntax
    mainLoop: for (let m = 0; m < 3; m += 1) {
      for (let n = 0; n < 3; n += 1) {
        if (this.board[m][n] === 'O' || this.board[m][n] === 'X') {
          if (n === 2 && m === 2) {
            console.log('It is a tie!!!');
            break mainLoop;
          } else {
            continue;
          }
        } else {
          break mainLoop;
        }
      }
    }
  };
  const renderBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // make string with id to query element
        const id = `#id-${i}-${j}`;
        const element = document.querySelector(id);
        element.textContent = this.board[i][j];
      }
    }
  };

  // emulating public state
  return {
    gameStart, boardState, makeMove, checkBoard, renderBoard,
  };
}());

player1 = Player('Kriss', 'O');
player2 = Player('Cross', 'X');

GameBoard.gameStart();
GameBoard.makeMove(player1, [0, 0]);
GameBoard.makeMove(player1, [1, 1]);
GameBoard.makeMove(player1, [2, 1]);
GameBoard.makeMove(player1, [0, 2]);
GameBoard.makeMove(player2, [0, 1]);
GameBoard.makeMove(player2, [1, 0]);
GameBoard.makeMove(player2, [2, 0]);
GameBoard.makeMove(player2, [1, 2]);
GameBoard.makeMove(player2, [2, 2]);
GameBoard.boardState();
GameBoard.checkBoard();
GameBoard.renderBoard();
