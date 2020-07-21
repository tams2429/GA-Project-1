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
* Add Event Listener for 'keyup' event? and attach to a new function (i.e. function handlePlayerMove()) to govern movement of player,
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

### Ghost position and movement
* Add '.Ghost' class to the starting position in the grid array,
* Add Event Listener (not sure what? maybe attach to same event listener 'keyup' in response to player move) and attach to a new function (i.e. function handleGhostMove()) to govern movement of Ghost based on movement of Player?
* Initially try to do random movement for ghost by creating an array of possible movement (i.e. [-1, 1, -width, width]) and using 'let movement = array[Math.floor(Math.random() * array.length)]' to select any of the movements, 'if' ('gameGrid[ghostPosition + movement].className !== 'barrier') then remove className 'ghost' from old position, update 'ghostPosition' and add className 'ghost' to new position, (Encapsulate this whole step in a setInterval() method)

### Ghost capturing Player 
* Create a function, capturePlayer(), that checks if a grid square contains both classes, 'Player-Hunted' and 'Ghost-Hunter' at any one time,
* Use setInterval() method to check a regular intervals? more regular than movement of player and ghost? and attach function to startGame() to start checking from the start of the game

### Behaviour of Flashing food (Could refactor later and combine with foodsEaten())
* Create a new function containing the behaviour of 'Flashing food' when 'eaten' by pacman, this will be invoked within the function, handlePlayerMove()
* This function will contain an 'if' conditional statement, which will check if 'gameGrid[ playerPosition].classList.contains('flashing-food')', then remove class 'flashing-foods' from that cell and add 5000 points to 'scoreNum' and update 'score.innerHTML'
* Within this 'if' statement, use array.map method (i.e. const currentGhostPositions = gameGrid.map((object, index) => {if (object.classList.contains('Ghost-Hunter)){return index}} ) ) to find all the indexes of the objects with class 'Ghost-Hunter' and store them in array 'currentGhostPositions',
* Access the object, remove the class 'Ghost-Hunter' (i.e. gameGrid[currentGhostPositions [0]].classList.remove('Ghost-Hunter')) and add the class 'Ghost-Hunted'
  * May already know the ghost positions, 'ghost1Position', 'ghost2Position' etc
* Access the player object and remove the class 'Player-Hunted' (i.e. gameGrid[ playerPosition ].classList.remove('Player-Hunted)) and then add the class 'Player-Hunter'
* setTimeout() for function (either write inline or define separate function, undoTransform(), to be called) that reverses the class changes above 


### Player capturing Ghost
* Create a function, captureGhost(), that checks if a grid square contains both classes, 'Player-Hunter' and 'Ghost-Hunted' at any one time,
* Similar to, capturePlayer(), can attach to startGame() and use setInterval() method to check at regular intervals from the start of the game 
* However, this could probably be refactored later on to be be invoked only when flashing food behaviour has been activated?

