import "./styles/index.scss";

const draggable = document.querySelectorAll(".draggable");
const droppable = document.querySelectorAll(".container");

draggable.forEach(element => element.addEventListener("dragstart", dragStart))
draggable.forEach(element => element.addEventListener("dragend", dragEnd))
droppable.forEach(element => {
  element.addEventListener("dragover", dragOver)
  element.addEventListener("dragenter", dragEnter)
  element.addEventListener("dragleave", dragLeave)
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

function dragEnter(e) {
  e.preventDefault()
  this.className += " hovering";
}

function dragOver(e) {
  e.preventDefault()
}

function dragLeave() {
  this.className = "container"
}

function dragDrop() {
  this.className = "dropped";
  if (this.children.length === 0 ) {
    this.append(dragging)
  }
  let filled = [...droppable].filter(droppable => droppable.className === "dropped")
  if (filled.length === 4) {
    let showButton = document.querySelector(".match")
    showButton.className = "showMatch"
    showButton.addEventListener("click", matchFund)
  }
}

function matchFund() {
  const remove = document.querySelectorAll(".draggable, .container, .droppable, .droppable-container, .showMatch, .choices-container");
  let tags = [...droppable].map(element => element.innerText);
  remove.forEach(element => element.className += " remove")
  if (tags.includes("Low")) {
    let info = {
      ticker: "VTI",
      name: "Vanguard 500 Index Fund ETF",
      description: "Seeks to track the performance of the CRSP US Total Market Index. Large-, mid-, and small-cap equity diversified across growth and value styles. Employs a passively managed, index-sampling strategy. The fund remains fully invested. Low expenses minimize net tracking error.",
      return: .1402
    }
    fetchStockData("VTI", info)
    compoundingInterest(info, tags)
  }
  else if (tags.includes("Medium")) {
    let info = {
      ticker: "VOO",
      name: "Vanguard 500 Index Fund ETF",
      description: "Invests in stocks in the S&P 500 Index, representing 500 of the largest U.S. companies. Goal is to closely track the index’s return, which is considered a gauge of overall U.S. stock returns. Offers high potential for investment growth; share value rises and falls more sharply than that of funds holding bonds. More appropriate for long-term goals where your money’s growth is essential.",
      return: .1502
    }
    fetchStockData("VOO", info)
    compoundingInterest(info, tags)
  }
  else if (tags.includes("High")) {
    let info = {
      ticker: "QLD",
      name: " ProShares Ultra QQQ",
      description: "This leveraged ProShares ETF seeks a return that is 2x the return of its underlying benchmark (target) for a single day, as measured from one NAV calculation to the next. Due to the compounding of daily returns, holding periods of greater than one day can result in returns that are significantly different than the target return and ProShares' returns over periods other than one day will likely differ in amount and possibly direction from the target return for the same period.",
      return: .2405
    }
    fetchStockData("QQQ", info)
    compoundingInterest(info, tags)
  }
  else if (tags.includes("Extremely High")) {
    let info = {
      ticker: "TECL",
      name: " Direxion Daily Technology Bull 3X Shares ETF",
      description: "The Direxion Daily Technology Bull (TECL) and Bear (TECS) 3X Shares seek daily investment results, before fees and expenses, of 300%, or 300% of the inverse (or opposite), of the performance of the Technology Select Sector Index. There is no guarantee the funds will meet their stated investment objectives.",
      return: .3739
    }
    fetchStockData("TECL", info)
    compoundingInterest(info, tags)
  }
  
}

function fetchStockData(fundTicker, info) {
  const APIkey = "MIDR3MRG2WBYRNQN"
  let chartAPIurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${fundTicker}&apikey=${APIkey}`
  let dataObj = [];
  fetch(chartAPIurl).then(response => {
    return response.json();
  }).then(data => {
    for (let point in data["Time Series (Daily)"]) {
      dataObj.push({value: parseFloat(data["Time Series (Daily)"][point]["1. open"]), date: d3.timeParse("%Y-%m-%d")(point)})
    }
    displayGraph(dataObj, info)

  })
}

function displayGraph(dataObj, info) {
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

  svg.append("path").datum(dataObj).attr("fill", "none").attr("stroke", "darkblue").attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x((d) => {return x(d.date) })
      .y((d) => {return y(d.value)})
    )

  var chartInfo = d3.select("#fund-info").append("div")
    .attr("width", width + margin.left + margin.right)
    .attr("height", window.innerHeight - height - margin.top - margin.bottom)
    .classed("info-container", true)

  chartInfo.append("div")
    .classed("info-title", true)
    .text(info.name + ", " + info.ticker)

  chartInfo.append("div")
    .classed("info-description", true)
    .text(info.description)
  
}

function compoundingInterest(info, tags) {
  let rate = info.return
  let time = parseInt(tags[tags.length-1]) - parseInt(tags[0])
  let income = parseInt(tags[2].slice(1))
  let savings = 0;
  if (income >= 200000) {
    income = 250000;
    savings = income * .70
  }
  if (income >= 100000) {
    savings = income * .70;
  }
  else if (income >= 60000) {
    savings = income * .60
  }
  else if (income >= 40000) {
    savings = income * .50
  }
  else if (income >= 20000) {
    savings = income * .30
  }
  else {
    savings = 20000/12 * .10
  }
  let compoundInterest = []
  for (let i = 0 ; i < time ; i ++) {
    let dataObj = {date: i, value: (compoundInterest[i-1] ? compoundInterest[i-1].value : 0) + (savings * (1+rate))}
    compoundInterest.push(dataObj)
  }
  console.log(compoundInterest);
}