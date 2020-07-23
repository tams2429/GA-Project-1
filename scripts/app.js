function init() {

  //* Audio files
  const eating = new Audio('./sounds/inGame/eating3.mp3')
  const evolution = new Audio('./sounds/inGame/evolution1.mp3')
  const charmander = new Audio('./sounds/characters/charmander.mp3')
  const squirtle = new Audio('./sounds/characters/squirtle.mp3')
  const bulbasaur = new Audio('./sounds/characters/bulbasaur.mp3')
  const charizard = new Audio('./sounds/characters/charizard.mp3')
  const blastoise = new Audio('./sounds/characters/blastoise.mp3')
  const venusaur = new Audio('./sounds/characters/venusaur.mp3')
  const gastly = new Audio('./sounds/characters/gastly.mp3')
  const pacManLose = new Audio('./sounds/inGame/playerDeath.mp3')
  const restartGame = new Audio('./sounds/inGame/restart1.mp3')
  const monsterKill = new Audio('./sounds/inGame/ghostCapture.mp3')
  const bgm = new Audio('./sounds/inGame/BGM2.mp3')
  const bgmAfterTransform = new Audio('./sounds/inGame/BGMafterTransform.mp3')
  


  // console.log('This page has finished loading and JS is hooked')

  //* Game Variables
  let playerPosition = 0 
  let playerTimerId = 0
  // let ghostTimerId = 0
  let restart = true

  
  // let startingGhostPositions = [362, 390, 391, 392] 
  // let currentGhostPositions = [362, 390, 391, 392]

  //* flashFoodEaten() variables
  // let hunterTimerId = 0
  let transformTimeOutId = 0


  //* ghostAggroMove() variables
  // let gameTimerId = 0
  let distances = []
  let chosenMove = 0
  let playerDummyPositions = [330, 336, 510, 504]
  // let iterator = 0

  //* ghostScaredMove() variables
  let playerHomingPosition = playerDummyPositions[0]
  let scaredMoveIterator = 1

  //? Creating Ghost Objects
  //* Create a Ghost Class Constructor for the Ghost objects to be built from
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.aggroMoveTimerId = NaN
      this.scaredMoveTimerId = NaN
      this.hunterTimerId = NaN
      this.gameOverTimerId = NaN
      this.aggroMoveIterator = 0
    }
  }

  //* Creating the 4 ghosts to have the same speed for now
  const ghosts = [
    new Ghost('ghostTop', 362, 400),
    new Ghost('ghostLeft', 390, 1100),
    new Ghost('ghostMiddle', 391, 700),
    new Ghost('ghostRight', 392, 1000)
  ]

  //?Creating grid
  //* Initialise an empty array to contain the PacMan grid 
  const gameGrid = []

  //* Define width (i.e. number of grid squares wide)
  const width = 29 

  //* DOM elements (From the DOM, need to get the div that will contain the new div elements that make up the grid squares)
  const gridContainer = document.querySelector('.grid-container')
  // console.log(gridContainer)

  //* Define a layout array, containing a series of numbers that represent the function of the squares (i.e. 0 = food, 1 = barrier, 2 = flashing food, 3 = 'Ghost' lair, 4 = 'Player start',)
  const layout = [
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
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 3, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
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
    // console.log(typeof(document.createElement('div')))
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


    //* Adding ghosts to 'gameGrid'
    ghosts.forEach(ghost => {
      gameGrid[ghost.currentIndex].classList.add('Ghost-Hunter')
      gameGrid[ghost.currentIndex].classList.add(ghost.className)
    })

    
    //* Check both unique ghost classname and 'Ghost-Hunter' classes have been added to the grid
    // ghosts.forEach(ghost => {
    //   console.log(gameGrid[ghost.currentIndex])
    // })
    // gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
  }

