export const PLAYER_ONE = '.player1'
export const PLAYER_TWO = '.player2'

const player1 = document.querySelector(PLAYER_ONE)
const player2 = document.querySelector(PLAYER_TWO)
const p1WinsDisplay = document.querySelector('#player-one-wins')
const p2WinsDisplay = document.querySelector('#player-two-wins')

let p1Wins = 0
let p2Wins = 0

export default {
  p1Wins,
  p2Wins,
  player1,
  player2,
  p1WinsDisplay,
  p2WinsDisplay,
}
