import React, { Component } from "react";
import CanvasJSReact from "../../../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import "./Dash.css";

const LineGraph = (props) => {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", 
    title: {
      text: "Pain Scale of Week",
    },
    axisY: {
      title: "Pain Scale",
    },
    axisX: {
      title: "Days",
      valueFormatString: "DD MMM",
      interval: 1,
    },
    data: [
      {
        markerColor: "#2d7ecb",
        lineColor: "#2d7ecb",
        type: "line",
        toolTipContent: "{x}: {y}",
        dataPoints: props.value,
      },
    ],
  };
  return (
    <div className="graphBox">
      {props.value && <CanvasJSChart options={options} />}
    </div>
  );
};

export default LineGraph;
