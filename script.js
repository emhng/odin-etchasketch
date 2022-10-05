const gridClassNames = [
  'sixteen-dpi',
  'thirtytwo-dpi',
  'sixtyfour-dpi',
  'hundred-dpi'
]

const gridSize = {
  16: 'sixteen-dpi',
  32: 'thirtytwo-dpi',
  64: 'sixtyfour-dpi',
  100: 'hundred-dpi'
}

const NUMBER_OF_CELLS = {
  16: 230,
  32: 880,
  64: 3300,
  100: 8100
}

const sketchpadCont = document.getElementById('sketchpad')

document.body.onload = generateSketchpad(16, 230)

function generateSketchpad (gridChoice, NUMBER_OF_CELLS) {
  removePreviousCells()
  for (i = 0; i < NUMBER_OF_CELLS; i++) {
    addCell(gridChoice)
  }
}

function addCell () {
  const newCell = document.createElement('div')

  newCell.classList.add('cell')

  sketchpadCont.appendChild(newCell)
}

function removePreviousCells () {
  const cell = document.querySelectorAll('.cell')

  cell.forEach(function (cell) {
    cell.remove()
  })
}

//Clicking on grid button will change the DPI of grid
const gridButtons = document.querySelectorAll('button.grid-select')

gridButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    let gridChoice = button.id
    generateSketchpad(gridChoice, NUMBER_OF_CELLS[gridChoice])
    changeGrid(gridChoice)
  })
})

function changeGrid (gridChoice) {
  const currentGridClass = gridClassNames

  sketchpadCont.classList.remove(...currentGridClass)
  sketchpadCont.classList.add(gridSize[gridChoice])
}

//Clicking on ink button will change the ink color
const inkButtons = document.querySelectorAll('button.ink-select')
let inkColor = 'black'

inkButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    let inkChoice = button.id
    inkColor = inkChoice
  })
})

//Continuously cycle through the rainbow in order of ROYGBIV
const rainbow = [
  'red',
  'darkorange',
  'yellow',
  'limegreen',
  'blue',
  'darkslateblue',
  'mediumorchid'
]
let rainbowIndex = 0

function cycleRainbow () {
  return rainbowIndex < rainbow.length + 1 ? rainbowIndex++ : (rainbowIndex = 0)
}

//Draw on sketchpad when mouse is pressed and held down
//Bug note: if mouse movement is too fast, it skips pixels
let isDrawing = false

sketchpadCont.addEventListener('mousedown', function (event) {
  const gridLine = sketchpadCont
  const cell = event.target

  isDrawing = true

  if (event.target !== gridLine) {
    return inkColor === 'rainbow'
      ? (cell.style.backgroundColor = rainbow[cycleRainbow()])
      : (cell.style.backgroundColor = inkColor)
  }
})

sketchpadCont.addEventListener('mousemove', function (event) {
  const gridLine = sketchpadCont
  const cell = event.target

  if (isDrawing === true && event.target !== gridLine) {
    return inkColor === 'rainbow'
      ? (cell.style.backgroundColor = rainbow[cycleRainbow()])
      : (cell.style.backgroundColor = inkColor)
  }
})

document.body.addEventListener('mouseup', function (event) {
  if (isDrawing === true) {
    isDrawing = false
  }
})

//Clear sketchpad
const eraseButton = document.getElementById('erase')

eraseButton.addEventListener('click', function (event) {
  const cell = document.querySelectorAll('.cell')

  cell.forEach(function (cell) {
    cell.style.backgroundColor = null
  })
})
