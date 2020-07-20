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
* Create a constant, const Score, referring to the span DOM element, whose innerHTML will be updated as food is eaten,
* Create a new function containing the behaviour of food when 'eaten' by pacman, this will be invoked within the function, handlePlayerMove(), which is attached to the 'keyup' event,
* This new function will remove 'food' class from the new cell + add 2000 points to the 'Score.innerHTML'

### Winning condition
* Create a function that will be invoked within the function, handlePlayerMove(), which is attached to the 'keyup' event,
* This function will check the 'gameGrid' array for any class, '.food' and if there is not => return an alert, saying 'Congratulations, Game Won, Do you wish to play again?'
  1. Initialise (= null) a new const, 'foodsRemaining', to later contain all the grids with food class remaining,
  2. To check 'gameGrid', use array method, array.filter, to output an array with the class, 'food'
  3. Using array method, array.length, check the length of the array, if length = 0 => that game is won
  4. Display winning alerts
