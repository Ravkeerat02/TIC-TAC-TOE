let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameStatus = 'Game On!';

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

// Check for a winner
const checkForWinner = () => {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      return board[i];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      return board[i];
    }
  }

  // Check diagonals
  if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
    return board[0];
  }

  if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
    return board[2];
  }

  // Check for a tie
  if (!board.includes('')) {
    return 'Tie';
  }

  // Game is still on
  return null;
};

// Update board and cell
const updateBoard = (index) => {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);
};

// Handle cell click
const handleCellClick = (e) => {
  const index = e.target.id;
  if (board[index] !== '' || gameStatus !== 'Game On!') {
    return;
  }

  updateBoard(index);
  const winner = checkForWinner();
  if (winner) {
    gameStatus = winner === 'Tie' ? 'Tie!' : `${winner} Wins!`;
    message.textContent = gameStatus;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s Turn`;
  }
};

// Handle restart button click
const handleRestartClick = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameStatus = 'Game On!';

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  message.textContent = `${currentPlayer}'s Turn`;
};

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestartClick);
