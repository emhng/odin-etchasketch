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

function addCell(gridChoice){
    const newCell = document.createElement("div");

    newCell.classList.add("cell",`${cellSize[gridChoice]}`)

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
const buttons = document.querySelectorAll("button.grid-select");

buttons.forEach(function(button){
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

//Bug note: if somehow clicks on 1px gap in grid, the grid lines change to black also
sketchpadCont.addEventListener("click", function(event){
    const gridLine = sketchpadCont
    const cell = event.target;

    cell.style.backgroundColor = "black";

    //Do not change grid line colour if user accidently clicks grid line
    if(event.target === gridLine){
        event.target.style.backgroundColor = "";
    }

})
