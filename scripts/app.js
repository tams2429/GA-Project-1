function init() {

  // console.log('This page has finished loading and JS is hooked')

  //* Game Variables
  let playerPosition = 0 
  let playerTimerId = 0
  let ghostTimerId = 0
  let gameTimerId = 0
  let gameOverTimerId = 0
  let hunterTimerId = 0
  let transformTimeOutId = 0
  let startingGhostPositions = [333, 390, 391, 392] 
  let currentGhostPositions = [333, 390, 391, 392]



  //?Creating grid
  //* Initialise an empty array to contain the PacMan grid 
  const gameGrid = []

  //* Define width (i.e. number of grid squares wide)
  const width = 29 

  //* DOM elements (From the DOM, need to get the div that will contain the new div elements that make up the grid squares)
  const gridContainer = document.querySelector('.grid-container')
  // console.log(gridContainer)

  //* Define a layout array, containing a series of numbers that represent the function of the squares (i.e. 0 = food, 1 = barrier, 2 = flashing food, 3 = 'Ghost' lair, 4 = 'Player start')
  const layout =  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 3, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]   


  
  //* Test array with only 1 food item
  // [
  //   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 3, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  //   1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1,
  //   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  // ]

  // console.log(layout.length)

  //* Create function that is used to create the grid
  function createGrid() {
    //* Interact with DOM to create new div elements to represent grid squares within existing 'grid-container' div + Populate 'gameGrid' array with new divs
    console.log(typeof(document.createElement('div')))
    // console.log('function createGrid has been invoked')
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      gridContainer.appendChild(square)
      gameGrid.push(square)

      //* Add 'if' conditional to compare with 'layout' array and assign corresponding class
      if (layout[i] === 0) {
        gameGrid[i].classList.add('food')
      } else if (layout[i] === 1) {
        gameGrid[i].classList.add('barrier')
      } else if (layout[i] === 2) {
        gameGrid[i].classList.add('flashing-food')
      } else if (layout[i] === 3) {
        gameGrid[i].classList.add('ghost-lair')
      } else if (layout[i] === 4) {
        gameGrid[i].classList.add('Player-Hunted')
        playerPosition = i
      }
    }
  }

  // createGrid()
//!-----------------------------------------------------------------------------------------
  //? Creating a function startGame() which will create the grid and call the 'ghost' movement function
  //*Game variables
  //! StartDelay has to be longer than ghostDelay otherwise ghostMove() wont be run as setInterval() will restart ghostMove() before it performs any movement
  //! Possibly attach startGame() to Event Listener when window.Prompt is pressed? 
  const startDelay = 500
  const ghostDelay = 200

  function startGame() {
    createGrid()
    gameTimerId = setInterval(ghostMove, startDelay)
    //* Keep time delay for iterations of capturePlayer() as low as possible, to initiate game over as soon as 'Player-Hunted' hits 'Ghost-Hunter'
    gameOverTimerId = setInterval(capturePlayer, 10)
    //* Add setInterval for iterations of captureGhost() as low as possible, in order to detect collisions and send 'Ghosts' back to lair 
 

  }

  startGame()





//!-----------------------------------------------------------------------------------------

  //? Creating movement and movement rules for 'Player'

  //*Game variables 
  //*Time delay constant between each movement (increase speed for higher difficulty?)
  const playerDelay = 200

  //*Check current position of 'Player'
  console.log('Currently player is in cell index', playerPosition)
  // console.log(gameGrid[playerPosition])


  //* Create new function attached to event listener for 'keyup' events
  function handlePlayerMove(event) {
    // console.log('keyup event function has been triggered')
    // if (playerTimerId) {
    //   clearInterval(playerTimerId)
    // }
    


    switch (event.keyCode) {
      case 39:
        // console.log('right key has been pressed')
        if (gameGrid[playerPosition + 1].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            //* Checking if player is hunted or hunter
            if (gameGrid[playerPosition + 1].className !== 'barrier') {
              //* Checking if player is hunted or hunter
              if (gameGrid[playerPosition].classList.contains('Player-Hunted')) {
                gameGrid[playerPosition].classList.remove('Player-Hunted')
                playerPosition++
                gameGrid[playerPosition].classList.add('Player-Hunted')
              } else if (gameGrid[playerPosition].classList.contains('Player-Hunter')) {
                gameGrid[playerPosition].classList.remove('Player-Hunter')
                playerPosition++
                gameGrid[playerPosition].classList.add('Player-Hunter')
              }
              foodsEaten()
              flashFoodEaten()
              checkWin()
            } else {
              clearInterval(playerTimerId)
              return
            }
          }, playerDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 37:
        // console.log('left key has been pressed')
        if (gameGrid[playerPosition - 1].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            if (gameGrid[playerPosition - 1].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player-Hunted')
              playerPosition--
              gameGrid[playerPosition].classList.add('Player-Hunted')
              foodsEaten()
              flashFoodEaten()
              checkWin()
            } else {
              clearInterval(playerTimerId)
              return
            }
          }, playerDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 38:
        // console.log('Up key has been pressed')
        if (gameGrid[playerPosition - width].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            if (gameGrid[playerPosition - width].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player-Hunted')
              playerPosition -= width
              gameGrid[playerPosition].classList.add('Player-Hunted')
              foodsEaten()
              flashFoodEaten()
              checkWin()
            } else {
              clearInterval(playerTimerId)
              return
            }
          }, playerDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 40:
        // console.log('Down key has been pressed')
        if (gameGrid[playerPosition + width].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            if (gameGrid[playerPosition + width].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player-Hunted')
              playerPosition += width
              gameGrid[playerPosition].classList.add('Player-Hunted')
              foodsEaten()
              flashFoodEaten()
              checkWin()
            } else {
              clearInterval(playerTimerId)
              return
            }
          }, playerDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      default: 
        console.log('Invalid key')
    }
    // const id = setInterval(ghostMove, playerDelay)
    // console.log('Id is', id)
  }

  //* Add event listener for the player movement function
  document.addEventListener('keyup', handlePlayerMove)


