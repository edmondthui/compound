import "./styles/index.scss";

const draggable = document.querySelectorAll(".draggable");
const droppable = document.querySelectorAll(".container");

draggable.forEach(element => element.addEventListener("dragstart", dragStart))
draggable.forEach(element => element.addEventListener("dragend", dragEnd))
droppable.forEach(element => {
  element.addEventListener("dragover", dragOver)
  // element.addEventListener("dragenter", dragEnter)
  // element.addEventListener("dragLeave", dragLeave)
  element.addEventListener("drop", dragDrop)
})

let dragging;

function dragStart() {
  this.className += " dragging";
  dragging = this;
  setTimeout(() => this.className += " remove", 0)
}

function dragEnd() {
  this.className = "draggable"
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop() {
  this.className = "droppable";
  if (this.children.length === 0 ) {
    this.append(dragging)
  }
  let filled = [...droppable].filter(droppable => droppable.className === "droppable")
  if (filled.length === 4) {
    let showButton = document.querySelector(".match")
    showButton.className = "showMatch"
    showButton.addEventListener("click", matchFund)
  }
}

function matchFund() {
  const remove = document.querySelectorAll(".draggable, .container, .droppable, .droppable-container, .showMatch, .choices-container");
  remove.forEach(element => element.className += " remove")
  fetchStockData("VOO")
}

function fetchStockData(fundTicker) {
  const APIkey = "MIDR3MRG2WBYRNQN"
  let APIurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${fundTicker}&apikey=${APIkey}`
  let xAxis = [];
  let yAxis = [];
  fetch(APIurl).then(response => {
    console.log(response);
    return response.json();
  }).then(data => {
    console.log(data);
  })
}