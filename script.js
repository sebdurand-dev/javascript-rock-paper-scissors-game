const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const choiceOptions = {
  0: "rock",
  1: "paper",
  2: "scissors"
};

function getComputerChoice() {
  const num = Math.floor(Math.random() * 3);

  if (num in choiceOptions) {
    return choiceOptions[num]
  }
}

async function getHumanChoice() {
  try {
    const userChoice = await rl.question("Rock, paper, scissors?: ")
  return userChoice.toLowerCase();
  } catch (e) {
    console.error("An error occured: ", e);
  }
}

async function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  let rounds = 5;

  while (rounds > 0) {

    const computerSelection = getComputerChoice();
    const humanSelection = await getHumanChoice();
    playRound(humanSelection, computerSelection);
    rounds -= 1;
  }

  function playRound (humanSelection, computerSelection) {

    if (computerSelection == "rock" && humanSelection == "scissors") {
      computerScore += 1
      console.log("Rock beats scissors! (Computer wins)")
    }
    else if (computerSelection == "scissors" && humanSelection == "rock") {
      humanScore += 1
      console.log("Rock beats scissors! (Player wins)")
    }
    else if (computerSelection == "scissors" && humanSelection == "paper") {
      computerScore += 1
      console.log("Scissors beats paper! (Computer wins)")
    }
    else if (computerSelection == "paper" && humanSelection == "scissors") {
      humanScore += 1
      console.log("Scissors beats paper! (Player wins)")
    }
    else if (computerSelection == "paper" && humanSelection == "rock") {
      computerScore += 1
      console.log("Paper beats rock! (Computer wins)")
    }
    else if (computerSelection == "rock" && humanSelection == "paper") {
      humanScore += 1
      console.log("Paper beats rock! (Player wins)")
    }
    else {
      console.log("Tie! No points awarded.")
    }

    console.log("Computer score: ", computerScore, "Player score: ", humanScore)
    return
  }

  console.log("The score ended with the computer having: ", computerScore, "points, and the player having: ", humanScore, "points!")
  rl.close();
}

playGame();