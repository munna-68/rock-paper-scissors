function getComputerChoise() {
  let computerChoise;
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
  return computerChoise;
}

console.log(getComputerChoise())