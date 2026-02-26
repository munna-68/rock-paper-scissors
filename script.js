// ===== DOM Elements =====
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const drawScoreEl = document.getElementById("draw-score");
const playerEmojiEl = document.getElementById("player-emoji");
const computerEmojiEl = document.getElementById("computer-emoji");
const resultTextEl = document.getElementById("result-text");
const resultDetailEl = document.getElementById("result-detail");
const promptTextEl = document.getElementById("prompt-text");
const historyListEl = document.getElementById("history-list");
const resetBtn = document.getElementById("reset-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const choiceBtns = document.querySelectorAll(".choices__btn");

// ===== Game State =====
const state = {
  playerScore: 0,
  computerScore: 0,
  draws: 0,
  round: 0,
  isPlaying: false,
};

// ===== Choice Config =====
const CHOICES = {
  rock: { emoji: "Rock", beats: "scissors", verb: "crushes" },
  paper: { emoji: "Paper", beats: "rock", verb: "covers" },
  scissors: { emoji: "Scissors", beats: "paper", verb: "cuts" },
};

const THEME_STORAGE_KEY = "rps-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "Dark" : "Day";
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "day";
  const nextTheme = currentTheme === "dark" ? "day" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "day");
  applyTheme(initialTheme);
}

// ===== Computer Choice =====
function getComputerChoice() {
  const keys = Object.keys(CHOICES);
  return keys[Math.floor(Math.random() * keys.length)];
}

// ===== Determine Winner =====
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "tie";
  if (CHOICES[playerChoice].beats === computerChoice) return "win";
  return "lose";
}

// ===== Animate Score =====
function animateScore(element) {
  element.classList.remove("score-pop");
  void element.offsetWidth; // trigger reflow
  element.classList.add("score-pop");
}

// ===== Update UI =====
function updateScoreboard() {
  playerScoreEl.textContent = state.playerScore;
  computerScoreEl.textContent = state.computerScore;
  drawScoreEl.textContent = state.draws;
}

function showResult(outcome, playerChoice, computerChoice) {
  const resultMap = {
    win: {
      text: "You won",
      cssClass: "result__text--win",
      detail: `${capitalize(playerChoice)} ${CHOICES[playerChoice].verb} ${computerChoice}`,
    },
    lose: {
      text: "You lost",
      cssClass: "result__text--lose",
      detail: `${capitalize(computerChoice)} ${CHOICES[computerChoice].verb} ${playerChoice}`,
    },
    tie: {
      text: "Draw",
      cssClass: "result__text--tie",
      detail: `Both chose ${playerChoice}`,
    },
  };

  const { text, cssClass, detail } = resultMap[outcome];

  // Clear previous classes
  resultTextEl.className = "result__text";
  resultDetailEl.className = "result__detail";

  // Force reflow for re-animation
  void resultTextEl.offsetWidth;

  resultTextEl.textContent = text;
  resultTextEl.classList.add(cssClass, "result__text--visible");
  resultDetailEl.textContent = detail;
  resultDetailEl.classList.add("result__detail--visible");
}

function addHistoryItem(round, outcome, playerChoice, computerChoice) {
  // Remove empty message if present
  const emptyMsg = historyListEl.querySelector(".history__empty");
  if (emptyMsg) emptyMsg.remove();

  const badgeClass = `history__result-badge--${outcome}`;
  const badgeText =
    outcome === "win" ? "Win" : outcome === "lose" ? "Loss" : "Draw";

  const item = document.createElement("div");
  item.classList.add("history__item");
  item.innerHTML = `
    <span class="history__round">#${round}</span>
    <span class="history__moves">
      ${CHOICES[playerChoice].emoji}
      <span style="opacity:0.3; font-size:0.8rem; margin: 0 0.5rem;">vs</span>
      ${CHOICES[computerChoice].emoji}
    </span>
    <span class="history__result-badge ${badgeClass}">${badgeText}</span>
  `;

  historyListEl.prepend(item);

  // Keep max 10 visible
  while (historyListEl.children.length > 10) {
    historyListEl.removeChild(historyListEl.lastChild);
  }
}

