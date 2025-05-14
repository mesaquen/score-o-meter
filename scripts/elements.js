const app = document.querySelector('.app')
const mainContainer = document.querySelector('.container')
const modal = document.querySelector('.modal')
const modalContainer = document.querySelector('.modal-container')
const button = document.querySelector('.button')
const themeSelector = document.querySelector('.dark-mode-checkbox')
const maxScore = document.querySelector('.max-score')
const playerNumber = document.querySelector('.player-number')
const settingsButton = document.querySelector('.settings-button')

export function getValue(element) {
    return (element ? Number(element.textContent) : 0)
}

export function removeElement(element) {
    setTimeout(() => element.parentNode.removeChild(element), 1000)
}

export default {
  app,
  mainContainer,
  modal,
  modalContainer,
  button,
  themeSelector,
  maxScore,
  playerNumber,
  settingsButton,
}
