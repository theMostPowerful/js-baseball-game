let answer = [];
let attempts = 0;
const maxAttempts = 15;
let history = [];

function generateAnswer() {
  const numbers = [];
  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 10);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  console.log(numbers);
  return numbers;
}

function checkGuess(guess) {
  const result = { strikes: 0, balls: 0 };

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result.strikes++;
    } else if (answer.includes(guess[i])) {
      result.balls++;
    }
  }

  return result;
}

function startGame() {
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("gameStartContainer").style.display = "none";
  answer = generateAnswer();
  attempts = 0;
  history = [];
  document.getElementById("result").innerHTML = "";
  document.getElementById("history").innerHTML = "";
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    makeGuess();
  }
}

function makeGuess() {
  const guessInput = document.getElementById("numberInput");
  const guessValue = guessInput.value;
  const guess = guessInput.value.split("").map(Number);
  console.log(guess);
  console.log(guessValue.length);

  if (guessValue.length < 3) {
    alert("3개의 숫자를 입력하세요.");
    return;
  }

  // if (!guess.every((num) => num >= 0 && num <= 9)) {
  //   alert("0부터 9까지의 숫자를 입력하세요.");
  //   return;
  // }

  const result = checkGuess(guess);

  attempts++;
  history.push({ guess: guess, result: result });

  if (result.strikes === 3) {
    document.getElementById("result").innerHTML = "승리! 축하합니다!";
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("gameStartContainer").style.display = "block";
  } else if (attempts === maxAttempts) {
    document.getElementById("result").innerHTML =
      "패배! 정답은 " + answer.join("") + "입니다.";
    document.getElementById("gameStartContainer").style.display = "block";
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `${result.strikes} 스트라이크 ${result.balls} 볼<br>(${attempts}/${maxAttempts} 턴)`;
  }

  updateHistory();
  guessInput.value = "";
}

function updateHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "<h3>기록</h3>";
  for (const round of history) {
    const guessStr = round.guess.join(", ");
    const resultStr = `${round.result.strikes} 스트라이크 ${round.result.balls} 볼`;
    const roundInfo = document.createElement("p");
    roundInfo.textContent = `${guessStr} - ${resultStr}`;
    historyDiv.appendChild(roundInfo);
  }
}
