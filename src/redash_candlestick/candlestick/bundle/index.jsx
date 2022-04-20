import Renderer from "./Renderer";
import Editor from "./Editor";
import { default as registeredVisualizations } from "@redash/viz/lib/visualizations/registeredVisualizations";

const DEFAULT_OPTIONS = {
  dateColName: "date",
  openColName: "open",
  highColName: "high",
  lowColName: "low",
  closeColName: "close",
  volumnColName: "volume",
  increasingColor: "red",
  decreasingColor: "black",
  volumeColor: "green",
  series: { stacking: false },
  legend: { enabled: true, placement: "auto", traceorder: "normal" },
  xAxis: { type: "date", labels: { enabled: true } },
  yAxis: [{ type: "linear" }],
  alignYAxesAtZero: true,
  rangeSelector: false,
  rangeSlider: true,
  showVolume: false,
  numberFormat: "0,0[.]00000",
  dateFormat: "DD/MM/YY"
};

const CONFIG = {
  type: "CANDLESTICK",
  name: "Candlestick",
  getOptions: (options) => ({
    ...DEFAULT_OPTIONS,
    ...options,
  }),
  Renderer,
  Editor,
  defaultColumns: 2,
  defaultRows: 5,
};

registeredVisualizations[CONFIG.type] = CONFIG