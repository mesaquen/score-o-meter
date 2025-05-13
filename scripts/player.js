let NUMBER_OF_PLAYERS = 2

const playersIds = Array.from(
  { length: NUMBER_OF_PLAYERS },
  (_, key) => `player-${key + 1}`
)

const playersContainer = document.querySelector('.players')

function generatePlayers() {
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

const [player1, player2] = document.querySelectorAll('[data-player]')

const [p1WinsDisplay, p2WinsDisplay] =
  document.querySelectorAll('[id^=player]')

let [p1Wins, p2Wins] = Array.from({length: NUMBER_OF_PLAYERS}, () => 0)

export const [PLAYER_ONE, PLAYER_TWO] = playersIds

export default {
  p1Wins,
  p2Wins,
  player1,
  player2,
  p1WinsDisplay,
  p2WinsDisplay,
}
