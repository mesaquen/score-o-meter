import { ENTER_KEY, LEFT_ARROW, RIGHT_ARROW } from './scripts/keyboard.js'
import PlayerInfo, { PLAYER_ONE, PLAYER_TWO } from './scripts/player.js'
import Config from './scripts/config.js'
import Elements, { getValue, removeElement } from './scripts/elements.js'
import { addClass, removeClass, showModal, handleThemeToggle } from './scripts/theme.js'

let { MAX_SCORE } = Config
let { p1Wins, p2Wins, player1, player2, p1WinsDisplay, p2WinsDisplay } =
  PlayerInfo

const {
  app,
  button,
  maxScore,
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
    removeClass(button, 'hide-restart')
    addClass(button, 'show-restart')
  }, 300)

const hideButton = () => {
  removeClass(button, 'show-restart')
  addClass(button, 'hide-restart')
}

const addScore = (target, shouldReset) => {
  if (gameOver) return

  const player = target === PLAYER_ONE ? player1 : player2
  const prevScore = player.querySelector('.current')
  const prevValue = getValue(prevScore)

  if (prevScore) {
    removeClass(prevScore, 'current')
    addClass(prevScore, 'previous')
    removeElement(prevScore)
  }

  const nextElement = document.createElement('span')
  const nextValue = prevScore ? prevValue + 1 : prevValue
  nextElement.textContent = shouldReset ? 0 : nextValue
  addClass(nextElement, 'score', 'current')

  if (!shouldReset && nextValue >= MAX_SCORE) {
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
  const target = event?.currentTarget?.dataset?.['player']
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

const handleChangeMaxScore = (event) => {
  const {
    target: { value },
  } = event
  setMaxScore(parseInt(value))
  resetGame()
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
settingsButton.addEventListener('click', showModal)
themeSelector.addEventListener('click', handleThemeToggle)
maxScore.addEventListener('change', handleChangeMaxScore)

window.addEventListener('load', () => (app.style.visibility = 'visible'))
