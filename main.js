// ----- Constants -----
const COLORS = {
    'null': 'white',
    '1': 'purple',
    '-1': 'orange',
  };
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  // ----- State Variables -----
  let board;   // array of 9 elements representing the squares
  let turn;    // 1 or -1
  let winner;  // null = no winner; 1 or -1 = winner; 'T' = Tie
  
  // ----- Cached Elements -----
  const squares = document.querySelectorAll('.square');
  const messageEl = document.getElementById('message');
  
  // ----- Event Listeners -----
  document.getElementById('board').addEventListener('click', handleSquareClick);
  document.getElementById('resetBtn').addEventListener('click', init);
  
  // ----- Functions -----
  
  // 1) Define required constants
  // ...
  
  // 2) Define required variables
  // ...
  
  // 3) Store elements on the page
  // ...
  
  // 4) Upon loading the app
  init();
  
  // 5) Handle a player clicking a square
  function handleSquareClick(event) {
    const squareIndex = Array.from(squares).indexOf(event.target);
  
    // Guards...
    if (board[squareIndex] !== null || winner !== null) return;
  
    // Update the board
    board[squareIndex] = turn;
  
    // Switch player turn
    turn *= -1;
  
    // Check for winner
    checkForWinner();
  
    // Check for tie
    checkForTie();
  
    // Render the state
    render();
  }
  
  // 6) Handle a player clicking the replay button
  function init() {
    // Initialize state variables
    board = Array(9).fill(null);
    turn = 1;
    winner = null;
  
    // Render state variables
    render();
  }
  
  function checkForWinner() {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        break;
      }
    }
  }
  
  function checkForTie() {
    if (!board.includes(null) && winner === null) {
      winner = 'T';
    }
  }
  
  function render() {
    renderBoard();
    renderMessage();
  }
  
  function renderBoard() {
    board.forEach((value, index) => {
      squares[index].style.backgroundColor = COLORS[value];
    });
  }
  
  function renderMessage() {
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!";
    } else if (winner) {
      messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
      messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
  }
  