//!-------------------------------------------------------------------------------------------

  //?Behaviour of food
  //*Get Span element from the DOM to update as food is eaten
  const score = document.querySelector('#score-value')
  let scoreNum = parseFloat(score.innerHTML)
  // console.log(score)
  // console.log(scoreNum)
  // console.log(typeof(scoreNum))

  //* Create function to remove the food class + update score (+2000 for each food eaten), for invocation within the handlePlayerMove() function

  function foodsEaten() {
    if (gameGrid[playerPosition].classList.contains('food')) {
      gameGrid[playerPosition].classList.remove('food')
      scoreNum += 2000
      score.innerHTML = scoreNum
    } else {
      return
    }
  }

//!---------------------------------------------------------------------------------------------

  //?Winning condition
  //* Initialise an array constant, 'foodsRemaining', that will contain all the grids that have 'food' class
  let foodsRemaining = null

  //* Create a function, checkWin(), that will be attached to event listener function, handlePlayerMove(), to check whether the winning conditions have been fulfilled
  //* Using array method, array.filter(), to filter the gameGrid array and return only the grid squares with class 'food' to 'const foodsRemaining'
  //* Check the length of 'foodsRemaining' array and if it equals 0, then display an alert with a winning message, 'Congratulations, Game Won, Do you wish to play again?' (using window.confirm(message))

  //! Winning message appears before last item is removed?
  function checkWin() {
    // console.log('This is the checkWin function')
    foodsRemaining = gameGrid.filter(gridSquare => {
      return gridSquare.classList.contains('food') === true
    })
    // console.log(foodsRemaining)
    // console.log(foodsRemaining.length)
    if (foodsRemaining.length === 0) {
      clearInterval(gameTimerId)
      clearInterval(ghostTimerId)
      window.alert(`Congratulations, you won! Your score is ${scoreNum}`)
      const restart = window.confirm('Congratulations, you won! Do you wish to play again?')
      if (restart) {
        location.reload()
      } else {
        return
      }
    }
  }


//!----------------------------------------------------------------------------------------------


  //?Ghost position and movement
  //* Checking the first location of div with class 'ghost-lair'
  const ghostEntranceIndex = gameGrid.findIndex(object => {
    return object.className === 'ghost-lair'
  })

  console.log('The Ghost Entrance is at index', ghostEntranceIndex)
  //* Checking Position of 1st ghost (outside of lair) 
  // currentGhostPositions[0] = ghostEntranceIndex - width

  //!To add other ghost positions later

  //* Adding 1st ghost to 'gameGrid'
  gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')

  //* Defining array of possible movements for 'Ghost'
  const ghostDirections = [1, -1, width, -width]


  //* Define Event Listener Function to handle random directional 'Ghost' movements in response to player key being pressed

  function ghostMove() {
    // console.log('Ghost movement event function has been triggered')
    //* Generate random movement from array 'ghostDirections' using Math object library
    let randomDirection = ghostDirections[Math.floor(Math.random() * ghostDirections.length)]
    // console.log(randomDirection)



    //* For 2nd event onwards, clear interval of earlier events
    console.log(gameGrid[currentGhostPositions[0] + randomDirection].className)
    if (gameGrid[currentGhostPositions[0] + randomDirection].className !== 'barrier') {
      // console.log('GhostTimerId is', ghostTimerId)
      clearInterval(ghostTimerId)
      //* Use setInterval() to generate continuous movement 
      ghostTimerId = setInterval(() => {
        if (gameGrid[currentGhostPositions[0] + randomDirection].className !== 'barrier') {
          // console.log('Ghost1position is', currentGhostPositions[0])
          // gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter', 'Ghost-Hunted')
          // currentGhostPositions[0] += randomDirection
          
          //* Need to check if Ghost is currently Hunter or Hunted
          if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunted')) {
            gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunted')
            currentGhostPositions[0] += randomDirection
            gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunted')
            console.log('New ghost position is added')
          } else {
            gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
            currentGhostPositions[0] += randomDirection
            gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
          }
        }
      }, ghostDelay)
    } else {
      return
    }
    // console.log(gameGrid[currentGhostPositions[0] + randomDirection])
    // console.log(gameGrid[currentGhostPositions[0] + randomDirection].className)
  }




