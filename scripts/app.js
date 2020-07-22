function init() {

  // console.log('This page has finished loading and JS is hooked')

  //* Game Variables
  let playerPosition = 0 
  let playerTimerId = 0
  let ghostTimerId = 0
  let gameOverTimerId = 0
  let hunterTimerId = 0
  let transformTimeOutId = 0
  
  let startingGhostPositions = [362, 390, 391, 392] 
  let currentGhostPositions = [362, 390, 391, 392]

  //* ghostAggroMove() variables
  let gameTimerId = 0
  let distances = []
  let chosenMove = 0
  let playerDummyPositions = [330, 336, 510, 504]
  let iterator = 0

  //* ghostScaredMove() variables
  let playerHomingPosition = playerDummyPositions[0]
  let scaredMoveIterator = 1
  let scaredMoveTimeOutId = 0



  //?Creating grid
  //* Initialise an empty array to contain the PacMan grid 
  const gameGrid = []

  //* Define width (i.e. number of grid squares wide)
  const width = 29 

  //* DOM elements (From the DOM, need to get the div that will contain the new div elements that make up the grid squares)
  const gridContainer = document.querySelector('.grid-container')
  // console.log(gridContainer)

  //* Define a layout array, containing a series of numbers that represent the function of the squares (i.e. 0 = food, 1 = barrier, 2 = flashing food, 3 = 'Ghost' lair, 4 = 'Player start',)
  const layout =  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 3, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]
  // [
  //   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  //   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 3, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  //   1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  //   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  //   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  // ]   


  
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

    //* Add ghost positions here
    //!To add other ghost positions later

    //* Adding 1st ghost to 'gameGrid'
    gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
  }

  // createGrid()
//!-----------------------------------------------------------------------------------------
  //? Creating a function startGame() which will create the grid and call the 'ghost' movement function
  //*Game variables
  //! StartDelay has to be longer than ghostDelay otherwise ghostMove() wont be run as setInterval() will restart ghostMove() before it performs any movement
  //! Possibly attach startGame() to Event Listener when window.Prompt is pressed? 
  const startDelay = 500
  const ghostDelay = 200

  //! Initialise possible moves for the Ghost aggro move logic
  let possibleGhostMoves = [-1, 1, -width, width]

  function startGame() {
    createGrid()
    // gameTimerId = setInterval(ghostMove, startDelay)

    //! To reinstate after new function is tested
    gameTimerId = setInterval(ghostAggroMove, startDelay)
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
              // ghostAggroMove()
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
              // ghostAggroMove()
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
              // ghostAggroMove()
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
              // ghostAggroMove()
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
      clearInterval(scaredMoveTimeOutId)
      clearInterval(playerTimerId)
      // clearInterval(ghostTimerId)
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
      // clearInterval(ghostTimerId)
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
    // console.log('The captureGhost function has been invoked')
    if (gameGrid[playerPosition].classList.contains('Ghost-Hunted')) {
      gameGrid[playerPosition].classList.remove('Ghost-Hunted')
      scoreNum += 10000
      score.innerHTML = scoreNum
      
      //* Send eaten Ghost back to lair & lair entrance + transform back into 'Ghost-Hunter'
      gameGrid[startingGhostPositions[0]].classList.add('Ghost-Hunter')
      currentGhostPositions[0] = startingGhostPositions[0]

      //* Reset iterator for ghostAggroMove() so ghosts sent back to lair, can come out of lair again
      iterator = 0

      //* Start ghostAggroMove() when ghosts are sent back and becomes 'Ghost-Hunter' class again
      gameTimerId = setInterval(ghostAggroMove, startDelay)
    } 

  }


//!----------------------------------------------------------------------------------------------

  //? Flashing food function

  function flashFoodEaten() {
    // console.log('Flash food function has been invoked')
    console.log(currentGhostPositions)
    //* If statement to check if 'flashing-food' class exists in position the player is moving in, if true, remove 'flashing-food' class and add 5000 points
    if (gameGrid[playerPosition].classList.contains('flashing-food')) {

      gameGrid[playerPosition].classList.remove('flashing-food')

      //* Changing Player class from 'Player-Hunted' to 'Player-Hunter'
      gameGrid[playerPosition].classList.remove('Player-Hunted')
      gameGrid[playerPosition].classList.add('Player-Hunter')

      //* Changing ghost class from 'Ghost-Hunter' to 'Ghost-Hunted'
      if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunter')) {
        gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
        gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunted')
      }

      scoreNum += 5000
      score.innerHTML = scoreNum
      
      //* Clear Interval to stop ghostAggroMove() and any ghostScaredMove() (from prior flashing foods)
      clearInterval(gameTimerId)
      clearInterval(scaredMoveTimeOutId)

      //* Start ghostScaredMove() after eating flashing food
      scaredMoveTimeOutId = setInterval(ghostScaredMove, startDelay)

      //* Add setInterval with captureGhost() that will detect 'if' there is collision between converted players and ghosts + add points + send ghosts back to original location
      hunterTimerId = setInterval(captureGhosts, 10)

      //* Add setTimeout with a logic that reverts everything back i.e. 'Ghost-Hunted' to 'Ghost-Hunter' & 'Player-Hunter' to 'Player-Hunted', within setTimout() add functionality to clear setInterval(captureGhost)
      clearTimeout(transformTimeOutId)
      transformTimeOutId = setTimeout(() => {
        //*Transform Player class back from 'Player-Hunter' back to 'Player-Hunted'
        gameGrid[playerPosition].classList.remove('Player-Hunter')
        gameGrid[playerPosition].classList.add('Player-Hunted')

        //* Transform Ghost class back from 'Ghost-Hunted' back to 'Ghost-Hunter'
        if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunted')) {
          gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunted')
          gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
        }

        //* Stop ghostScaredMove() and start interval for ghostAggroMove() again after ghosts are transformed back to 'Ghost-Hunter' class
        clearInterval(scaredMoveTimeOutId)
        clearInterval(gameTimerId)
        gameTimerId = setInterval(ghostAggroMove, startDelay)
      }, 10000)
    } else {
      return
    }
  }





