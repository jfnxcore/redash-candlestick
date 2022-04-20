import { each, map, first, isUndefined } from "lodash";
import { normalizeValue, cleanNumber } from "./utils"

// I don't know what is the best way to implement the getChartData
// See: https://stackoverflow.com/questions/614126/why-is-array-push-sometimes-faster-than-arrayn-value
// With Chrome on my setup the [[put]] seem to be the fastest implementation

function appendToCandlestickSerie(candlestick, row, index, options) {
    candlestick.x[index] = normalizeValue(row[options.dateColName], options.xAxis.type);
    candlestick.open[index] = cleanNumber(row[options.openColName]);
    candlestick.high[index] = cleanNumber(row[options.highColName]);
    candlestick.low[index] = cleanNumber(row[options.lowColName]);
    candlestick.close[index] = cleanNumber(row[options.closeColName]);
}

function appendToVolumeSerie(volume, row, index, options) {
    volume.y[index] = cleanNumber(row[options.volumeColName]);
}

export default function getChartData(data, options) {
    const head = first(data)
    const series = {
        candlestick: {
            $raw: data,
            name: isUndefined(head) ? "ohlc" : head[options.serieColName],
            type: "candlestick",
            x: [],
            open: [],
            high: [],
            low: [],
            close: [],
        }
    }

    if(options.showVolume) {
        series.volume = {
            $raw: data,
            name: "volume",
            type: "bar",
            y: [],
        }
    }

    each(data, (row, index) => {
        appendToCandlestickSerie(series.candlestick, row, index, options)
        if(options.showVolume) {
            appendToVolumeSerie(series.volume, row, index, options)
        }
    });

    if(options.showVolume) {
        series.volume.x = series.candlestick.x
    }

    return series
}