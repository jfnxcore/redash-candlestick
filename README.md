Redash extensions for Plotly Candlestick Graph & Alphavantage Query Runner

## Overview

This extension is a proof of concept to add Plotly's Candlestick graph to Redash as a bundle extensions. I used the Redash Extension [redash-stmo by Mozilla](https://github.com/mozilla/redash-stmo) as a base to create this extension. The candlestick graph support the basic features documented by Plotly [Candlestick Charts in JavaScript](https://plotly.com/javascript/candlestick-charts/).

## Extension features

- **Candlestick Graph**: Candlestick Graph support timeseries with OHLC and volume columns. The Editor support basic display customarization as increasing/decreasing candlestick colors, volume display and color, range selector and range slider
![candlestick](https://user-images.githubusercontent.com/23456948/164351972-c45ec196-2ed2-4875-955f-92f57e38a9ed.png)

- **Alphavantage Query Runner**: Query Runner with basic support of the [Alphavantage API](https://www.alphavantage.co/)
![alphavantage-query](https://user-images.githubusercontent.com/23456948/164351994-f2bc8513-dd1d-4ab0-95db-dff262bd9ae5.png)


## Known Issues

1. The Alphavantage Datasource and Query runner don't have their logo and I don't found any way to provide it without modifying the Redash's source code
1. To add the Candlestick graph to the list of available visualizations, the [index.js](/src/redash_candlestick/candlestick/bundle/index.jsx) file refers directly to the map of registered visualizations (**registeredVisualizations** in [@redash/viz/lib/visualizations/registeredVisualizations](https://github.com/getredash/redash/blob/master/viz-lib/src/visualizations/registeredVisualizations.ts)) without validating the graph's configuration. Since the function to do the visualizations registration (**validateVisualizationConfig**) has not been exported, I don't think we are supposed to do this kind of manipulation. _But! Hey! It working!_
