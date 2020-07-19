# GA-Project-1
This repo contains the 1st project (Make a Game) after module 1 of GA SEI Bootcamp

## Plan

### Grid
* 29x29 grid,
* Generate grid by creating and comparing against an array of numbers, each number will be unique and correspond to the following objects:
  * 0 = food,
  * 1 = barrier,
  * 2 = flashing food,
  * 3 = ghost lair

### Player position and movement
* Add '.player' class to the starting position in the grid array,
* Add Event Listener for 'keydown' event? and attach to a new function (i.e. function handlePlayerMove()) to govern movement of player,
* First, remove class '.Player' in current gameGrid[ playerPosition ],
* Within function, add 'switch' statement to check which keys are pressed and nested 'if' statement to define boundaries of movements:
  1. For left + right movement, if (gameGrid[player position + 1].classList !== 'barrier'), then => gameGrid[playerPosition + 1]?
  2. For up + down movement, if (gameGrid[player position + width].classList !== 'barrier'), then => gameGrid[playerPosition + width]?
  3. Add default case: console.log('Invalid key')
* Within function, with new 'playerPosition' => gameGrid[ playerPosition ].classList.add('Player')








### Behaviour of Food