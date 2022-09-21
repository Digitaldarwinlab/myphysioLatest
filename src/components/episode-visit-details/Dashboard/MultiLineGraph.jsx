import React, { useState,useEffect } from "react";
import { Select, Empty } from "antd";
import CanvasJSReact from "../../../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import "./Dash.css";
const { Option } = Select;

const MultiLineGraph = (props) => {
  console.log(props)
  const [width, setWidth] = useState(
    parseInt(window.innerWidth) < 400 ? parseInt(window.innerWidth) - 100 : 450
  );
  const [joint, setJoint] = useState("1");
  useEffect(() => {
    // let result = props.mainValue.find(item => item.jointName === joint);
    let result = props.mainValue.filter(obj=> props.Jointvalue.includes(obj.jointName))
    
    console.log(result)
  }, [joint])
  
  const options = {
    theme: "light2",
    animationEnabled: true,
    width: width,
    title: {
      text: "Units Sold VS Profit",
    },
    subtitles: [
      {
        text: "Click Legend to Hide or Unhide Data Series",
      },
    ],
    axisX: {
      title: "States",
    },
    axisY: {
      title: "Units Sold",
      titleFontColor: "#6D78AD",
      lineColor: "#6D78AD",
      labelFontColor: "#6D78AD",
      tickColor: "#6D78AD",
    },
    axisY2: {
      title: "Profit in USD",
      titleFontColor: "#51CDA0",
      lineColor: "#51CDA0",
      labelFontColor: "#51CDA0",
      tickColor: "#51CDA0",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      {
        type: "spline",
        name: "Units Sold",
        jointName: "flex",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0 Units",
        dataPoints: [
          { x: new Date(2017, 0, 1), y: 120 },
          { x: new Date(2017, 1, 1), y: 135 },
          { x: new Date(2017, 2, 1), y: 144 },
          { x: new Date(2017, 3, 1), y: 103 },
          { x: new Date(2017, 4, 1), y: 93 },
          { x: new Date(2017, 5, 1), y: 129 },
          { x: new Date(2017, 6, 1), y: 143 },
          { x: new Date(2017, 7, 1), y: 156 },
          { x: new Date(2017, 8, 1), y: 122 },
          { x: new Date(2017, 9, 1), y: 106 },
          { x: new Date(2017, 10, 1), y: 137 },
          { x: new Date(2017, 11, 1), y: 142 },
        ],
      },
      {
        type: "spline",
        jointName: "flex",
        name: "Profit",
        axisYType: "secondary",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.#",
        dataPoints: [
          { x: new Date(2017, 0, 1), y: 19034.5 },
          { x: new Date(2017, 1, 1), y: 20015 },
          { x: new Date(2017, 2, 1), y: 27342 },
          { x: new Date(2017, 3, 1), y: 20088 },
          { x: new Date(2017, 4, 1), y: 20234 },
          { x: new Date(2017, 5, 1), y: 29034 },
          { x: new Date(2017, 6, 1), y: 30487 },
          { x: new Date(2017, 7, 1), y: 32523 },
          { x: new Date(2017, 8, 1), y: 20234 },
          { x: new Date(2017, 9, 1), y: 27234 },
          { x: new Date(2017, 10, 1), y: 33548 },
          { x: new Date(2017, 11, 1), y: 32534 },
        ],
      },
    ],
  };
  // console.log(options)
  return (
    <>
      <div  style={{ marginBottom: "10px" }}>
        {props.Jointvalue !== undefined && (
          <>
          <label> Please select a joint</label>
          <br />
          <Select
            showSearch
            style={{
              width: 200,
              float: "left",
            }}
            placeholder="Search to Select"
            defaultValue={joint}
            value={joint}
            onChange={(e) => {
              setJoint(e);
            }}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="1">None</Option>
            {props.Jointvalue.map((i) => (
              <Option value={i}>{i}</Option>
            ))}
          </Select>
          </>
        )}
      </div>
      <br />
      {joint !== "1" ? (
        <div  className="graphBox" style={{ position: "relative", top: "28px" }}>

          <CanvasJSChart options={options} />
        </div>
      ) : (
        <div style={{ position: "relative", top: "28px" }}>
          <Empty
            description="Please select a Joint"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
    </>
  );
};

export default MultiLineGraph;
