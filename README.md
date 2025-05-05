# Score-o-meter

A simple vanilla JS powered score counter with CSS3 animations.

This score counter was a small experiment developed in my spare time with JS,
CSS and HTML to keep track of the score on my board game nights with family and
friends.

Usually we play games that are for 2 players or 2 teams, that's why the number
of players is fixed.

## How to use

- Click on the player's side of screen to increase its score count.
- When max score is reached a button will appear to restart the match.
- You can customize the score limit in the settings modal by clcking the Cog
  icon at the top-left corner on the screen.

## Keyboard accessibility

- `LEFT ARROW` or `RIGHT ARROW` to increase player's score.
- Hit `ENTER` to restart when button apears.

## Live demo

You can access the live demo at [https://mesaquen.github.io/score-o-meter](https://mesaquen.github.io/score-o-meter)

## Future features

Although the current state of the project is enough to my personal needs, I do
plan to improve and develop new features:

- Customize players names.
- Custom number of players.
- Persist data to prevent score loss if the page is reloaded.
- Reset button to clear all scores.
- Undo score increase in case of wrong click/tap.
- Make dark/light theme respect device preferences.