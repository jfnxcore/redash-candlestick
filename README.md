Redash extensions for Plotly Candlestick Graph & Alphavantage Query Runner

## Overview

This extension is a proof of concept to add Plotly's Candlestick graph to Redash as a bundle extensions. I used the Redash Extension [redash-stmo by Mozilla](https://github.com/mozilla/redash-stmo) as a base to create this extension. The candlestick graph support the basic features documented by Plotly [Candlestick Charts in JavaScript](https://plotly.com/javascript/candlestick-charts/).

## Extension features

1. **Candlestick Graph**: Candlestick Graph support timeseries with OHLC and volume columns. The Editor support basic display customarization as increasing/decreasing candlestick colors, volume display and color, range selector and range slider
1. **Alphavantage Query Runner**: Query Runner with basic support of the [Alphavantage API](https://www.alphavantage.co/)

## Know Issues

1. The Alphavantage Datasource and Query runner does not have their logo and I did found anyway to provide it without modifying the Redash's source code
1. To add the Candlestick graph to the list of available graphs, the [index.js](blob/main/src/redash_candlestick/candlestick/bundle/index.jsx) refer directly to the map of registred visualizations (**registeredVisualizations** in [@redash/viz/lib/visualizations/registeredVisualizations](https://github.com/getredash/redash/blob/master/viz-lib/src/visualizations/registeredVisualizations.ts)) without validating the graph's configuration. Since the function to do the visualizations registration (**validateVisualizationConfig**) has not been exported, I don't think we are supposed to do think kind of manipulation. _But! Hey! It working!_