let NUMBER_OF_PLAYERS = 2

let playersIds = []

let wins = []

function setPlayerCount() {
  NUMBER_OF_PLAYERS = 1
}

function getPlayerCount() {
  return NUMBER_OF_PLAYERS
}

const playersContainer = document.querySelector('.players')

function generatePlayers() {
  playersIds = Array.from(
    { length: NUMBER_OF_PLAYERS },
    (_, key) => `player-${key + 1}`
  )

  wins = Array.from({ length: NUMBER_OF_PLAYERS }, () => 0)

  for (let index = 1; index <= playersIds.length; index++) {
    const playerContainer = document.createElement('div')
    playerContainer.setAttribute(`data-player`, `player-${index}`)
    playerContainer.classList.add('counter')
    playerContainer.classList.add(`player${index}`)

    const scoreContainer = document.createElement('div')
    scoreContainer.classList.add('score-container')
    playerContainer.appendChild(scoreContainer)

    const playerName = document.createElement('span')
    playerName.classList.add('player')
    playerName.textContent = `Player#${index}`
    playerContainer.appendChild(playerName)

    const winsCounter = document.createElement('div')
    winsCounter.classList.add('wins-counter')

    const playerWins = document.createElement('span')
    playerWins.setAttribute('id', `player-${index}-wins`)
    winsCounter.appendChild(playerWins)

    playerContainer.appendChild(playerWins)

    playersContainer.appendChild(playerContainer)
  }
}

generatePlayers()

const getPlayers = () => document.querySelectorAll('[data-player]')

const getPlayersDisplay = () => document.querySelectorAll('[id^=player]')

function getWins() {
  return wins
}

function setWins(value) {
  wins = value
}

function findPlayerIndexById(id) {
  return playersIds.findIndex((item) => item === id)
}

function getPlayersIds() {
  return playersIds.slice()
}

export default {
  findPlayerIndexById,
  getPlayersIds,
  getWins,
  setWins,
  getPlayersDisplay,
  getPlayers,
  setPlayerCount,
  getPlayerCount,
}
