function init() {

  // console.log('This page has finished loading and JS is hooked')

  //* Game Variables
  let playerPosition = 0; 
  let timerId = 0



  //?Creating grid
  //* Initialise an empty array to contain the PacMan grid 
  const gameGrid = []

  //* Define width (i.e. number of grid squares wide)
  const width = 29 

  //* DOM elements (From the DOM, need to get the div that will contain the new div elements that make up the grid squares)
  const gridContainer = document.querySelector('.grid-container')
  // console.log(gridContainer)

  //* Define a layout array, containing a series of numbers that represent the function of the squares (i.e. 0 = food, 1 = barrier, 2 = flashing food, 3 = 'Ghost' lair, 4 = 'Player start')
  const layout =   [
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
        gameGrid[i].classList.add('Player')
        playerPosition = i
      }
    }
  }

  createGrid()

//!-----------------------------------------------------------------------------------------

  //? Creating movement and movement rules for 'Player'

  //*Game variables 
  //*Time delay constant between each movement (increase speed for higher difficulty?)
  const timeDelay = 200

  //*Check current position of 'Player'
  console.log('Currently player is in cell index', playerPosition)
  // console.log(gameGrid[playerPosition])


  //* Create new function attached to event listener for 'keyup' events
  function handlePlayerMove(event) {
    // console.log('keyup event function has been triggered')
    // if (timerId) {
    //   clearInterval(timerId)
    // }
    switch (event.keyCode) {
      case 39:
        // console.log('right key has been pressed')
        if (gameGrid[playerPosition + 1].className !== 'barrier') {
          clearInterval(timerId)
          timerId = setInterval(() => {
            if (gameGrid[playerPosition + 1].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player')
              playerPosition++
              gameGrid[playerPosition].classList.add('Player')
              foodsEaten()
              checkWin()
            } else {
              clearInterval(timerId)
              return
            }
          }, timeDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 37:
        // console.log('left key has been pressed')
        if (gameGrid[playerPosition - 1].className !== 'barrier') {
          clearInterval(timerId)
          timerId = setInterval(() => {
            if (gameGrid[playerPosition - 1].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player')
              playerPosition--
              gameGrid[playerPosition].classList.add('Player')
              foodsEaten()
              checkWin()
            } else {
              clearInterval(timerId)
              return
            }
          }, timeDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 38:
        // console.log('Up key has been pressed')
        if (gameGrid[playerPosition - width].className !== 'barrier') {
          clearInterval(timerId)
          timerId = setInterval(() => {
            if (gameGrid[playerPosition - width].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player')
              playerPosition -= width
              gameGrid[playerPosition].classList.add('Player')
              foodsEaten()
              checkWin()
            } else {
              clearInterval(timerId)
              return
            }
          }, timeDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      case 40:
        // console.log('Down key has been pressed')
        if (gameGrid[playerPosition + width].className !== 'barrier') {
          clearInterval(timerId)
          timerId = setInterval(() => {
            if (gameGrid[playerPosition + width].className !== 'barrier') {
              gameGrid[playerPosition].classList.remove('Player')
              playerPosition += width
              gameGrid[playerPosition].classList.add('Player')
              foodsEaten()
              checkWin()
            } else {
              clearInterval(timerId)
              return
            }
          }, timeDelay)
        } else {
          return
        }
        // console.log(playerPosition)
        break
      default: 
        console.log('Invalid key')
    }
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
    console.log(foodsRemaining.length)
    if (foodsRemaining.length === 0) {
      window.alert(`Congratulations, you won! Your score is ${scoreNum}`)
      const restart = window.confirm('Congratulations, you won! Do you wish to play again?')
      if (restart) {
        location.reload()
      }
    }
  }














}

window.addEventListener('DOMContentLoaded', init)