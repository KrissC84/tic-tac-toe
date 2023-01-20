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
        newBoard[i][k] = '';
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
  function checkBoard() {
    // check horizontal direction
    for (let i = 0; i < 3; i += 1) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== ''
      ) {
        console.log('We got a winner',board[i][0]);
        return board[i][0];
      }
    }
    // check vertical direction
    for (let i = 0; i < 3; i += 1) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== ''
      ) {
        console.log('We got a winner',board[0][i]);
        return board[0][i];
      }
    }
    // check cross-directions
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== ''
    ) {
      console.log('We got a winner',board[0][0]);
      return board[0][0] ;
    }
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== ''
    ) {
      console.log('We got a winner',board[0][2]);
      return board[0][2];
    }

    // eslint-disable-next-line no-restricted-syntax
    mainLoop: for (let m = 0; m < 3; m += 1) {
      for (let n = 0; n < 3; n += 1) {
        if (board[m][n] === 'O' || board[m][n] === 'X') {
          if (n === 2 && m === 2) {
            console.log('It is a tie!!!');
            return 'tie';
            // break mainLoop;
          }
          // eslint-disable-next-line no-continue
          continue;
        } else {
          break mainLoop;
        }
      }
    }
    console.log('still in game')
    return 0;
  }
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
  const controller4 = new AbortController();

  // html element grabbing
  const letStart = document.querySelector('.startButton');
  const players = document.querySelector('.players');
  const mode = document.querySelector('.mode');
  const playerSings = document.querySelectorAll('.player button');
  const boardTiles = document.querySelectorAll('.table .tile');
  const resultInHtml =  document.querySelector('.result>h2');

  let PlayerMode;
  const playerSignChoice = ['', '', '', ''];
  // eslint-disable-next-line prefer-const
  let initialStateFinished = false;
  const Player1 = {};
  const Player2 = {};
  // eslint-disable-next-line prefer-const
  let firstPlayerMove = true;

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
                  changeButton(e2.target);
                  const player2 = document.querySelector('#sign4');
                  changeButton(player2);
                  wrapPlayer(e2, player2);
                } else if (e2.target.id === 'sign2') {
                  changeButton(e2.target);
                  const player2 = document.querySelector('#sign3');
                  changeButton(player2);
                  wrapPlayer(e2, player2);
                } else if (e2.target.id === 'sign3') {
                  changeButton(e2.target);
                  const player2 = document.querySelector('#sign2');
                  changeButton(player2);
                  wrapPlayer(e2, player2);
                } else if (e2.target.id === 'sign4') {
                  changeButton(e2.target);
                  const player2 = document.querySelector('#sign1');
                  changeButton(player2);
                  wrapPlayer(e2, player2);
                }

                console.log(playerSignChoice);

                // function to reduce redundancy for injection above
                function wrapPlayer(event, item) {
                  playerSignChoice[0] =
                    event.target.parentElement.firstElementChild.value;
                  playerSignChoice[1] = event.target.innerText;
                  playerSignChoice[2] =
                    item.parentElement.firstElementChild.value;
                  playerSignChoice[3] = item.innerText;
                }

                // function to reduce redundancy for injection above
                function changeButton(event) {
                  event.setAttribute(
                    'style',
                    ' background-color:  hsl(180, 100%, 27%);'
                  );
                }
                beforeFirstMove();
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

  function checkMode() {
    return GameFlow.PlayerMode;
  }

  // function that disable possibilities to change names,signs and game is started.
  const beforeFirstMove = () => {
    if (initialStateFinished === false) {
      const gameBegin = () => {
        if (initialStateFinished === false) {
          // this state can be reached only once
          initialStateFinished = true;
          // now changing sing is not possible
          controller3.abort();
          // adding players to the game
          GameFlow.Player1 = Player(playerSignChoice[0], playerSignChoice[1]);
          GameFlow.Player2 = Player(playerSignChoice[2], playerSignChoice[3]);
          // eslint-disable-next-line no-restricted-globals
          console.log(event.target);
          console.log(boardTiles);
          // play first round immediately
          // eslint-disable-next-line no-restricted-globals
          playRound(event);
        } else {
          console.log('play round');
          // eslint-disable-next-line no-restricted-globals
          console.log(event.target);
          // eslint-disable-next-line no-restricted-globals
          playRound(event);
        }
      };
      // adding ev.listeners to the tiles
      Array.from(boardTiles).forEach((element3) => {
        element3.addEventListener('click', gameBegin, {signal: controller4.signal});
      });
    }
  };

  function playRound(e) {
    console.log(e.target);
    console.log(firstPlayerMove);
    if (firstPlayerMove === true) {
      console.log('first player');
      firstPlayerMove = false;
      if (e.target.textContent === '') {
        // e.target.textContent = GameFlow.Player1.sign;
        pushToBoard(e, GameFlow.Player1);
        GameBoard.renderBoard();
        // eslint-disable-next-line prefer-const
        let result = GameBoard.checkBoard();
        if (result === 'X' || result === 'O') {
          controller4.abort();
          resultInHtml.textContent=`We got a  winner! Congratulations to ${GameFlow.Player1.name}`
          GameBoard.gameStart();
          GameFlow.start();
          GameBoard.renderBoard();
        } else if (result === 'tie') {
          controller4.abort();
          resultInHtml.textContent='It is a tie! Try one more time. '
          GameBoard.gameStart();
          GameFlow.start();
          GameBoard.renderBoard();
        }
      }
    } else {
      console.log('second player');
      firstPlayerMove = true;
      if (e.target.textContent === '') {
        // e.target.textContent = GameFlow.Player2.sign;
        pushToBoard(e, GameFlow.Player2);
        GameBoard.renderBoard();
        // eslint-disable-next-line prefer-const
        let result = GameBoard.checkBoard();
        if (result === 'X' || result === 'O') {
          controller4.abort();
          resultInHtml.textContent=`We got a  winner! Congratulations to ${GameFlow.Player1.name}`
          GameBoard.gameStart();
          GameFlow.start();
          GameBoard.renderBoard();
        } else if (result === 'tie') {
          controller4.abort();
          resultInHtml.textContent='It is a tie! Try one more time. ';
          
          GameBoard.gameStart();
          GameFlow.start();
          GameBoard.renderBoard();
        }
      }
    }
  }
  // refreshing board object
  const pushToBoard = (e, player) => {
    console.log(player);
    console.log(e.target.id[3], e.target.id[5]);
    GameBoard.makeMove(player, [e.target.id[3], e.target.id[5]]);
  };

  console.log(PlayerMode);

  return { start, checkMode, playerSignChoice, Player1, Player2 };
})();

GameBoard.gameStart();
GameFlow.start();

