import Plotly from "plotly.js/lib/core";
import candlestick from "plotly.js/lib/candlestick";
import bar from "plotly.js/lib/bar"
import updateAxes from "@redash/viz/lib/visualizations/chart/plotly/updateAxes"
import updateChartSize from "@redash/viz/lib/visualizations/chart/plotly/updateChartSize";
import updateData from "./updateData";
import prepareLayout from "./prepareLayout";
import prepareData from "./prepareData";

Plotly.register([ candlestick, bar ]);

Plotly.setPlotConfig({
    modeBarButtonsToRemove: ["sendDataToCloud"],
});

export {
    Plotly,
    prepareData,
    prepareLayout,
    updateData,
    updateAxes,
    updateChartSize,
};