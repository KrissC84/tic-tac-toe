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
    console.log('here',this)
    this.board = initBoard();
  };
  const makeMove = (player, position) => {
    if (
      this.board[position[0]][position[1]] !== 'X' &&
      this.board[position[0]][position[1]] !== 'O'
    ) {
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
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][0] === this.board[i][2]
      ) {
        console.log('We got a winner');
      }
    }
    // check vertical direction
    for (let i = 0; i < 3; i += 1) {
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[0][i] === this.board[2][i]
      ) {
        console.log('We got a winner');
        return;
      }
    }
    // check cross-directions
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      console.log('We got a winner');
      return;
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      console.log('We got a winner');
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    mainLoop: for (let m = 0; m < 3; m += 1) {
      for (let n = 0; n < 3; n += 1) {
        if (this.board[m][n] === 'O' || this.board[m][n] === 'X') {
          if (n === 2 && m === 2) {
            console.log('It is a tie!!!');
            return;
            // break mainLoop;
          }
          continue;
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
    gameStart,
    boardState,
    makeMove,
    checkBoard,
    renderBoard,
    board
  };
})();

const GameFlow = (function () {
  //
  const controller = new AbortController();
  let PlayerMode ;
  console.log(PlayerMode);

  const letStart = document.querySelector('.startButton');
  

  const start = () => {
    letStart.addEventListener('click', eventHandler.bind(null,[0,1],['single','multi']) ,{ signal: controller.signal });
  };
  
  // eventListnerSetup
  function eventHandler(num,modeType) {
    const mode = document.querySelector('.mode');
    mode.setAttribute('style', 'display:inline-block');
    letStart.removeEventListener('click', eventHandler.bind(null,[0,1],['single','multi']));
    controller.abort();
    console.log('2:',letStart)

    // eslint-disable-next-line no-use-before-define
    for (let index = 0; index < num.length; index++) {
      mode.children[index].addEventListener('click', () => {
        GameFlow.PlayerMode = modeType[index];
        console.log(GameFlow.PlayerMode);
      });
    }
  }
  const checkMode = () =>GameFlow.PlayerMode

  console.log(PlayerMode);
  return { start, checkMode };
})();

GameBoard.gameStart();
GameFlow.start()


// const player1 = Player('Kriss', 'O');
// const player2 = Player('Cross', 'X');

// GameBoard.gameStart();

// GameBoard.makeMove(player1, [1, 1]);
// GameBoard.makeMove(player1, [2, 1]);
// GameBoard.makeMove(player1, [0, 2]);
// GameBoard.makeMove(player2, [0, 1]);
// GameBoard.makeMove(player2, [1, 0]);
// GameBoard.makeMove(player2, [2, 0]);
// GameBoard.makeMove(player2, [1, 2]);
// GameBoard.makeMove(player2, [2, 2]);
// GameBoard.boardState();
// GameBoard.checkBoard();
// GameBoard.renderBoard();

const Formatter = (function() {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log('Making uppercase');
    return text.toUpperCase();
  };
})();
