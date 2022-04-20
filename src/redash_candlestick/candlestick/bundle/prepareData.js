import { extend } from "lodash"


export default function prepareData(data, options) {
    const DEFAULT = {
        xaxis: "x",
        yaxis: "y",
        increasing: { line: { color: options.increasingColor }},
        decreasing: { line: { color: options.decreasingColor }},
    }
    
    const VOLUME = {
        xaxis: "x",
        yaxis: "y3",
        marker: { color: options.volumeColor }
    }

    const series = [ 
        { ...DEFAULT, ...data.candlestick, },
    ];

    if (options.showVolume) {
        series.push({ ...VOLUME, ...data.volume, })
    }

    return series
}