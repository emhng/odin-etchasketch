const sketchpadCont = document.getElementById("sketchpad");

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


function addCell(){
    const newCell = document.createElement("div");
    newCell.className = "cell sixteen-dpi-cell";

    sketchpadCont.appendChild(newCell)
}

function generateSketchpad(){
    for(i=0; i<7000; i++){
        addCell();
    }
}

document.body.onload = generateSketchpad();

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

//Clicking on button will change the DPI of grid
const buttons = document.querySelectorAll("button.grid-select");

buttons.forEach(function(button){
    button.addEventListener("click",function(){
        let gridChoice = button.id;
        changeGrid(gridChoice);
    });
});

function changeGrid(gridChoice){
    const currentGridClass = gridClassNames;
    const currentCellClass = cellClassNames;
    const cell = document.querySelectorAll(".cell");

    sketchpadCont.classList.remove(...currentGridClass);
    sketchpadCont.classList.add(gridSize[gridChoice]);

    cell.forEach(function(cell){
        cell.classList.remove(...currentCellClass);
        cell.classList.add(cellSize[gridChoice]);
    })
}
