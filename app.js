const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ENTER_KEY = 13;
const PLAYER_ONE = '.player1';
const PLAYER_TWO = '.player2';
let MAX_SCORE = 12;
const app = document.querySelector('.app');
const mainContainer = document.querySelector('.container'); 
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const player1 = document.querySelector(PLAYER_ONE);
const player2 = document.querySelector(PLAYER_TWO);
const button = document.querySelector('.button');
const themeSelector = document.querySelector('.dark-mode-checkbox');
const maxScore = document.querySelector('.max-score');
const settingsButton = document.querySelector('.settings-button');

let gameOver = false;

const setMaxScore = value => {
  maxScore.value = value;
  MAX_SCORE = value;
};

const getValue = el => (el ? +el.textContent : 0);
const removeElement = el => {
  setTimeout(() => el.parentNode.removeChild(el), 1000);
};

const showButton = () =>
  setTimeout(() => {
    button.classList.remove('hide-restart');
    button.classList.add('show-restart');
  }, 300);

hideButton = () => {
  button.classList.remove('show-restart');
  button.classList.add('hide-restart');
};

const addScore = (target, shouldReset) => {
  if (gameOver) return;

  const player = target === PLAYER_ONE ? player1 : player2;
  const prevScore = player.querySelector('.current');
  const prevValue = getValue(prevScore);

  if (prevScore) {
    prevScore.classList.remove('current');
    prevScore.classList.add('previous');
    removeElement(prevScore);
  }

  const nextElement = document.createElement('span');
  const nextValue = prevScore ? prevValue + 1 : prevValue;
  nextElement.textContent = shouldReset ? 0 : nextValue;
  nextElement.classList.add('score', 'current');

  if (!shouldReset && nextValue > MAX_SCORE - 1) {
    nextElement.textContent = 'WON';
    gameOver = true;
    showButton();
  }
  player.querySelector('.score-container').appendChild(nextElement);
};

const resetGame = () => {
  gameOver = false;
  addScore(PLAYER_ONE, true);
  addScore(PLAYER_TWO, true);
  hideButton();
};

const handleClick = e => {
  const target = e.currentTarget.dataset.hasOwnProperty('playerOne')
    ? PLAYER_ONE
    : PLAYER_TWO;
  addScore(target);
};

const handleKeyDown = e => {
  const code = e.keyCode || e.which;

  if (code === LEFT_ARROW) {
    addScore(PLAYER_ONE);
  } else if (code === RIGHT_ARROW) {
    addScore(PLAYER_TWO);
  } else if (code === ENTER_KEY && gameOver) {
    resetGame();
  }
};

const blur = () => {
  mainContainer.classList.add('blur')
}

const removeBlur = () => {
  mainContainer.classList.remove('blur')
}

const closeModal = () => {
  modal.classList.add('hidden');
  removeBlur()
};

const showModal = () => {
  blur()
  modal.classList.remove('hidden');
};

const prevent = e => {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (e.preventDefault) {
    e.preventDefault();
  }
};

const handleChangeMaxScore = event => {
  debugger;
  const {
    target: { value },
  } = event;
  setMaxScore(parseInt(value));
  resetGame();
};

const handleThemeToggle = () => {
  const currentTheme = app.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  app.setAttribute('data-theme', nextTheme);

  if (isDark) {
    themeSelector.classList.remove('fill');
  } else {
    themeSelector.classList.add('fill');
  }
};

setMaxScore(MAX_SCORE);

addScore(PLAYER_ONE);
addScore(PLAYER_TWO);

window.addEventListener('keydown', handleKeyDown, false);
player1.addEventListener('click', handleClick, false);
player2.addEventListener('click', handleClick, false);
button.addEventListener('click', resetGame, false);
modalContainer.addEventListener('click', prevent, false);
modal.addEventListener('click', closeModal, false);
settingsButton.addEventListener('click', showModal, false);
themeSelector.addEventListener('click', handleThemeToggle, false);
maxScore.addEventListener('change', handleChangeMaxScore, false);

window.addEventListener('load', () => (app.style.visibility = 'visible'));
