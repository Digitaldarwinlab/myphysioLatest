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
    data: [{
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: [
            { y: 155, label: "Jan" },
            { y: 150, label: "Feb" },
            { y: 152, label: "Mar" },
            { y: 148, label: "Apr" },
            { y: 142, label: "May" },
            { y: 150, label: "Jun" },
            { y: 146, label: "Jul" },
            { y: 149, label: "Aug" },
            { y: 153, label: "Sept" },
            { y: 158, label: "Oct" },
            { y: 154, label: "Nov" },
            { y: 150, label: "Dec" }
        ]
    },
    {
        type: "spline",
        name: "2017",
        showInLegend: true,
        dataPoints: [
            { y: 172, label: "Jan" },
            { y: 173, label: "Feb" },
            { y: 175, label: "Mar" },
            { y: 172, label: "Apr" },
            { y: 162, label: "May" },
            { y: 165, label: "Jun" },
            { y: 172, label: "Jul" },
            { y: 168, label: "Aug" },
            { y: 175, label: "Sept" },
            { y: 170, label: "Oct" },
            { y: 165, label: "Nov" },
            { y: 169, label: "Dec" }
        ]
    }]
}
  // console.log(options)
  return (
    <div className="graphBox">
      {props.value && <CanvasJSChart options={options} />}
    </div>
  );
};

export default LineGraph;