//!--------------------------------------------------------------------------------------------

  //? Function to check whether Ghosts have captured Player

  function capturePlayer() {
    // console.log('The capturePlayer function has been invoked')
    if (gameGrid[playerPosition].classList.contains('Ghost-Hunter')) {
      clearInterval(gameTimerId)
      clearInterval(ghostTimerId)
      clearInterval(gameOverTimerId)
      clearInterval(playerTimerId)
      document.removeEventListener('keyup', handlePlayerMove)
      setTimeout(() => {
        window.alert(`Game Over!, your score is ${scoreNum}`)
        const restart = window.confirm('Do you wish to play again?')
        if (restart) {
          location.reload()
        } else {
          return
        }
      },500)
    }
  }

  //? Function to check whether Player have captured Ghosts

  function captureGhosts() {
    console.log('The captureGhost function has been invoked')
    if (gameGrid[playerPosition].classList.contains('Ghost-Hunted')) {
      gameGrid[playerPosition].classList.remove('Ghost-Hunted')
      scoreNum += 10000
      score.innerHTML = scoreNum
      
      //* Send eaten Ghost back to lair & lair entrance + transform back into 'Ghost-Hunter'
      gameGrid[startingGhostPositions[0]].classList.add('Ghost-Hunter')
      currentGhostPositions[0] = startingGhostPositions[0]
    } 

  }


//!----------------------------------------------------------------------------------------------

  //? Flashing food function

  function flashFoodEaten() {
    // console.log('Flash food function has been invoked')
    //* If statement to check if 'flashing-food' class exists in position the player is moving in, if true, remove 'flashing-food' class and add 5000 points
    if (gameGrid[playerPosition].classList.contains('flashing-food')) {

      gameGrid[playerPosition].classList.remove('flashing-food')

      //* Changing Player class from 'Player-Hunted' to 'Player-Hunter'
      gameGrid[playerPosition].classList.remove('Player-Hunted')
      gameGrid[playerPosition].classList.add('Player-Hunter')

      scoreNum += 5000
      score.innerHTML = scoreNum
      //* Reset 'currentGhostPosition' to an empty array after everytime of eating 'flashing-food'
      currentGhostPositions = []
      //*For loop to output ghost position index in 'gameGrid' to an array, 'currentGhostPosition' at time of eating 'flashing-food'
      
      // clearInterval(hunterTimerId)
      for (let i = 0; i < gameGrid.length; i++) {
        if (gameGrid[i].classList.contains('Ghost-Hunter')) {
          currentGhostPositions.push(i)
          console.log(currentGhostPositions)
          gameGrid[i].classList.remove('Ghost-Hunter')
          gameGrid[i].classList.add('Ghost-Hunted')
        } else if (gameGrid[i].classList.contains('Ghost-Hunted')) {
          currentGhostPositions.push(i)
          console.log(currentGhostPositions)
        }
      }

      //* Add setInterval with captureGhost() that will detect 'if' there is collision between converted players and ghosts + add points + send ghosts back to original location
      hunterTimerId = setInterval(captureGhosts, 10)

      //* Add setTimeout with a logic that reverts everything back i.e. 'Ghost-Hunted' to 'Ghost-Hunter' & 'Player-Hunter' to 'Player-Hunted', within setTimout() add functionality to clear setInterval(captureGhost)
      clearInterval(transformTimeOutId)
      transformTimeOutId = setTimeout(() => {
        //*Transform Player class back from 'Player-Hunter' back to 'Player-Hunted'
        gameGrid[playerPosition].classList.remove('Player-Hunter')
        gameGrid[playerPosition].classList.add('Player-Hunted')

        //* Transform Ghost class back from 'Ghost-Hunted' back to 'Ghost-Hunter'
        for (let i = 0; i < gameGrid.length; i++) {
          if (gameGrid[i].classList.contains('Ghost-Hunted')) {
            currentGhostPositions.push(i)
            console.log(currentGhostPositions)
            gameGrid[i].classList.remove('Ghost-Hunted')
            gameGrid[i].classList.add('Ghost-Hunter')
          } else if (gameGrid[i].classList.contains('Ghost-Hunter')) {
            currentGhostPositions.push(i)
            console.log(currentGhostPositions)
          }
        }
      }, 10000)




    } else {
      return
    }
  }









}

window.addEventListener('DOMContentLoaded', init)