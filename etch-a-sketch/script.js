/*
 * Constants
 */
const GRID_WIDTH = 16;

/*
 * Functions
 */
function createElements() {
  const grid = document.querySelector(".sketchpad");

  for (let i = 0; i < GRID_WIDTH; i++) {
    let gridRow = document.createElement("div");
    gridRow.setAttribute("class", "gridRow");

    for (let j = 0; j < GRID_WIDTH; j++) {
      let div = document.createElement("div");
      div.setAttribute("class", "fragment");
      gridRow.appendChild(div);
    }

    grid.appendChild(gridRow);
  }
}

/*
 * Main
 */
function main() {
  createElements();
  //addEventListeners()
}
main();
