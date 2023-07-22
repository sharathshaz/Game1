const rockBtn = document.querySelector('.button2:nth-child(1)');
const paperBtn = document.querySelector('.button2:nth-child(2)');
const scissorBtn = document.querySelector('.button2:nth-child(3)');
const resetBtn = document.querySelector('.button3');

const messageContainer = document.querySelector('.message-container');
const leaderboardContainer = document.querySelector('.leaderboard');

let leaderboard = [];


rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorBtn.addEventListener('click', () => playGame('scissors'));
resetBtn.addEventListener('click', resetGame);


function playGame(playerChoice) {
  const computerChoice = getRandomChoice();
  const result = determineWinner(playerChoice, computerChoice);

  updateScore(result);
  console.log('Player choice:', playerChoice);
  console.log('Computer choice:', computerChoice);
  console.log('Result:', result);
  if (result === 'draw') {
    showMessage('It\'s a draw!', 'draw');
  } else {
    const message = `Player chose ${playerChoice} and Computer chose ${computerChoice}.`;
    showMessage(`${result.charAt(0).toUpperCase() + result.slice(1)}! ${message}`, result);
  }


  if (leaderboard.length >= 10) {
    if (leaderboard[0].score === 10) {
      const winner = leaderboard[0].name;
      alert("The winner is : "+ winner); 
      resetGame();      
    }
  }
}

function getRandomChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function updateScore(result) {
  const playerScoreCell = document.querySelector('.border3 tr:nth-child(2) td:nth-child(1)');
  const computerScoreCell = document.querySelector('.border3 tr:nth-child(2) td:nth-child(2)');

  let playerScore = parseInt(playerScoreCell.innerText);
  let computerScore = parseInt(computerScoreCell.innerText);

  if (result === 'player') {
    playerScore++;
  } else if (result === 'computer') {
    computerScore++;
  }

  playerScoreCell.innerText = playerScore;
  computerScoreCell.innerText = computerScore;


  leaderboard.push({ name: 'Player', score: playerScore });
  leaderboard.push({ name: 'Computer', score: computerScore });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);


  updateLeaderboard();
}
function showMessage(text, result) {
  const messageElement = document.createElement('div');
  messageElement.textContent = text;
  if (result === 'draw') {
    messageElement.classList.add('draw-message');
  } else if (result === 'player') {
    messageElement.classList.add('player-message');
  } else if (result === 'computer') {
    messageElement.classList.add('computer-message');
  }
  messageContainer.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}
function updateLeaderboard() {
  leaderboardContainer.innerHTML = '';

  for (let i = 0; i < leaderboard.length; i++) {
    const leaderboardItem = document.createElement('div');
    leaderboardItem.textContent = `${leaderboard[i].name}: ${leaderboard[i].score}`;
    leaderboardContainer.appendChild(leaderboardItem);
  }
}

function showWinner(winner) {
  const winnerElement = document.createElement('div');
  winnerElement.textContent = `${winner} is the winner!`;
  winnerElement.classList.add('winner-message');
  messageContainer.appendChild(winnerElement);
}
function resetGame() {
  const playerScoreCell = document.querySelector('.border3 tr:nth-child(2) td:nth-child(1)');
  const computerScoreCell = document.querySelector('.border3 tr:nth-child(2) td:nth-child(2)');

  playerScoreCell.innerText = '0';
  computerScoreCell.innerText = '0';

  messageContainer.innerHTML = '';


  leaderboard = [];

  updateLeaderboard();
}