// ===== Play Round =====
async function playRound(playerChoice) {
  if (state.isPlaying) return;
  state.isPlaying = true;
  state.round++;

  const computerChoice = getComputerChoice();

  // Disable buttons and show selected
  choiceBtns.forEach((btn) => {
    if (btn.dataset.choice === playerChoice) {
      btn.classList.add("choices__btn--selected");
    } else {
      btn.classList.add("choices__btn--disabled");
    }
  });

  // Show player choice immediately
  playerEmojiEl.textContent = CHOICES[playerChoice].emoji;
  playerEmojiEl.classList.add("battle__emoji--active");

  // Animate computer "thinking"
  computerEmojiEl.classList.add("battle__emoji--thinking");
  promptTextEl.textContent = "Computer is choosing...";
  promptTextEl.classList.remove("prompt--hidden");

  // Cycle through computer emojis while "thinking"
  const allEmojis = Object.values(CHOICES).map((c) => c.emoji);
  let cycleIndex = 0;
  const cycleInterval = setInterval(() => {
    computerEmojiEl.textContent = allEmojis[cycleIndex % allEmojis.length];
    cycleIndex++;
  }, 100);

  // Wait for suspense
  await sleep(800 + Math.random() * 400);

  // Reveal computer choice
  clearInterval(cycleInterval);
  computerEmojiEl.classList.remove("battle__emoji--thinking");
  computerEmojiEl.textContent = CHOICES[computerChoice].emoji;
  computerEmojiEl.classList.add("battle__emoji--active");

  // Determine outcome
  const outcome = determineWinner(playerChoice, computerChoice);

  // Update score
  if (outcome === "win") {
    state.playerScore++;
    animateScore(playerScoreEl);
  } else if (outcome === "lose") {
    state.computerScore++;
    animateScore(computerScoreEl);
  } else {
    state.draws++;
    animateScore(drawScoreEl);
  }

  updateScoreboard();
  showResult(outcome, playerChoice, computerChoice);
  addHistoryItem(state.round, outcome, playerChoice, computerChoice);

  // Shake on lose
  if (outcome === "lose") {
    playerEmojiEl.classList.add("shake");
    setTimeout(() => playerEmojiEl.classList.remove("shake"), 600);
  }

  promptTextEl.textContent = "Select your next move";

  // Re-enable after a small delay
  await sleep(600);

  choiceBtns.forEach((btn) => {
    btn.classList.remove("choices__btn--selected", "choices__btn--disabled");
  });

  state.isPlaying = false;
}

// ===== Reset Game =====
function resetGame() {
  state.playerScore = 0;
  state.computerScore = 0;
  state.draws = 0;
  state.round = 0;
  state.isPlaying = false;

  updateScoreboard();

  playerEmojiEl.textContent = "";
  computerEmojiEl.textContent = "";
  playerEmojiEl.classList.remove("battle__emoji--active");
  computerEmojiEl.classList.remove("battle__emoji--active");

  resultTextEl.className = "result__text";
  resultTextEl.textContent = "";
  resultDetailEl.className = "result__detail";
  resultDetailEl.textContent = "";

  promptTextEl.textContent = "Select your move";

  historyListEl.innerHTML =
    '<div class="history__empty">No rounds played</div>';

  choiceBtns.forEach((btn) => {
    btn.classList.remove("choices__btn--selected", "choices__btn--disabled");
  });
}

// ===== Utilities =====
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===== Event Listeners =====
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    playRound(btn.dataset.choice);
  });
});

resetBtn.addEventListener("click", resetGame);
themeToggleBtn.addEventListener("click", toggleTheme);

// Keyboard support: 1=Rock, 2=Paper, 3=Scissors
document.addEventListener("keydown", (e) => {
  if (state.isPlaying) return;
  const keyMap = { 1: "rock", 2: "paper", 3: "scissors" };
  if (keyMap[e.key]) playRound(keyMap[e.key]);
});

initializeTheme();
