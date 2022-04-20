import React from "react";
import { RendererPropTypes } from "@redash/viz/lib/visualizations/prop-types";

import PlotlyChart from "./PlotlyChart";

export default function Renderer({ options, ...props }) {
  return <PlotlyChart options={options} {...props} />;
}

Renderer.propTypes = RendererPropTypes;