//!-----------------------------------------------------------------------------------------
  //? Creating a function handleStartGame() which will create the grid and call the 'ghost' movement function
  //*Game variables
  //! Initialise possible moves for the Ghost aggro move logic
  let possibleGhostMoves = [-1, 1, -width, width]

  //! Possibly attach startGame() to Event Listener when window.Prompt is pressed? 
  function handleStartGame() {
    createGrid()

    //*Start playing BGM with player first key press
    // bgm.play()

    //*Passing each ghost object into the ghostAggroMove() 
    ghosts.forEach(ghost => ghostAggroMove(ghost))
    

    //* Passing each ghost object into the capturePlayer()
    ghosts.forEach(ghost => capturePlayer(ghost))

 

  }

  // const dummyBtn = document.querySelector('button')
  // dummyBtn.addEventListener('click', handleStartGame)
  handleStartGame()


  //? Created an event Listener function, handleBgm(), that will only play once after the 1st key is pressed
  function handleBgm() {
    bgm.play()
  }

  document.addEventListener('keyup', handleBgm, { once: true })
  





//!-----------------------------------------------------------------------------------------

  //? Creating movement and movement rules for 'Player'

  //*Game variables 
  //*Time delay constant between each movement (increase speed for higher difficulty?)
  const playerDelay = 200

  //*Check current position of 'Player'
  // console.log('Currently player is in cell index', playerPosition)
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
              //* Checking if player is hunted or hunter
              if (gameGrid[playerPosition].classList.contains('Player-Hunted')) {
                gameGrid[playerPosition].classList.remove('Player-Hunted')
                playerPosition--
                gameGrid[playerPosition].classList.add('Player-Hunted')
              } else if (gameGrid[playerPosition].classList.contains('Player-Hunter')) {
                gameGrid[playerPosition].classList.remove('Player-Hunter')
                playerPosition--
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
      case 38:
        // console.log('Up key has been pressed')
        if (gameGrid[playerPosition - width].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            if (gameGrid[playerPosition - width].className !== 'barrier') {
              //* Checking if player is hunted or hunter
              if (gameGrid[playerPosition].classList.contains('Player-Hunted')) {
                gameGrid[playerPosition].classList.remove('Player-Hunted')
                playerPosition -= width
                gameGrid[playerPosition].classList.add('Player-Hunted')
              } else if (gameGrid[playerPosition].classList.contains('Player-Hunter')) {
                gameGrid[playerPosition].classList.remove('Player-Hunter')
                playerPosition -= width
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
      case 40:
        // console.log('Down key has been pressed')
        if (gameGrid[playerPosition + width].className !== 'barrier') {
          clearInterval(playerTimerId)
          playerTimerId = setInterval(() => {
            if (gameGrid[playerPosition + width].className !== 'barrier') {
              //* Checking if player is hunted or hunter
              if (gameGrid[playerPosition].classList.contains('Player-Hunted')) {
                gameGrid[playerPosition].classList.remove('Player-Hunted')
                playerPosition += width
                gameGrid[playerPosition].classList.add('Player-Hunted')
              } else if (gameGrid[playerPosition].classList.contains('Player-Hunter')) {
                gameGrid[playerPosition].classList.remove('Player-Hunter')
                playerPosition += width
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
      eating.play()
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
      ghosts.forEach(ghost => {
        clearInterval(ghost.aggroMoveTimerId)
        clearInterval(ghost.scaredMoveTimerId)
      })
      clearInterval(playerTimerId)
      window.alert(`Congratulations, you won! Your score is ${scoreNum}`)
      const restart = window.confirm('Do you wish to play again?')
      if (restart) {
        location.reload()
      } else {
        return
      }
    }
  }


//!----------------------------------------------------------------------------------------------


  //!Ghost Random Movement Functions (Not Used)
  // //* Checking the first location of div with class 'ghost-lair'
  // const ghostEntranceIndex = gameGrid.findIndex(object => {
  //   return object.className === 'ghost-lair'
  // })

  // console.log('The Ghost Entrance is at index', ghostEntranceIndex)
  // //* Checking Position of 1st ghost (outside of lair) 
  // // currentGhostPositions[0] = ghostEntranceIndex - width



  // //* Defining array of possible movements for 'Ghost'
  // const ghostDirections = [1, -1, width, -width]


  // //* Define Event Listener Function to handle random directional 'Ghost' movements in response to player key being pressed

  // function ghostMove() {
  //   // console.log('Ghost movement event function has been triggered')
  //   //* Generate random movement from array 'ghostDirections' using Math object library
  //   let randomDirection = ghostDirections[Math.floor(Math.random() * ghostDirections.length)]
  //   // console.log(randomDirection)



  //   //* For 2nd event onwards, clear interval of earlier events
  //   console.log(gameGrid[currentGhostPositions[0] + randomDirection].className)
  //   if (gameGrid[currentGhostPositions[0] + randomDirection].className !== 'barrier') {
  //     // console.log('GhostTimerId is', ghostTimerId)
  //     clearInterval(ghostTimerId)
  //     //* Use setInterval() to generate continuous movement 
  //     ghostTimerId = setInterval(() => {
  //       if (gameGrid[currentGhostPositions[0] + randomDirection].className !== 'barrier') {
  //         // console.log('Ghost1position is', currentGhostPositions[0])
  //         // gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter', 'Ghost-Hunted')
  //         // currentGhostPositions[0] += randomDirection
          
  //         //* Need to check if Ghost is currently Hunter or Hunted
  //         if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunted')) {
  //           gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunted')
  //           currentGhostPositions[0] += randomDirection
  //           gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunted')
  //           console.log('New ghost position is added')
  //         } else {
  //           gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
  //           currentGhostPositions[0] += randomDirection
  //           gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
  //         }
  //       }
  //     }, ghostDelay)
  //   } else {
  //     return
  //   }
    // console.log(gameGrid[currentGhostPositions[0] + randomDirection])
    // console.log(gameGrid[currentGhostPositions[0] + randomDirection].className)
  // }




//!--------------------------------------------------------------------------------------------

  // function handleRestart() {
  //   if (restart)
  // }


  //? Function to check whether Ghosts have captured Player

  function capturePlayer(ghost) {
    // console.log('The capturePlayer function has been invoked')
    

    ghost.gameOverTimerId = setInterval(function() {
      if (playerPosition === ghost.currentIndex && gameGrid[playerPosition].classList.contains('Ghost-Hunter')) {
        // console.log('Ghost hunter is', ghost.className)
        //* Stop existing music and play pacman lose music
        bgmAfterTransform.pause()
        bgmAfterTransform.currentTime = 0
        bgm.pause()
        bgm.currentTime = 0
        pacManLose.play()
        clearInterval(ghost.aggroMoveTimerId)
        clearInterval(ghost.scaredMoveTimerId)
        clearInterval(playerTimerId)
        document.removeEventListener('keyup', handlePlayerMove)
        setTimeout(() => {
          window.alert(`Game Over! your score is ${scoreNum}`)
          restart = window.confirm('Do you wish to play again?')
          if (restart) {
            restartGame.play()
            setTimeout(() => {
              location.reload()
            }, 3000)
          } else {
            return
          }
        },500)
        clearInterval(ghost.gameOverTimerId)
        clearInterval(ghost.aggroMoveTimerId)
        clearInterval(ghost.hunterTimerId)
        clearTimeout(transformTimeOutId)
      } else if (restart === false) {
        //* This 'Else' case is to make sure that if player doesn't click to play again, the other ghosts will also stop moving
        clearInterval(ghost.aggroMoveTimerId)
        clearInterval(ghost.scaredMoveTimerId)
        clearInterval(ghost.hunterTimerId)
        clearTimeout(transformTimeOutId)
      }
    }, 10)
    
  }

  //? Function to check whether Player have captured Ghosts

  function captureGhosts(ghost) {
    // console.log('The captureGhost function has been invoked')

    ghost.hunterTimerId = setInterval(function() {
      if (ghost.currentIndex === playerPosition) {
        // console.log('Ghost being sent back is', ghost.className)
        gastly.play()
        monsterKill.play()
        gameGrid[playerPosition].classList.remove('Ghost-Hunted')
        gameGrid[playerPosition].classList.remove(ghost.className)
        scoreNum += 10000
        score.innerHTML = scoreNum
        
        //* Send eaten Ghost back to lair & lair entrance + transform back into 'Ghost-Hunter'
        gameGrid[ghost.startIndex].classList.add('Ghost-Hunter')
        gameGrid[ghost.startIndex].classList.add(ghost.className)
        ghost.currentIndex = ghost.startIndex
  
        //* Reset iterator for ghostAggroMove() so ghosts sent back to lair, can come out of lair again
        ghost.aggroMoveIterator = 0
  
        //* Start ghostAggroMove() when ghosts are sent back and becomes 'Ghost-Hunter' class again
        ghostAggroMove(ghost)
        //* After ghosts are sent back, stop captureGhosts() for that particular ghost otherwise when it collides as a Hunter, a new ghost hunter will be added back in the ghost lair since this function will still be active for that ghost
        clearInterval(ghost.hunterTimerId)
      } 
    }, 10)

  }



//!----------------------------------------------------------------------------------------------

  //? Flashing food function

  function flashFoodEaten() {
    // console.log('Flash food function has been invoked')
    // console.log(currentGhostPositions)
    

    //* If statement to check if 'flashing-food' class exists in position the player is moving in, if true, remove 'flashing-food' class and add 5000 points
    if (gameGrid[playerPosition].classList.contains('flashing-food')) {

      

      gameGrid[playerPosition].classList.remove('flashing-food')

      //* Add evolution music as flashing food is removed and stopping previous after evolution bgm
      bgm.pause()
      bgm.currentTime = 0
      bgmAfterTransform.pause()
      bgmAfterTransform.currentTime = 0
      charmander.play()
      evolution.play()
      scoreNum += 5000
      score.innerHTML = scoreNum

      //* Stop player and ghost movement as evolution is ongoing
      document.removeEventListener('keyup', handlePlayerMove)
      clearInterval(playerTimerId)
      ghosts.forEach(ghost => {
        clearInterval(ghost.aggroMoveTimerId)
      })

      //*Constantly change classes while evolution is happening
      const evolutionTimer = setInterval(() => {
        if (gameGrid[playerPosition].classList.contains('Player-Hunted')) {
          gameGrid[playerPosition].classList.remove('Player-Hunted')
          gameGrid[playerPosition].classList.add('Player-Hunter')
        } else {
          gameGrid[playerPosition].classList.remove('Player-Hunter')
          gameGrid[playerPosition].classList.add('Player-Hunted')
        }
      }, 1000)
      
      
      
      
      //* Delay class change until evolution is over
      setTimeout(() => {
        clearInterval(evolutionTimer)
        charizard.play()
        bgmAfterTransform.play()
        //* Changing Player class from 'Player-Hunted' to 'Player-Hunter'
        document.addEventListener('keyup', handlePlayerMove)
        gameGrid[playerPosition].classList.remove('Player-Hunted')
        gameGrid[playerPosition].classList.add('Player-Hunter')

        //* Changing ghost class from 'Ghost-Hunter' to 'Ghost-Hunted'
        //* For each ghost object change class to hunted and clearInterval for each timerId for ghostAggroMove(), ghostScaredMove(), captureGhosts()
        //* Invoke the ghostScaredMove() and captureGhosts() for each ghost
        ghosts.forEach(ghost => {
          if (gameGrid[ghost.currentIndex].classList.contains('Ghost-Hunter')) {
            gameGrid[ghost.currentIndex].classList.remove('Ghost-Hunter')
            gameGrid[ghost.currentIndex].classList.add('Ghost-Hunted')
          }
          //* Clear Interval to stop ghostAggroMove() and any ghostScaredMove() (from prior flashing foods)
          clearInterval(ghost.aggroMoveTimerId)
          clearInterval(ghost.scaredMoveTimerId)
          clearInterval(ghost.hunterTimerId)
          ghostScaredMove(ghost)
          captureGhosts(ghost)
        }) 
      }, 7000)

      
      
      
      

      
      


      //* Add setTimeout with a logic that reverts everything back i.e. 'Ghost-Hunted' to 'Ghost-Hunter' & 'Player-Hunter' to 'Player-Hunted', within setTimout() add functionality to clear setInterval(captureGhost)
      clearTimeout(transformTimeOutId)
      transformTimeOutId = setTimeout(() => {
        //*Transform Player class back from 'Player-Hunter' back to 'Player-Hunted'
        gameGrid[playerPosition].classList.remove('Player-Hunter')
        gameGrid[playerPosition].classList.add('Player-Hunted')

        //* For each ghost object, transform ghost class back from 'Ghost-Hunted' back to 'Ghost-Hunter' & 
        //* Stop ghostScaredMove(), any pre-existing ghostAggroMove() and captureGhosts() and restart interval for ghostAggroMove() again after ghosts are transformed back to 'Ghost-Hunter' class
        ghosts.forEach(ghost => {
          if (gameGrid[ghost.currentIndex].classList.contains('Ghost-Hunted')) {
            gameGrid[ghost.currentIndex].classList.remove('Ghost-Hunted')
            gameGrid[ghost.currentIndex].classList.add('Ghost-Hunter')
          }
          clearInterval(ghost.scaredMoveTimerId)
          clearInterval(ghost.aggroMoveTimerId)
          clearInterval(ghost.hunterTimerId)
          ghostAggroMove(ghost)
        })
        //* replay normal BGM after evolution has worn off
        bgm.play()
      }, 22000)
    } else {
      return
    }
  }





//!----------------------------------------------------------------------------------------------------

  //? Ghost AI movements (should move closer to Player)
  //* 'playerPosition' and 'currentGhostPositions' already defined and are actively changing
  
  //*Create function to replace ghostMove() (i.e. random ghost movement), which will contain logic for ghosts to move closer to player
  //* To customise 'iterator' and 'playerDummyPosition' for different ghosts 
  //* i.e. LHS ghost, iterator <= 6, playerDummyPosition[1]
  //* i.e. Middle ghost, iterator <= 5, playerDummyPosition[0]
  //* i.e. RHS ghost, iterator <= 6, playerDummyPosition [0]

  function ghostAggroMove(ghost) {
    
    
    // console.log('The current ghost is', ghost.className)
    // console.log('The starting position is', ghost.currentIndex)
    let playerDummyPosition = 0
    let iteratorLimit = 0

    //*Assigning different 'playerDummyPositions' and iterator limits based on different ghosts
    if (ghost.className === 'ghostTop') {
      playerDummyPosition = playerDummyPositions[0]
      iteratorLimit = 3 
    } else if (ghost.className === 'ghostMiddle') {
      playerDummyPosition = playerDummyPositions[0]
      iteratorLimit = 5
    } else if (ghost.className === 'ghostRight') {
      playerDummyPosition = playerDummyPositions[0]
      iteratorLimit = 6 
    } else if (ghost.className === 'ghostLeft') {
      playerDummyPosition = playerDummyPositions[1]
      iteratorLimit = 6 
    }

    ghost.aggroMoveTimerId = setInterval(function() {
      //* First, if statement addresses ghosts that are still in ghost lair (by comparing with the ghost position with a location directly outside the ghost lair and checking the move iterations that has elapsed) (i.e. if it hasn't reached outside of the lair after the first few moves continue to home out of the lair)
      //* Therefore, 1st if statement is to help the ghost to home in to a location directly outside of the lair and escape
      // console.log('Ghost name is', ghost.className)
      // console.log('Dummy position is', playerDummyPosition)
      // console.log('iterator Limit is', iteratorLimit)
      // console.log('Current position is', ghost.currentIndex)
      if (ghost.currentIndex !== playerDummyPosition && ghost.aggroMoveIterator <= iteratorLimit) {
        for (let i = 0; i < possibleGhostMoves.length; i++) {
          if (Math.abs(ghost.currentIndex - playerDummyPosition) > Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerDummyPosition)) {
            // console.log('The ghost will move by', possibleGhostMoves[i])
            // console.log('Valid moves are', possibleGhostMoves[i])
            //*If new move reduces distance between the ghost and the target position, check if this new location has a barrier or ghosts, if no barrier or ghosts, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier/ghosts)
            if (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('barrier') && (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunter') && !gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunted'))) {
              // console.log('no barrier')
              distances.push(Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerDummyPosition))
          
              //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier/ghosts
              for (let j = 0; j < distances.length; j++) {
                if (distances.length === 1) {
                  // console.log('for loop run')
                  chosenMove = possibleGhostMoves[i]
                } else if (distances[j] < distances [j - 1] ) {
                  chosenMove = possibleGhostMoves[i]
                }
              }
            }
          }
        }

        //* Else statement is to help ghost chase player, after the ghost has escaped the ghost lair
      } else {
        for (let i = 0; i < possibleGhostMoves.length; i++) {
          if (Math.abs(ghost.currentIndex - playerPosition) > Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerPosition)) {
            // console.log('The ghost will move by', possibleGhostMoves[i])
            // console.log('Valid moves are', possibleGhostMoves[i])
            //*If new move reduces distance between the ghost and the player, check if this new location has a barrier or ghosts, if no barrier/ghosts, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier/ghosts)
            if (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('barrier') && (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunter') && !gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunted'))) {
              distances.push(Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerPosition))
    
              //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier/ghosts
              for (let j = 0; j < distances.length; j++) {
                if (distances.length === 1) {
                  // console.log('for loop run')
                  chosenMove = possibleGhostMoves[i]
                } else if (distances[j] < distances [j - 1]) {
                  chosenMove = possibleGhostMoves[i]
                }
              }
            }
          }
        }
      }



      // console.log('Valid distances are', distances)
      // console.log('Chosen Move is', chosenMove)

      //* Once chosenMove has been defined, apply the move
      //* Apply only if the ghost has class 'Ghost-Hunter'
      if (gameGrid[ghost.currentIndex].classList.contains('Ghost-Hunter')) {
        gameGrid[ghost.currentIndex].classList.remove('Ghost-Hunter')
        gameGrid[ghost.currentIndex].classList.remove(ghost.className)
        ghost.currentIndex += chosenMove
        // console.log('Chosen move is', chosenMove)
        gameGrid[ghost.currentIndex].classList.add('Ghost-Hunter')
        gameGrid[ghost.currentIndex].classList.add(ghost.className)
      }
      // gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
      // currentGhostPositions[0] += chosenMove
      // gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')

      //* reset 'distances' array
      distances = []
      //* reset 'chosenMove' 
      chosenMove = 0

      //* increase Iterator (for use to get ghosts out of lair)
      ghost.aggroMoveIterator++
      // console.log(iterator)
    }, ghost.speed) 
  }




  //* function ghostScaredMove created to apply logic to ghost movement when they are being hunted by player
  //* Invoked within the flashFoodEaten()
  //* Will direct hunted ghost to move back towards a corner of the ghost lair, once reached, the homing position, will change to another corner of the ghost lair, by cycling through the 'playerDummyPositions' array
  function ghostScaredMove(ghost) {
    // console.log('This is the ghostScaredMove function')

    ghost.scaredMoveTimerId = setInterval(function() {
      //* if current ghost position is not at the corner of the ghost lair, move towards it
      if (ghost.currentIndex !== playerHomingPosition) {
        for (let i = 0; i < possibleGhostMoves.length; i++) {
          if (Math.abs(ghost.currentIndex - playerHomingPosition) > Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerHomingPosition)) {
            // console.log('The ghost will move by', possibleGhostMoves[i])
            // console.log('Valid moves are', possibleGhostMoves[i])
            //*If new move reduces distance between the ghost and the homing position, check if this new location has a barrier or ghost, if no barrier or ghost, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier)
            if (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('barrier') && (!gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunter') && !gameGrid[ghost.currentIndex + possibleGhostMoves[i]].classList.contains('Ghost-Hunted'))) {
              distances.push(Math.abs((ghost.currentIndex + possibleGhostMoves[i]) - playerHomingPosition))

              //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier/ghosts
              for (let j = 0; j < distances.length; j++) {
                if (distances.length === 1) {
                  // console.log('for loop run')
                  chosenMove = possibleGhostMoves[i]
                } else if (distances[j] < distances [j - 1] ) {
                  chosenMove = possibleGhostMoves[i]
                }
              }
            }
          }
        }

        //* If ghost at corner of the ghost lair, then change the homing position to another corner of the ghost lair
      } else {
        playerHomingPosition = playerDummyPositions[scaredMoveIterator % 4]
      }

      //* Once chosenMove has been defined, apply the move
      //* Apply only if the ghost has class 'Ghost-Hunted'
      if (gameGrid[ghost.currentIndex].classList.contains('Ghost-Hunted')) {
        gameGrid[ghost.currentIndex].classList.remove('Ghost-Hunted')
        gameGrid[ghost.currentIndex].classList.remove(ghost.className)
        ghost.currentIndex += chosenMove
        gameGrid[ghost.currentIndex].classList.add('Ghost-Hunted')
        gameGrid[ghost.currentIndex].classList.add(ghost.className)
        // console.log('The ghost classname is', ghost.className)
        // console.log('The ghost index is', ghost.currentIndex)
      }

      //* reset 'distances' array
      distances = []
      //* reset 'chosenMove' 
      chosenMove = 0

      scaredMoveIterator++

    }, ghost.speed) 

  }




}

window.addEventListener('DOMContentLoaded', init)