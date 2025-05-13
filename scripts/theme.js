import Elements from './elements.js'

const { app, themeSelector } = Elements

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
