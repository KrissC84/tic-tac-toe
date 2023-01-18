/* eslint-disable no-use-before-define */
/* eslint-disable no-labels */

// factory of the players
const Player = (name, sign) => {
  this.player = {};
  this.player.name = name;
  this.player.sign = sign;
  return this.player;
};

const GameBoard = (function () {
  let board = [];

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
    board = newBoard;
    return newBoard;
  };
  const gameStart = () => {
    console.log('here', this);
    board = initBoard();
  };
  const makeMove = (player, position) => {
    if (
      board[position[0]][position[1]] !== 'X' &&
      board[position[0]][position[1]] !== 'O'
    ) {
      board[position[0]][position[1]] = player.sign;
    }
  };
  const boardState = () => {
    //
    console.log('Board state: ', board.toString());
    return board;
  };
  const checkBoard = () => {
    // check horizontal direction
    for (let i = 0; i < 3; i += 1) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        console.log('We got a winner');
      }
    }
    // check vertical direction
    for (let i = 0; i < 3; i += 1) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        console.log('We got a winner');
        return;
      }
    }
    // check cross-directions
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      console.log('We got a winner');
      return;
    }
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      console.log('We got a winner');
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    mainLoop: for (let m = 0; m < 3; m += 1) {
      for (let n = 0; n < 3; n += 1) {
        if (board[m][n] === 'O' || board[m][n] === 'X') {
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
        element.textContent = board[i][j];
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
  // setup for eventlistener removal
  const controller = new AbortController();
  const controller2 = new AbortController();
  const controller3 = new AbortController();

  // html element grabbing
  const letStart = document.querySelector('.startButton');
  const players = document.querySelector('.players');
  const mode = document.querySelector('.mode');
  const playerSings = document.querySelectorAll('.player button');

  let PlayerMode;
  const playerSignChoice = ['', '', '', ''];

  const start = () => {
    // choose the mode of the game
    letStart.addEventListener(
      'click',
      eventHandler.bind(null, [0, 1], ['single', 'multi']),
      { signal: controller.signal }
    );
  };

  // event Listener Setup
  function eventHandler(num, modeType) {
    // make mode div visible
    mode.setAttribute('style', 'display:inline-block');
    // letStart.removeEventListener('click', eventHandler.bind(null,[0,1],['single','multi'])); //this is not working
    // deleting listener from start button
    controller.abort();
    console.log('2:', letStart);

    // eslint-disable-next-line no-use-before-define
    for (let index = 0; index < num.length; index++) {
      // eslint-disable-next-line no-loop-func
      mode.children[index].addEventListener(
        'click',
        (e) => {
          GameFlow.PlayerMode = modeType[index];
          e.target.setAttribute(
            'style',
            ' background-color:  hsl(180, 100%, 27%);'
          );
          controller2.abort();

          // make player div visible
          players.setAttribute('style', 'display:flex');
          console.log(GameFlow.PlayerMode);

          Array.from(playerSings).forEach((element) =>
            element.addEventListener(
              'click',
              (e2) => {

                // mark the players choice on the page and automatically mark other player sigh
                // reset the previous player choice
                Array.from(playerSings).forEach((element2) =>
                  element2.setAttribute('style', 'background-color: azure')
                );

                if (e2.target.id === 'sign1') {
                  changeButton (e2.target);
                  const player2 = document.querySelector('#sign4');
                  changeButton(player2);
                  wrapPlayer (e2,player2)

                } else if (e2.target.id === 'sign2') {
                  changeButton (e2.target);
                  const player2 = document.querySelector('#sign3');
                  changeButton(player2);
                  wrapPlayer (e2,player2)

                } else if (e2.target.id === 'sign3') {
                  changeButton (e2.target);
                  const player2 = document.querySelector('#sign2');
                  changeButton(player2);
                  wrapPlayer (e2,player2);

                } else if (e2.target.id === 'sign4') {
                  changeButton (e2.target);
                  const player2 = document.querySelector('#sign1');
                  changeButton(player2);
                  wrapPlayer (e2,player2);
                }
                console.log(playerSignChoice);

                // function to reduce redundancy for injection above
                function wrapPlayer (event,item) {
                  playerSignChoice[0]=event.target.parentElement.firstElementChild.value;
                  playerSignChoice[1]=event.target.innerText;
                  playerSignChoice[2]=item.parentElement.firstElementChild.value;
                  playerSignChoice[3]=item.innerText;
                };

                // function to reduce redundancy for injection above
                function changeButton (event) {
                  event.setAttribute(
                    'style',
                    ' background-color:  hsl(180, 100%, 27%);');
                }
                // choices can be change until the game is begin. Then the event l. will be aborted.
              },
              { signal: controller3.signal }
            )
          );
        },
        { signal: controller2.signal }
      );
    }
  }

  const checkMode = () => GameFlow.PlayerMode;

  console.log(PlayerMode);
  return { start, checkMode, playerSignChoice };
})();

GameBoard.gameStart();
GameFlow.start();

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
