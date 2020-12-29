# Compound
[Live Demo](https://edmondthui.github.io/compound/)  
Compound is an app that lets you plan your financial future. Just drag and drop some information into your plan and it will generate an investing plan and budget for you!  
![Gif Demo](https://edmondhui.com/compound/og_image.gif)
## Technologies Used
* `JavaScript` 
* `D3.js` for data visualization
* `Webpack` to bundle JS files
* `Alpha Vantage API` to fetch index fund data

## Key Features / MVP
* Drag and drop information into drop zone
* Have a button to take all the tags in drop zone and display a graph and budget
* Display graph and budget using D3
* Beautiful and function UI/UX by using animations and CSS for graphs, buttons, and parallax slider on landing

![Drag and Drop Demo](https://i.imgur.com/kQTFUBK.gif)

I use Vanilla Javascript drag and drop to match users with the perfect fund based on their risk, age, income, and retirement plans. Once all the droppable containers are filled with dropped HTML elements the match fund button appears and queries the Alpha Vantage API endpoint for the matched index fund.

```JavaScript
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
```

This code shows how I fetch the live stock data from Alpha Vantage's REST API endpoint using the Vanilla Javascript fetch() method and format it to be displayed by D3. This is my second application using an external API to display live stock data. I have a strong understanding of fetching data from an external API and formatting the response data to be displayed.

![Compound Graphs](https://i.imgur.com/2EzG54X.gif)

When clicking on the match fund button a graph using D3.js is rendered with the fund's current price from the last 4 months. There is a smooth scroll button that will scroll down to two additional D3.js graphs. The top graph is a compound interest graph showing you how much you will have if you follow a strict budget and invest your income. The bottom graph is a automatically generated budgeted that suggests how much you should spend on each category. There are animations for all the graphs that listen for either a scroll up or down to render the graph line.

## Wireframes
### Homepage
![Compound Homepage Wireframe](https://i.imgur.com/aZ5No1Z.png)

### Matched Index Fund (slides in to replace homepage)
![Compound Matched Fund Wireframe](https://i.imgur.com/Y9KjQtj.png)

### Compound Interest Graph and Budgeting Plan (scroll down from Matched Index Fund)
![Compound Budget Wireframe](https://i.imgur.com/z5yqy1M.png)

## Work Breakdown
### December 7
* Setup drag and drop
* Started with styling the home page
* Matched tags from drag and drop with fund and grab data using API

### December 8
* Learned how to use D3 
* Displayed fund chart and info
* CSS styling for chart and info
* Added slide in for chart and info

### December 9
* Added compound interest chart based on dropped tags
* Created linked budget breakdown for optimal savings
* Allowed changes in data from budget display in chart
* Used user data from matched fund to calculate compounded interest and value

### December 10 
* Continue working on all features

### December 11
* Cleaned up code and find bugs
* Added more styling
* Finished production README
