function getComputerChoice() {
  let computerChoice;
  let randomNumber = Math.floor(Math.random() * (4 - 1)) + 1;
  switch(randomNumber) {
    case 1:
      computerChoise = 'rock';
      break;
   case 2:
        computerChoise = 'paper';
        break;
    case 3:
      computerChoise = 'scissor';
      break;  
  }
  return computerChoice;
}

function getHumanChoice() 