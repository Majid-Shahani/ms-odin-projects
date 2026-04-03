/*
 * Globals
 */
const DEFAULT_COLOR = "hsl(302, 46%, 40%)";
let gridWidth = 16;
let color = "cyan";
let mouseDown = false;
let currentKey = 0; // M1
/*
 * Functions
 */
function setupEvents() {
  document.addEventListener("mousedown", (e) => {
    mouseDown = true;
    currentKey = e.button;
  });

  document.addEventListener("mouseup", (e) => {
    mouseDown = false;
    currentKey = 0;
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 16)];
  }
  return color;
}

function createGrid(width) {
  if (width >= 100) width = 100;
  const pad = document.querySelector(".sketchpad");
  const grid = [];

  for (let i = 0; i < width; i++) {
    const gridRow = document.createElement("div");
    gridRow.setAttribute("class", "gridRow");

    if (i === 0) gridRow.setAttribute("style", "border-top-width: 1px");
    else if (i === width - 1)
      gridRow.setAttribute("style", "border-bottom-width: 1px");

    for (let j = 0; j < width; j++) {
      const frag = document.createElement("div");
      frag.setAttribute("class", "fragment");
      frag.addEventListener("mouseenter", (e) => {
        if (mouseDown) {
          if (currentKey === 0) e.target.style.backgroundColor = color;
          else e.target.style.backgroundColor = getRandomColor();
        }
      });
      frag.style.backgroundColor = DEFAULT_COLOR;
      gridRow.appendChild(frag);
    }

    grid.push(gridRow);
  }
  pad.replaceChildren(...grid);
  gridWidth = width;
}

function createControlPanel() {
  const panel = document.querySelector(".controls");

  // Add Resize Button
  const sizeButton = document.createElement("button");
  sizeButton.textContent = "Resize";
  sizeButton.setAttribute("class", "button");
  sizeButton.addEventListener("click", () => {
    createGrid(+prompt("Set Grid Size", "16"));
  });
  panel.appendChild(sizeButton);

  // Add Clear Button
  const clear = document.createElement("button");
  clear.textContent = "Clear";
  clear.setAttribute("class", "button");
  clear.addEventListener("click", () => createGrid(gridWidth));
  panel.appendChild(clear);
}

/*
 * Main
 */
function main() {
  setupEvents();
  createGrid(gridWidth);
  createControlPanel();
}
main();
