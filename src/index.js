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
  let dataObj = [];
  fetch(APIurl).then(response => {
    return response.json();
  }).then(data => {
    for (let point in data["Time Series (Daily)"]) {
      dataObj.push({value: parseFloat(data["Time Series (Daily)"][point]["1. open"]), date: d3.timeParse("%Y-%m-%d")(point)})
    }
    displayGraph(dataObj)
  })

}

function displayGraph(dataObj) {

  let maxPrice = d3.max(dataObj, (d) => { return d.value});
  let minPrice = d3.min(dataObj, (d) => { return d.value});


  let margin = {top : 10, right: 30, bottom: 30, left: 60},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom - (window.innerHeight/2.5);

  let svg = d3.select("#fund-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + ", "+margin.top +")");

  let x = d3.scaleTime()
    .domain(d3.extent(dataObj, function(d) {return d.date;}))
    .range([0,width])
  svg.append("g").attr("transform", "translate(0,"+ height + ")").call(d3.axisBottom(x))

  let y = d3.scaleLinear()
    .domain([minPrice, maxPrice])
    .range([ height, 0 ]);
  svg.append("g").call(d3.axisLeft(y));

  svg.append("path").datum(dataObj).attr("fill", "none").attr("stroke", "blue").attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x((d) => {return x(d.date) })
      .y((d) => {return y(d.value)})
    )
}