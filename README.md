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

```function fetchStockData(fundTicker, info) {
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
