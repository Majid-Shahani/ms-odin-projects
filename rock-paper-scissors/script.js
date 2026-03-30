const SCISSOR = 0;
const ROCK = 1;
const PAPER = 2;

function toString(res) {
  switch (res) {
    case -1:
      return "You Lose!";
    case 0:
      return "Draw!";
    case 1:
      return "You Win!";
    default:
      console.error("Wrong Argument to toString!");
      return "";
  }
}

function simulateComputerChoice() {
  const choice = Math.floor(Math.random() * 100) % 3;
  return choice;
}

function playRound(hChoice, cChoice) {
  const res = hChoice - cChoice;
  switch (res) {
    case -1:
    case 2:
      return -1; // Computer Win

    case 0:
      return 0; // Draw

    case -2:
    case 1:
      return 1; // Human Win
  }
}

function main() {
  let diff = (humanScore = computerScore = 0);

  const resText = document.querySelector(`div#roundResult`);
  const hScoreObj = document.querySelector(`div#hScore`);
  const cScoreObj = document.querySelector(`div#cScore`);

  const rockButton = document.querySelector(`button#rock`);
  const paperButton = document.querySelector(`button#paper`);
  const scissorButton = document.querySelector(`button#scissor`);

  const handleScore = (sDiff) => {
    diff += sDiff;
    if (sDiff > 0) {
      hScoreObj.textContent = ++humanScore;
    } else if (sDiff < 0) {
      cScoreObj.textContent = ++computerScore;
    }

    if ((humanScore >= 5 || computerScore >= 5) && Math.abs(diff) > 1) {
      // game over
      resText.textContent = `${toString(sDiff)} Game Over!`;
      rockButton.disabled = true;
      paperButton.disabled = true;
      scissorButton.disabled = true;
      return;
    }
    resText.textContent = `${toString(sDiff)}`;
  };

  scissorButton.addEventListener("click", () => {
    handleScore(playRound(SCISSOR, simulateComputerChoice()));
  });

  rockButton.addEventListener("click", () =>
    handleScore(playRound(ROCK, simulateComputerChoice())),
  );

  paperButton.addEventListener("click", () =>
    handleScore(playRound(PAPER, simulateComputerChoice())),
  );
}

main();
