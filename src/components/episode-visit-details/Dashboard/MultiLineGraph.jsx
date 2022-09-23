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
  const [datapoints, setDatapoints] = useState([]);
  useEffect(() => {
    // let result = props.mainValue.find(item => item.jointName === joint);
    let newArray =props.mainValue.filter(function (el) {
      return el.jointName === joint
    });
    setDatapoints(newArray)
    console.log(newArray)
  }, [joint])
  function toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    width: width,
    title: {
      text: "AROM Min/Max",
    },
    subtitles: [
      {
        text: "Click Legend to Hide or Unhide Data Series",
      },
    ],
    axisX: {
      title: "Dates",
      interval: 1,
    },
    axisY: {
      title: "Max Angles",
      titleFontColor: "#6D78AD",
      lineColor: "#6D78AD",
      labelFontColor: "#6D78AD",
      tickColor: "#6D78AD",
      maximum:200,
      minimum:-20,
    },
    axisY2: {
      title: "Min Angles",
      titleFontColor: "#51CDA0",
      lineColor: "#51CDA0",
      labelFontColor: "#51CDA0",
      tickColor: "#51CDA0",
      maximum:200,
      minimum:-20,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: datapoints,
  };
  console.log(options)
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
      {joint !== "1" && datapoints.length>0 ? (
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
