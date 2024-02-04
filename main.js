document.addEventListener('DOMContentLoaded', function () {
    // Constants
    const COLORS = {
      'null': 'white',
      '1': '#FFA500', // Orange
      '-1': '#8A2BE2', // Purple
    };
  
    const WINNING_COMBINATIONS = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    // State variables
    let board = Array(9).fill(null);
    let turn = 1;
    let winner = null;
  
    // Cached elements
    const boardEl = document.getElementById('board');
    const messageEl = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
  
    // Event listeners
    boardEl.addEventListener('click', handleSquareClick);
    resetBtn.addEventListener('click', resetGame);
  
    // Initial rendering
    render();
  
    // Functions
    function render() {
      // Render the board
      boardEl.innerHTML = '';
      board.forEach((value, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.backgroundColor = COLORS[value];
        square.innerText = value === null ? '' : value === 1 ? 'X' : 'O';
        square.dataset.index = index;
        boardEl.appendChild(square);
      });
  
      // Render the game message
      if (winner === null) {
        messageEl.textContent = `Player ${turn === 1 ? 'X' : 'O'}'s turn`;
      } else if (winner === 'T') {
        messageEl.textContent = "It's a Tie!";
      } else {
        messageEl.textContent = `Player ${winner === 1 ? 'X' : 'O'} wins!`;
      }
    }
  
    function handleSquareClick(event) {
      if (winner !== null) return; // Game is over
  
      const index = event.target.dataset.index;
      if (board[index] !== null) return; // Square already taken
  
      board[index] = turn;
      turn *= -1; // Switch player turn
  
      // Check for a winner
      winner = checkWinner();
  
      // Check for a tie
      if (winner === null && !board.includes(null)) {
        winner = 'T'; // It's a tie
      }
  
      render();
    }
  
    function checkWinner() {
      for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }
  
    function resetGame() {
      // Reset state variables
      board = Array(9).fill(null);
      turn = 1;
      winner = null;
      render();
  
      // Reset square colors
      const squares = document.querySelectorAll('.square');
      squares.forEach(square => {
        square.style.backgroundColor = COLORS['null'];
      });
    }
  });
  