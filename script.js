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

    //Prevent user from dragging cell when drawing
    newCell.setAttribute("draggable", false);

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
//Bug note: if mouse movement is too fast, it skips pixels
//Bug note: if mouseup happens outside of the sketch pad container, it doesn't trigger mouseup event
//Bug note: Even though cells are set to draggable false, it is still dragging on occasion 
// - look in to see if browser has some default drag that needs to be overridden
//12/14/2021 - tested in Safari and noticed that cursour turns to text selection 
//- when drawing the browser thinks it's trying to select text and if cursour moves outside of skethpad container, it just text selects stuff

let isDrawing = false

sketchpadCont.addEventListener("mousedown", function(event){
    const gridLine = sketchpadCont
    const cell = event.target;

    if(event.target !== gridLine){
        cell.style.backgroundColor = "black";
        isDrawing = true;
    }

})

sketchpadCont.addEventListener("mousemove", function(event){
    const gridLine = sketchpadCont
    const cell = event.target;

    if(isDrawing === true && event.target !== gridLine){
        cell.style.backgroundColor = "black";
    }

})

const mainCont = document.getElementById("main-cont");

mainCont.addEventListener("mouseup", function(event){
    if(isDrawing === true){
        isDrawing = false;
    }

})

