function addCell(){
    const sketchpadCont = document.getElementById("sketchpad");
    const newCell = document.createElement("div");
    newCell.className = "cell";

    sketchpadCont.appendChild(newCell)
}

addCell();