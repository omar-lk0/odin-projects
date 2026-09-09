let humanScore = 0;
let computerScore = 0;

const resultsDiv = document.querySelector('#results');
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateDisplay(message) {
    resultsDiv.innerHTML = `
        <p>${message}</p>
        <p><strong>Score:</strong> Human ${humanScore} | Computer ${computerScore}</p>
    `;
}

function checkWinner() {
    if (humanScore === 5 || computerScore === 5) {
        const winnerMessage = humanScore === 5 
            ? "🎉 Congratulations! You won the game!" 
            : "💀 Game over! The computer won!";
        
        const finalNotice = document.createElement('h2');
        finalNotice.textContent = winnerMessage;
        resultsDiv.appendChild(finalNotice);

        // Disable buttons after game finishes
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
    }
}

function playRound(humanChoice) {
    // Prevent actions if game already ended
    if (humanScore >= 5 || computerScore >= 5) return;

    const computerChoice = getComputerChoice();
    let message = "";

    if (humanChoice === computerChoice) {
        message = `It's a tie! Both chose ${humanChoice}.`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        message = `You win this round! ${humanChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        message = `You lose this round! ${computerChoice} beats ${humanChoice}.`;
    }

    updateDisplay(message);
    checkWinner();
}

rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));