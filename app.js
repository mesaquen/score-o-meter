import { ENTER_KEY, LEFT_ARROW, RIGHT_ARROW } from './scripts/keyboard.js'
import PlayerInfo, { PLAYER_ONE, PLAYER_TWO } from './scripts/player.js'
import Config from './scripts/config.js'
import Elements, { getValue, removeElement } from './scripts/elements.js'

let { MAX_SCORE } = Config
let { p1Wins, p2Wins, player1, player2, p1WinsDisplay, p2WinsDisplay } =
  PlayerInfo

const {
  app,
  button,
  mainContainer,
  maxScore,
  modal,
  modalContainer,
  settingsButton,
  themeSelector,
} = Elements

let gameOver = false

const setMaxScore = (value) => {
  maxScore.value = value
  MAX_SCORE = value
}

const showButton = () =>
  setTimeout(() => {
    button.classList.remove('hide-restart')
    button.classList.add('show-restart')
  }, 300)

const hideButton = () => {
  button.classList.remove('show-restart')
  button.classList.add('hide-restart')
}

const addScore = (target, shouldReset) => {
  if (gameOver) return

  const player = target === PLAYER_ONE ? player1 : player2
  const prevScore = player.querySelector('.current')
  const prevValue = getValue(prevScore)

  if (prevScore) {
    prevScore.classList.remove('current')
    prevScore.classList.add('previous')
    removeElement(prevScore)
  }

  const nextElement = document.createElement('span')
  const nextValue = prevScore ? prevValue + 1 : prevValue
  nextElement.textContent = shouldReset ? 0 : nextValue
  nextElement.classList.add('score', 'current')

  if (!shouldReset && nextValue > MAX_SCORE - 1) {
    nextElement.textContent = 'WON'
    gameOver = true
    addWin(target)
    showButton()
  }
  player.querySelector('.score-container').appendChild(nextElement)
}

const resetGame = () => {
  gameOver = false
  addScore(PLAYER_ONE, true)
  addScore(PLAYER_TWO, true)
  hideButton()
}

const handleClick = (event) => {
  const target = Object.prototype.hasOwnProperty.call(
    event.currentTarget.dataset,
    'playerOne'
  )
    ? PLAYER_ONE
    : PLAYER_TWO
  addScore(target)
}

const KEYDOWN_ACTIONS = {
  [LEFT_ARROW]: () => addScore(PLAYER_ONE),
  [RIGHT_ARROW]: () => addScore(PLAYER_TWO),
  [ENTER_KEY]: () => {
    if (gameOver) {
      resetGame()
    }
  },
}

const handleKeyDown = (event) => {
  const code = event.keyCode || event.which

  const action = KEYDOWN_ACTIONS[code]

  if (typeof action === 'function') {
    action()
  }
}

const addClass = (element, className) => element.classList.add(className)
const removeClass = (element, className) => element.classList.remove(className)

const applyBlur = () => {
  addClass(mainContainer, 'blur')
}

const removeBlur = () => {
  removeClass(mainContainer, 'blur')
}

const closeModal = () => {
  addClass(modal, 'hidden')
  removeBlur()
}

const showModal = () => {
  applyBlur()
  removeClass(modal, 'hidden')
}

// Prevents modal from closing when clicking inside container
const preventModalClose = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation()
  }

  if (event.preventDefault) {
    event.preventDefault()
  }
}

const handleChangeMaxScore = (event) => {
  const {
    target: { value },
  } = event
  setMaxScore(parseInt(value))
  resetGame()
}

const handleThemeToggle = () => {
  const currentTheme = app.getAttribute('data-theme')
  const isDark = currentTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  app.setAttribute('data-theme', nextTheme)

  if (isDark) {
    removeClass(themeSelector, 'fill')
    return
  }
  addClass(themeSelector, 'fill')
}

const updateWins = () => {
  p1WinsDisplay.textContent = p1Wins
  p2WinsDisplay.textContent = p2Wins
}

const addWin = (player) => {
  if (player === PLAYER_ONE) {
    p1Wins++
  } else {
    p2Wins++
  }

  updateWins()
}

setMaxScore(MAX_SCORE)

addScore(PLAYER_ONE)
addScore(PLAYER_TWO)

window.addEventListener('keydown', handleKeyDown, true)
player1.addEventListener('click', handleClick)
player2.addEventListener('click', handleClick)
button.addEventListener('click', resetGame)
modalContainer.addEventListener('click', preventModalClose)
modal.addEventListener('click', closeModal)
settingsButton.addEventListener('click', showModal)
themeSelector.addEventListener('click', handleThemeToggle)
maxScore.addEventListener('change', handleChangeMaxScore)

window.addEventListener('load', () => (app.style.visibility = 'visible'))
