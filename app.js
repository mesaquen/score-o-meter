import { ENTER_KEY } from './scripts/keyboard.js'
import PlayerInfo from './scripts/player.js'
import Config from './scripts/config.js'
import Elements, { getValue, removeElement } from './scripts/elements.js'
import {
  addClass,
  removeClass,
  showModal,
  handleThemeToggle,
} from './scripts/theme.js'

let { MAX_SCORE } = Config
let {
  findPlayerIndexById,
  getPlayerCount,
  getPlayers,
  getPlayersDisplay,
  getPlayersIds,
  getWins,
  setWins,
  setPlayerCount,
} = PlayerInfo

const { app, button, maxScore, settingsButton, themeSelector } = Elements

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
  const players = getPlayers()

  const playerIndex = findPlayerIndexById(target)

  const player = players[playerIndex]
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
    addWin(playerIndex)
    showButton()
  }
  player.querySelector('.score-container').appendChild(nextElement)
}

const resetGame = () => {
  gameOver = false
  getPlayersIds().forEach((id) => addScore(id, true))
  hideButton()
}

const handleClick = (event) => {
  const target = event?.currentTarget?.dataset?.['player']
  addScore(target)
}

const KEYDOWN_ACTIONS = {
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
  const displays = getPlayersDisplay()
  const wins = getWins()
  for (let index = 0; index < wins.length; index++) {
    displays[index].textContent = wins[index]
  }
}

const addWin = (index) => {
  const wins = getWins()
  wins[index] = wins[index] + 1
  setWins(wins)
  updateWins()
}

setMaxScore(MAX_SCORE)

function subcribeToEvents() {
  for (let id of getPlayersIds()) {
    addScore(id)
  }

  for (let player of getPlayers()) {
    player.addEventListener('click', handleClick)
  }
}

subcribeToEvents()

button.addEventListener('click', resetGame)
settingsButton.addEventListener('click', showModal)
themeSelector.addEventListener('click', handleThemeToggle)
maxScore.addEventListener('change', handleChangeMaxScore)

window.addEventListener('keydown', handleKeyDown, true)
window.addEventListener('load', () => (app.style.visibility = 'visible'))