//!----------------------------------------------------------------------------------------------------

  //? Ghost AI movements (should move closer to Player)
  //* 'playerPosition' and 'currentGhostPositions' already defined and are actively changing
  
  //*Create function to replace ghostMove(), which will contain logic for ghosts to move closer to player
  //! To customise 'iterator' and 'playerDummyPosition' for different ghosts 
  //! i.e. LHS ghost, iterator <= 6, playerDummyPosition[1]
  //! i.e. Middle ghost, iterator <= 5, playerDummyPosition[0]
  //! i.e. RHS ghost, iterator <= 6, playerDummyPosition [1]

  function ghostAggroMove() {
    
    let ghostInitialPosition = currentGhostPositions[0]
    const playerDummyPosition = playerDummyPositions[0]

    //* First, if statement addresses ghosts that are still in ghost lair (by comparing with the ghost position with a location directly outside the ghost lair and checking the move iterations that has elapsed) (i.e. if it hasn't reached outside of the lair after the first few moves continue to home out of the lair)
    //* Therefore, 1st if statement is to help the ghost to home in to a location directly outside of the lair and escape
    if (ghostInitialPosition !== playerDummyPosition && iterator <= 3) {
      for (let i = 0; i < possibleGhostMoves.length; i++) {
        if (Math.abs(ghostInitialPosition - playerDummyPosition) > Math.abs((ghostInitialPosition + possibleGhostMoves[i]) - playerDummyPosition)) {
          // console.log('The ghost will move by', possibleGhostMoves[i])
          // console.log('Valid moves are', possibleGhostMoves[i])
          //*If new move reduces distance between the ghost and the target position, check if this new location has a barrier or not, if no barrier, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier)
          if (!gameGrid[ghostInitialPosition + possibleGhostMoves[i]].classList.contains('barrier')) {
            distances.push(Math.abs((ghostInitialPosition + possibleGhostMoves[i]) - playerDummyPosition))
  
            //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier
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
        if (Math.abs(ghostInitialPosition - playerPosition) > Math.abs((ghostInitialPosition + possibleGhostMoves[i]) - playerPosition)) {
          // console.log('The ghost will move by', possibleGhostMoves[i])
          // console.log('Valid moves are', possibleGhostMoves[i])
          //*If new move reduces distance between the ghost and the player, check if this new location has a barrier or not, if no barrier, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier)
          if (!gameGrid[ghostInitialPosition + possibleGhostMoves[i]].classList.contains('barrier')) {
            distances.push(Math.abs((ghostInitialPosition + possibleGhostMoves[i]) - playerPosition))
  
            //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier
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
    if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunter')) {
      gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
      currentGhostPositions[0] += chosenMove
      gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')
    }
    // gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunter')
    // currentGhostPositions[0] += chosenMove
    // gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunter')

    //* reset 'distances' array
    distances = []
    //* reset 'chosenMove' 
    chosenMove = 0

    //* increase Iterator (for use to get ghosts out of lair)
    //! Might need to reset iterator after ghosts sent back to lair?
    iterator++
    // console.log(iterator)
  }






  //* function ghostScaredMove created to apply logic to ghost movement when they are being hunted by player
  //* Invoked within a setInterval() within the flashFoodEaten()
  //* Will direct hunted ghost to move back towards a corner of the ghost lair, once reached, the homing position, will change to another corner of the ghost lair, by cycling through the 'playerDummyPositions' array
  function ghostScaredMove() {
    // console.log('This is the ghostScaredMove function')

    //* if current ghost position is not at the corner of the ghost lair, move towards it
    if (currentGhostPositions[0] !== playerHomingPosition) {
      for (let i = 0; i < possibleGhostMoves.length; i++) {
        if (Math.abs(currentGhostPositions[0] - playerHomingPosition) > Math.abs((currentGhostPositions[0] + possibleGhostMoves[i]) - playerHomingPosition)) {
          // console.log('The ghost will move by', possibleGhostMoves[i])
          // console.log('Valid moves are', possibleGhostMoves[i])
          //*If new move reduces distance between the ghost and the homing position, check if this new location has a barrier or not, if no barrier, then push this new distance into the distances array (which contains only the new reduced distances that do not encounter a barrier)
          if (!gameGrid[currentGhostPositions[0] + possibleGhostMoves[i]].classList.contains('barrier')) {
            distances.push(Math.abs((currentGhostPositions[0] + possibleGhostMoves[i]) - playerHomingPosition))
  
            //*For loop and if statement to check if current value of distances is less than other distance values that also reduce the distance and do not have a barrier
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
    if (gameGrid[currentGhostPositions[0]].classList.contains('Ghost-Hunted')) {
      gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunted')
      currentGhostPositions[0] += chosenMove
      gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunted')
    }
    // gameGrid[currentGhostPositions[0]].classList.remove('Ghost-Hunted')
    // currentGhostPositions[0] += chosenMove
    // gameGrid[currentGhostPositions[0]].classList.add('Ghost-Hunted')

    //* reset 'distances' array
    distances = []
    //* reset 'chosenMove' 
    chosenMove = 0

    scaredMoveIterator++


  }

}

window.addEventListener('DOMContentLoaded', init)