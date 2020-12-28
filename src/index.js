import "./styles/index.scss";
const APIkey = "MIDR3MRG2WBYRNQN";

const draggable = document.querySelectorAll(".draggable");
const droppable = document.querySelectorAll(".container");

draggable.forEach((element) =>
  element.addEventListener("dragstart", dragStart)
);

draggable.forEach((element) => element.addEventListener("dragend", dragEnd));
droppable.forEach((element) => {
  element.addEventListener("dragover", dragOver);
  element.addEventListener("dragenter", dragEnter);
  element.addEventListener("dragleave", dragLeave);
  element.addEventListener("drop", dragDrop);
});

let learnMore = document.querySelector(".welcome-button");
learnMore.addEventListener("click", scrollDown);

function scrollDown() {
  window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
}

let dragging;
let dropZone;

function dragStart() {
  this.className += " dragging";
  if ([...this.classList].includes("age")) {
    dropZone = document.getElementsByClassName("container age")[0];
    dropZone ? dropZone.className += " highlight" : "";
  } else if ([...this.classList].includes("risk")) {
    dropZone = document.getElementsByClassName("container risk")[0];
    dropZone ? dropZone.className += " highlight" : "";
  } else if ([...this.classList].includes("income")) {
    dropZone = document.getElementsByClassName("container income")[0];
    dropZone ? dropZone.className += " highlight" : "";
  } else if ([...this.classList].includes("retirement")) {
    dropZone = document.getElementsByClassName("container retirement")[0];
    dropZone ? dropZone.className += " highlight" : "";
  }
  dragging = this;
  setTimeout(() => (this.className += " remove"), 0);
}

function dragEnd() {
  this.className = "draggable " + dragging.classList[1];
  dropZone.className = `${dropZone.classList[0]} ${dropZone.classList[1]}`
}

