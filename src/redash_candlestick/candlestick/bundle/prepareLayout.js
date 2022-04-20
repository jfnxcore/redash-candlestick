import { isUndefined } from "lodash";

function prepareXAxis(axisOptions, additionalOptions) {
    const axis = {
      type: axisOptions.type,
      automargin: true,
      autorange: true,
    };
  
    if (!isUndefined(axisOptions.labels)) {
      axis.showticklabels = axisOptions.labels.enabled;
    }

    if(!additionalOptions.rangeSlider) {
      axis.rangeslider = { visible: false };
    }

    if(additionalOptions.rangeSelector) {
        axis.rangeselector = {
            x: 0,
            y: 1.2,
            xanchor: 'left',
            font: {size:8},
            buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1 month'
            }, {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6 months'
            }, {
                step: 'all',
                label: 'All dates'
            }]
        };
    }
  
    return axis;
}
  
function prepareYAxis(axisOptions) {
    return {
      automargin: true,
      autorange: true,
    };
}

function prepareDefaultLayout(layout, options, data) {
    const y2Series = data.filter((s) => s.yaxis === "y2");
  
    layout.xaxis = prepareXAxis(options.xAxis, options);
    layout.yaxis = prepareYAxis(options.yAxis[0]);

    if (y2Series.length > 0) {
      layout.yaxis2 = prepareYAxis(options.yAxis[1]);
      layout.yaxis2.overlaying = "y";
      layout.yaxis2.side = "right";
    }

    if(options.showVolume) {
      layout.yaxis.domain = [0.20, 1]

      layout.yaxis3 = prepareYAxis(options.yAxis[0]);
      layout.yaxis3.scaleanchor = "x"
      layout.yaxis3.domain = [0, 0.15]
    }

    if (options.series.stacking) {
      layout.barmode = "relative";
    }
  
    return layout;
}

export default function prepareLayout(element, options, data) {
    const layout = {
        margin: { l: 10, r: 10, b: 5, t: 20, pad: 4 },
        width: Math.max(5, Math.floor(element.offsetWidth)),
        height: Math.max(5, Math.floor(element.offsetHeight)),
        autosize: false,
        dragmode: 'zoom',
        showlegend: options.legend.enabled,
        legend: {
          traceorder: options.legend.traceorder,
        },
        hoverlabel: {
          namelength: -1,
        },
    };

    return prepareDefaultLayout(layout, options, data);
}