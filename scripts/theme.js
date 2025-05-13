import Elements from './elements.js'

const { app, themeSelector, mainContainer, modal, modalContainer } = Elements

export const addClass = (element, ...className) => element.classList.add(...className)
export const removeClass = (element, className) =>
  element.classList.remove(className)

export const handleThemeToggle = () => {
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

const applyBlur = () => {
  addClass(mainContainer, 'blur')
}

const removeBlur = () => {
  removeClass(mainContainer, 'blur')
}

export const closeModal = () => {
  addClass(modal, 'hidden')
  removeBlur()
}

export const showModal = () => {
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

modalContainer.addEventListener('click', preventModalClose)
modal.addEventListener('click', closeModal)