function dragEnter(e) {
  e.preventDefault();
  if (this.children.length === 0) {
    this.className += " hovering";
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  if (this.children.length === 0) {
    this.className = "container " + this.classList[1];
  }
}

function dragDrop() {
  if (this.children.length === 0 && this.classList[1] === dragging.classList[1]) {
    this.className = "dropped " + this.classList[1];
    this.append(dragging);
  }
  else if (this.children.length === 1 && this.classList[1] === dragging.classList[1]) {
    this.className = "dropped " + this.classList[1];
    this.replaceChild(dragging, this.children[0]);
  }
  else {
    if (this.children.length === 0 && this.classList[1] !== dragging.classList[1]) {
      this.className = "container " + this.classList[1];
    }
    // else {
    //   this.className = "container " + this.classList[1];
    // }

  }
  let filled = [...droppable].filter(
    (droppable) => droppable.className.includes("dropped")
  );
  if (filled.length === 4) {
    let showButton = document.querySelector(".match");
    showButton.className += " showMatch";
    showButton.addEventListener("click", matchFund);
  }
}

function matchFund() {

  const remove = document.querySelectorAll(
    ".draggable, .container, .droppable, .droppable-container, .showMatch, .choices-container, .parallax, .explaination, .welcome"
  );
  let makeVisible = document.querySelector(".fund-container");
  makeVisible.className += " make-visible";
  let tags = [...droppable].map((element) => element.innerText);
  remove.forEach((element) => (element.className += " remove"));
  if (tags.includes("Low")) {
    let info = {
      ticker: "VTI",
      name: "Vanguard 500 Index Fund ETF",
      description:
        "The fund employs an indexing investment approach designed to track the performance of the CRSP US Total Market Index, which represents approximately 100% of the investable U.S. stock market and includes large-, mid-, small-, and micro-cap stocks regularly traded on the New York Stock Exchange and Nasdaq. It invests by sampling the index, meaning that it holds a broadly diversified collection of securities that, in the aggregate, approximates the full index in terms of key characteristics. EVERY fund, whether mutual fund or index fund has a hidden management fee. The management fee for VTI  is 0.05%.  That is THE lowest management fee possible. Mutual Funds typically have fees in the vicinity of 1.35%. In all, the fund holds more than 3,500 stocks in its portfolio and has a total of $672 billion of investor assets -- so this is a popular, widely held index fund product. It's also important to mention that this is a market-cap-weighted index fund, meaning that larger companies make up a larger proportion of the ETF's investments. Top holdings include companies like Microsoft, Apple, Amazon, Alphabet, and Berkshire Hathaway, just to name a few.",
      return: 0.1402,
    };
    fetchStockData("VTI", info);
    compoundingInterest(info, tags);
  } else if (tags.includes("Medium")) {
    let info = {
      ticker: "VOO",
      name: "Vanguard 500 Index Fund ETF",
      description:
        "VOO invests in stocks in the S&P 500 Index, representing 500 of the largest U.S. companies. The goal is to closely track the S&P 500's returns. VOO offers high potential for investment growth and shares value rises and falls more sharply than that of funds holding bonds. This fund is more appropriate for long-term goals where your money’s growth is essential. In total, the fund has over $100 billion in assets under management. The fund is probably one of the safest in the equity world as the companies on this list are very unlikely to go under. However, these securities are unlikely to grow very much either as they are already pretty large and have probably seen their quickest growing days in years past, but most do pay out solid dividends which should help to ease the pain of this realization. Overall, VOO is a quality choice for investors seeking broad mega and large cap exposure and it is more diversified than most, containing just over 500 securities in total. As a result, this fund could serve as a building block for many portfolios making it an excellent choice for many buy and holders, especially for those looking to keep costs at a minimum.",
      return: 0.1502,
    };
    fetchStockData("VOO", info);
    compoundingInterest(info, tags);
  } else if (tags.includes("High")) {
    let info = {
      ticker: "QLD",
      name: " ProShares Ultra QQQ",
      description:
        "QLD seeks daily investment results, before fees and expenses, that correspond to two times (2x) the return of the Nasdaq-100 Index (the Index) for a single day. The Index includes 100 of the largest domestic and international non-financial companies listed on The Nasdaq Stock Market based on market capitalization. This leveraged ProShares ETF seeks a return that is 2x the return of its underlying benchmark (target) for a single day, as measured from one NAV calculation to the next. Due to the compounding of daily returns, holding periods of greater than one day can result in returns that are significantly different than the target return and ProShares' returns over periods other than one day will likely differ in amount and possibly direction from the target return for the same period.",
      return: 0.2405,
    };
    fetchStockData("QQQ", info);
    compoundingInterest(info, tags);
  } else if (tags.includes("Extremely High")) {
    let info = {
      ticker: "TECL",
      name: " Direxion Daily Technology Bull 3X Shares ETF",
      description:
        "TECL attempts to deliver triple the daily returns of the Technology Select Sector Index, a benchmark that's essentially an ode to Apple (NASDAQ: AAPL) and Microsoft (NASDAQ: MSFT) as that duo combine for more than 44% of the index's weight. The Direxion Daily Technology Bull (TECL) and Bear (TECS) 3X Shares seek daily investment results, before fees and expenses, of 300%, or 300% of the inverse (or opposite), of the performance of the Technology Select Sector Index. There is no guarantee the funds will meet their stated investment objectives. The fund invests at least 80% of its net assets (plus borrowing for investment purposes) in financial instruments, such as swap agreements, and securities of the index, ETFs that track the index and other financial instruments that provide daily leveraged exposure to the index or ETFs that track the index. The index includes domestic companies from the technology sector. It is non-diversified.",
      return: 0.3739,
    };
    fetchStockData("TECL", info);
    compoundingInterest(info, tags);
  }
  window.scroll({top: 0, left: 0, behavior: 'smooth'});
}

function fetchStockData(fundTicker, info) {
  let chartAPIurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${fundTicker}&apikey=${APIkey}`;
  let dataObj = [];
  fetch(chartAPIurl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let point in data["Time Series (Daily)"]) {
        dataObj.push({
          value: parseFloat(data["Time Series (Daily)"][point]["1. open"]),
          date: d3.timeParse("%Y-%m-%d")(point),
        });
      }
      displayGraph(dataObj, info);
    });
}

function displayGraph(dataObj, info) {
  let maxPrice = d3.max(dataObj, (d) => {
    return d.value;
  });
  let minPrice = d3.min(dataObj, (d) => {
    return d.value;
  });

  let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = window.innerWidth - margin.left - margin.right - 20,
    height =
      window.innerHeight -
      margin.top -
      margin.bottom -
      window.innerHeight / 2;

  let svg = d3
    .select("#fund-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  let x = d3
    .scaleTime()
    .domain(
      d3.extent(dataObj, (d) => {
        return d.date;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  let y = d3.scaleLinear().domain([minPrice, maxPrice]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y).tickFormat((d) => {return "$" + (d)}));

  let path = svg
    .append("path")
    .datum(dataObj)
    .attr(
      "d",
      d3
        .line()
        .x((d) => {
          return x(d.date);
        })
        .y((d) => {
          return y(d.value);
        })
    )
    .attr("fill", "none")
    .attr("stroke", "darkblue")
    .attr("stroke-width", 1.5);

  let length = path.node().getTotalLength();

  let chartInfo = d3
    .select("#fund-info")
    .append("div")
    .attr("width", width + margin.left + margin.right)
    .attr("height", window.innerHeight - height - margin.top - margin.bottom)
    .classed("info-container", true);

  chartInfo
    .append("div")
    .classed("info-title", true)
    .text("Your matched fund is " + info.name + ", " + info.ticker);

  chartInfo
    .append("div")
    .classed("info-description", true)
    .text(info.description);

  let scroll = 0;
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > scroll) {
      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", length);
    } else {
      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);
    }
    scroll = scrolled;
  });
  let fundInfo = document.querySelector('.fund-graph-info')
  let scrollDownBtn = document.createElement("button")
  scrollDownBtn.className = "scroll-down"
  scrollDownBtn.innerHTML = "Show Budget"
  fundInfo.append(scrollDownBtn);
  scrollDownBtn.addEventListener("click", scrollDown);
}

function compoundingInterest(info, tags) {
  let rate = info.return;
  let time = parseInt(tags[tags.length - 1]) - parseInt(tags[0]);
  let income = parseInt(tags[2].slice(1));
  let savings = 0;
  if (income >= 200000) {
    income = 250000;
    savings = income * 0.5;
  } else if (income >= 150000) {
    income = 175000;
    savings = income * 0.5;
  } else if (income >= 100000) {
    income = 125000;
    savings = income * 0.5;
  } else if (income >= 80000) {
    income = 90000;
    savings = income * 0.5;
  } else if (income >= 60000) {
    income = 70000;
    savings = income * 0.5;
  } else if (income >= 40000) {
    income = 50000;
    savings = income * 0.5;
  } else if (income >= 20000) {
    income = 30000;
    savings = income * 0.5;
  } else {
    savings = income * 0.5;
  }
  let dataObj = [];
  for (let i = 0; i < time; i++) {
    let data = {
      date: i,
      value: (dataObj[i - 1] ? dataObj[i - 1].value * (1 + rate) : 0) + savings,
    };
    dataObj.push(data);
  }

  var chartInfo = d3
    .select("#compound-interest-title")
    .append("div")
    .classed("compound-title", true)
    .text(
      `You will have $${dataObj[dataObj.length - 1].value
        .toFixed(2)
        .replace(
          /\d(?=(\d{3})+\.)/g,
          "$&,"
        )} at retirement due to compounding at ${rate * 100}%`
    );

  let maxPrice = d3.max(dataObj, (d) => {
    return d.value;
  });
  let minPrice = d3.min(dataObj, (d) => {
    return d.value;
  });

  let margin = { top: 10, right: 30, bottom: 30, left: 100 },
    width = window.innerWidth - margin.left - margin.right - 80,
    height =
      window.innerHeight -
      margin.top -
      margin.bottom -
      window.innerHeight / 2;

  let svg = d3
    .select("#compound-interest-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  let x = d3
    .scaleLinear()
    .domain(
      d3.extent(dataObj, (d) => {
        return d.date;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  let y = d3.scaleLinear().domain([minPrice, maxPrice]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y).tickFormat((d) => {return "$" + (d)}));

  let path = svg
    .append("path")
    .datum(dataObj)
    .attr(
      "d",
      d3
        .line()
        .x((d) => {
          return x(d.date);
        })
        .y((d) => {
          return y(d.value);
        })
    )
    .attr("fill", "none")
    .attr("stroke", "darkblue")
    .attr("stroke-width", 1.5);

  let length = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", length)
    .attr("stroke-dashoffset", length)
    .transition()
    .duration(2000)
    .attr("stroke-dashoffset", 0);

  let scroll = 0;
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > scroll) {
      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);
    } else {
      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", length);
    }
    scroll = scrolled;
  });

  createBudget(income, savings);
}

function createBudget(income, savings) {
  let formattedSavings = savings / 12;
  let housing = ((income / 12) * 0.2);
  let formattedIncome = "$" + (income/12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  let transportation = ((income / 12) * 0.15);
  let food = ((income / 12) * 0.1);
  let personal = ((income / 12) * 0.05);
  let budget = d3
    .select("#budget")
    .append("div")
    .classed("budget-title", true)
    .text(`Monthly ${formattedIncome} Budget Breakdown`);
  budget.append("p").classed("budget-item", true).text(`Savings: $${formattedSavings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`);

  budget.append("p").classed("budget-item", true).text(`Housing: $${housing.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`);

  budget
    .append("p")
    .classed("budget-item", true)
    .text(`Transportation: $${transportation.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`);

  budget.append("p").classed("budget-item", true).text(`Food: $${food.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`);

  budget
    .append("p")
    .classed("budget-item", true)
    .text(`Personal & Miscellaneous: $${personal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`);

  let budgetTitle = d3
    .select("#budget")
    .append("div")
    .classed("budget-graph-title", true)
    .text("Monthly Budget Graph");

  let margin = {
      top: 10,
      right: 0,
      bottom: 25,
      left: 80
  };

  let dataArr = [
    {"name": "Savings", "value": formattedSavings},
    {"name": "Housing", "value": housing},
    {"name": "Transportation", "value": transportation},
    {"name": "Food", "value": food},
    {"name": "Personal", "value": personal}
  ]

  let width = window.innerWidth - margin.left - margin.right - (window.innerWidth * .40),
      height = 200 - margin.top - margin.bottom;

  let svg = budgetTitle.append("svg")
    .classed("budget-graph", true)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  let x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(dataArr, (d) => { return d.value })])

  let y = d3.scaleBand()
    .range([height, 0], .1)
    // .padding(.5)
    .domain(dataArr.reverse().map((d) => { return d.name}))
  
  svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat((d) => {return "$" + (d)}));

  svg.append("g")
  .call(d3.axisLeft(y))

  let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  g.selectAll(".bar")
    .data(dataArr)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", -margin.left)
    .attr("y", (d) => {return y(d.name)})
    .attr("width", (d) => 0)
    .attr("height", 15)

  svg.selectAll("rect")
    .transition()
    .duration(2000)
    .attr("width", (d) => {return x(d.value)})

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > scroll) {
      svg.selectAll("rect")
        .transition()
        .duration(2000)
        .attr("width", (d) => {return x(d.value)})
    } else {
      svg.selectAll("rect")
        .transition()
        .duration(2000)
        .attr("width", 0)
    }
    scroll = scrolled;
  });
    
}
