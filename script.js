const gridClassNames = ["sixteen-dpi","thirtytwo-dpi","sixtyfour-dpi","hundred-dpi"]

const cellClassNames = ["sixteen-dpi-cell","thirtytwo-dpi-cell","sixtyfour-dpi-cell","hundred-dpi-cell"]

const gridSize = {
    16: "sixteen-dpi",
    32: "thirtytwo-dpi",
    64: "sixtyfour-dpi",
    100: "hundred-dpi"
};

const cellSize = {
    16: "sixteen-dpi-cell",
    32: "thirtytwo-dpi-cell",
    64: "sixtyfour-dpi-cell",
    100: "hundred-dpi-cell"
};

const NUMBER_OF_CELLS = {
    16: 200,
    32: 750,
    64: 2900,
    100: 8000
}

const sketchpadCont = document.getElementById("sketchpad");

document.body.onload = generateSketchpad(16, 200);

//Performance note: Removing all cells and then adding the necessary amount of cells causes a bit of delay
//Perhaps creating all necessary cells in one go and then just changing CSS classes was the best way to go for performance?
//Alternatively consider just having to remove or add the necessary remaining amount of cells?
//12/14/2021 - tested in Safari and delay is not very noticeable at all compared to firefox

function addCell(gridChoice){
    const newCell = document.createElement("div");

    newCell.classList.add("cell", cellSize[gridChoice])

    sketchpadCont.appendChild(newCell)
}

function removePreviousCells(){
    const cell = document.querySelectorAll(".cell");

    cell.forEach(function(cell){
        cell.remove();
    })
}

function generateSketchpad(gridChoice, NUMBER_OF_CELLS){
    removePreviousCells();
    for(i=0; i < NUMBER_OF_CELLS; i++){
        addCell(gridChoice);
    }
}

//Clicking on button will change the DPI of grid
const gridButtons = document.querySelectorAll("button.grid-select");

gridButtons.forEach(function(button){
    button.addEventListener("click",function(){
        let gridChoice = button.id;
        generateSketchpad(gridChoice, NUMBER_OF_CELLS[gridChoice]);
        changeGrid(gridChoice);
    });
});

function changeGrid(gridChoice){
    const currentGridClass = gridClassNames;

    sketchpadCont.classList.remove(...currentGridClass);
    sketchpadCont.classList.add(gridSize[gridChoice]);

}

//Clicking on ink button will change the ink color
const inkButtons = document.querySelectorAll("button.ink-select");
let inkColor = "black";
const rainbow = ["red","orange","yellow","green","blue","indigo","purple"]
let rainbowIndex = 0

function cycleRainbow(){
    if(rainbowIndex < rainbow.length + 1){
        return rainbowIndex++;
    }
    else{
        rainbowIndex = 0;
    }

    }

inkButtons.forEach(function(button){
    button.addEventListener("click",function(){
        let inkChoice = button.id;
        inkColor = inkChoice;
    });
});

//Bug note: if mouse movement is too fast, it skips pixels
//Bug note: Cells dragging while drawing currently resolved for the moment using CSS user-select: none
     //Safari is still showing the cursour as text selection when drawing - make sure to fix later

let isDrawing = false

sketchpadCont.addEventListener("mousedown", function(event){
    const gridLine = sketchpadCont
    const cell = event.target;

    if(event.target !== gridLine){

        //NTS: change to ternary operator later
        if(inkColor === "rainbow"){
            cell.style.backgroundColor = rainbow[cycleRainbow()];
        }
        else{
            cell.style.backgroundColor = inkColor;
        }

        isDrawing = true;
    }

})

sketchpadCont.addEventListener("mousemove", function(event){
    const gridLine = sketchpadCont
    const cell = event.target;

    if(isDrawing === true && event.target !== gridLine){

        //NTS: change to ternary operator later
        if(inkColor === "rainbow"){
            cell.style.backgroundColor = rainbow[cycleRainbow()];
        }
        else{
            cell.style.backgroundColor = inkColor;
        }
    }

})

const mainCont = document.getElementById("main-cont");

mainCont.addEventListener("mouseup", function(event){
    if(isDrawing === true){
        isDrawing = false;
    }

})

const eraseButton = document.getElementById("erase");

eraseButton.addEventListener("click",function(event){
    const cell = document.querySelectorAll(".cell");

    cell.forEach(function(cell){
        cell.style.backgroundColor = null;
    })
})
