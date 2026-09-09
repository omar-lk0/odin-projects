
function getComputerChoice() {
    const computerChoice = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * computerChoice.length);
    return computerChoice[randomIndex];
}

function getHumanChoice() {
    let humanChoice = prompt("Please enter 'rock', 'paper', or 'scissors':");
    return humanChoice ? humanChoice.toLowerCase() : "";
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

function playGame() {

    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice == computerChoice) {
            console.log("Tie");
            return;
        }
        if (
            (humanChoice == "rock" && computerChoice == "scissors") ||
            (humanChoice == "paper" && computerChoice == "rock") ||
            (humanChoice == "scissors" && computerChoice == "paper")
        ) {
            humanScore++;
            console.log(`You win! ${humanChoice} beats ${computerChoice}.`)
        } else {
            computerScore++;
            console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
        }
    }
    for (let i = 1; i <= 5; i++) {
        console.log(`--- Round ${i} ---`);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        
        console.log(`You chose: ${humanSelection}`);
        console.log(`Computer chose: ${computerSelection}`);
        
        playRound(humanSelection, computerSelection);
        console.log(`Current Score - Human: ${humanScore} | Computer: ${computerScore}`);
    }

    console.log("=== FINAL SCORE ===");
    console.log(`Human: ${humanScore} | Computer: ${computerScore}`);
    
    if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
    } else if (computerScore > humanScore) {
        console.log("Game over! The computer won!");
    } else {
        console.log("The game ended in a tie!");
    }
}

playGame();