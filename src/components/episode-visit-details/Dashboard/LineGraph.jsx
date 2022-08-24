import React, { useState } from "react";
import CanvasJSReact from "../../../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import "./Dash.css";

const LineGraph = (props) => {
  const [width, setWidth] = useState(parseInt(window.innerWidth) < 400 ? parseInt(window.innerWidth) - 100 : 450)
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", 
    width:width,
    title: {
      text: "Pain Scale of Week",
    },
    axisY: {
      title: "Pain Scale",
      maximum:10,
      minimum:1,
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
  // console.log(options)
  return (
    <div className="graphBox">
      {props.value && <CanvasJSChart options={options} />}
    </div>
  );
};

export default LineGraph;
