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

function getHumanChoice() {
  let humanChoice;
  let promptingUser = prompt("Chose between rock paper scissor");
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

