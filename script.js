
function playGame() {
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
  
  let humanScore = 0;
  let computerScore = 0;
  
  function playRound(humanChoice, computerChoice) {
    if(humanChoice == "rock" && computerChoice == "scissor") {
    console.log("You Won!! rock beats scissor")
    humanScore++
    } else if(humanChoice == "scissor" && computerChoice == "paper") {
      console.log("You Won!! scissor beats paper")
      humanScore++
    } else if(humanChoice == "paper" && computerChoice == "rock") {
      console.log("You Won!! paper beats rock")
      humanScore++
    } else if(computerChoice == "rock" && humanChoice == "scissor") {
      console.log("You have lost!! rock beats scissor")
      computerScore++
    } else if(computerChoice == "scissor" && humanChoice == "paper") {
      console.log("You have lost!! scissor beats paper")
      computerScore++
    } else if(computerChoice == "paper" && humanChoice == "rock") {
      console.log("You have lost!! paper beats rock")
      computerScore++
    } else if(computerChoice == humanChoice) {
      console.log("its a tie")
    }
  }
  
  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();

  playRound(humanSelection, computerSelection);
}