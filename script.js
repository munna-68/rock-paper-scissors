const playGameBtn = document.getElementById("play-game-btn");
const toggleInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const gameLog = document.getElementById("game-log");
const userScore = document.getElementById("user-score");
const computerScoreDOM = document.getElementById("computer-score");

let gameResult;

playGameBtn.addEventListener('click', playGame);

submitBtn.addEventListener('click', () => {
  let humanSelection = getHumanChoice();
  let computerSelection = getComputerChoice();
  playRound(humanSelection, computerSelection)
  playGameBtn.style.display = "block"
    toggleInput.style.display = "none"
  submitBtn.style.display = "none"
  gameLog.textContent = gameResult
  userScore.textContent = `Your Score: ${humanScore}`;
  computerScoreDOM.textContent = `Computer Score: ${computerScore}`;
})


function playGame() {
  playGameBtn.style.display = "none"
  toggleInput.style.display = "block"
  submitBtn.style.display = "block"
}


function getComputerChoice() {
  let computerChoice;
  let randomNumber = Math.floor(Math.random() * (4 - 1)) + 1;
  switch(randomNumber) {
    case 1:
      computerChoice = 'rock';
      break;
   case 2:
        computerChoice = 'paper';
        break;
    case 3:
      computerChoice = 'scissor';
      break;  
  }
  return computerChoice;
}

function getHumanChoice() {
  let humanChoice;
  let promptingUser = toggleInput.value;
  let userChoice = promptingUser.toLowerCase();
  
  if(userChoice == "rock") {
    humanChoice = "rock"
  } else if(userChoice == "paper") {
    humanChoice = "paper"
  } else if(userChoice == "scissor") {
    humanChoice = "scissor"
  } else {
    alert("make sure your spelling is correct")
  }

  return humanChoice;
}

 let humanScore = 0;
 let computerScore = 0;
function playRound(humanChoice, computerChoice) {
  if(humanChoice == "rock" && computerChoice == "scissor") {
  gameResult = "You Won!! rock beats scissor"
  humanScore++
  } else if(humanChoice == "scissor" && computerChoice == "paper") {
    gameResult = "You Won!! scissor beats paper"
    humanScore++
  } else if(humanChoice == "paper" && computerChoice == "rock") {
    gameResult = "You Won!! paper beats rock"
    humanScore++
  } else if(computerChoice == "rock" && humanChoice == "scissor") {
    gameResult = "You have lost!! rock beats scissor"
    computerScore++
  } else if(computerChoice == "scissor" && humanChoice == "paper") {
    gameResult = "You have lost!! scissor beats paper"
    computerScore++
  } else if(computerChoice == "paper" && humanChoice == "rock") {
    gameResult = "You have lost!! paper beats rock"
    computerScore++
  } else if(computerChoice == humanChoice) {
    gameResult = "its a tie"
  }
}
// playRound(humanSelection, computerSelection);