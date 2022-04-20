import React, { useState, useEffect, useContext, useRef } from "react";
import useMedia from "use-media";
import { ErrorBoundaryContext } from "@redash/viz/lib/components/ErrorBoundary";
import { RendererPropTypes } from "@redash/viz/lib/visualizations/prop-types";
import { visualizationsSettings } from "@redash/viz/lib/visualizations/visualizationsSettings";
import initChart from "./initChart";
import getChartData from "./getChartData";

export default function PlotlyChart({ options, data }) {
  const [container, setContainer] = useState(null);
  const [chart, setChart] = useState(null);

  const errorHandler = useContext(ErrorBoundaryContext);
  const errorHandlerRef = useRef();
  errorHandlerRef.current = errorHandler;

  const isMobile = useMedia({ maxWidth: 768 });
  const isMobileRef = useRef();
  isMobileRef.current = isMobile;

  useEffect(() => {
    if (container) {
      let isDestroyed = false;

      const chartData = getChartData(data.rows, options);
      const _chart = initChart(container, options, chartData, visualizationsSettings, (error) => {
        errorHandlerRef.current.handleError(error);
      });
      _chart.initialized.then(() => {
        if (!isDestroyed) {
          setChart(_chart);
        }
      });
      return () => {
        isDestroyed = true;
        _chart.destroy();
      };
    }
  }, [options, data, container]);

  useEffect(() => {
    if (chart) {
      chart.setZoomEnabled(!isMobile);
    }
  }, [chart, isMobile]);

  return <div className="chart-visualization-container" ref={setContainer} />;
}

PlotlyChart.propTypes = RendererPropTypes;

