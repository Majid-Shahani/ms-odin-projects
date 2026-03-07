const SCISSOR = 0;
const ROCK = 1;
const PAPER = 2;

function toString(choice) {
    switch (choice) {
        case SCISSOR:
            return 'Scissors';
        case ROCK:
            return 'Rock';
        case PAPER:
            return 'Paper';
        default:
            console.log('Wrong Argument to toString!');
            return "";
    }
}

function getHumanChoice() {
    let userInput = prompt('Enter your choice:');
    if (!userInput) return -1;

    userInput = userInput.toLowerCase();
    switch (userInput) {
        case 'scissor':
        case 'scissors':
            return SCISSOR;
        case 'rock':
            return ROCK;
        case 'paper':
            return PAPER;
        default:
            return -1;
    }
}

function simulateComputerChoice() {
    const choice = (Math.floor(Math.random() * 100)) % 3;
    return choice;
}

function playRound(hChoice, cChoice) {
    const res = hChoice - cChoice;
    switch (res) {
        case -1:
        case 2:
            return 0; // Computer Win

        case 0:
            return 2; // Draw

        case -2:
        case 1:
            return 1; // Human Win
    }
}

function playGame() {
    let computerScore = humanScore = round = 0;
    // Play Rounds
    while (round++ < 5) {
        const humanChoice = getHumanChoice();
        if (humanChoice === -1) return;

        const computerChoice = simulateComputerChoice();

        switch (playRound(humanChoice, computerChoice)) {
            case 0:
                computerScore++;
                console.log(`You Lose! ${toString(computerChoice)} Beats ${toString(humanChoice)}`);
                break;
            case 1:
                humanScore++;
                console.log(`You Win! ${toString(humanChoice)} Beats ${toString(computerChoice)}`);
                break;
            case 2:
                console.log(`Draw! You've both played ${toString(humanChoice)}!`);
        }
    }
    // Declare Winner
    console.log('Game Over!');
    if (humanScore === computerScore) console.log(`You've Drawn!`);
    if (humanScore > computerScore) console.log("You've Won! Congratulations.");
    if (humanScore < computerScore) console.log("You've Lost! Skill Issue");
}

function main() {
    playGame();
}

main();