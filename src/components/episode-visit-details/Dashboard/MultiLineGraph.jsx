import React, { useState } from "react";
import CanvasJSReact from "../../../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import "./Dash.css";

const MultiLineGraph = (props) => {
  const [width, setWidth] = useState(parseInt(window.innerWidth) < 400 ? parseInt(window.innerWidth) - 100 : 450)
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", 
    width:width,
    title:{
        text: "Arom Value of Week"
    },
    axisY: {
        title: "Angles",
        maximum:180,
        minimum:0,
      },
      axisX: {
        title: "Days",
        valueFormatString: "DD MMM",
        interval: 1,
      },
    toolTip: {
        shared: true
    },
    data: props.option
}
  // console.log(options)
  return (
    <div className="graphBox">
      {props.value && <CanvasJSChart options={options} />}
    </div>
  );
};

export default MultiLineGraph;
