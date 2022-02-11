import { useState } from "react";
// import "./Body.css";
// import paths from "./svg-path";
import Path from "./Path";
import { front_paths } from "./body-svg";
import { back_paths } from "./body-svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

// let colors = ["#ff0000", "#2EDC0C", "#ff9900", "#3366ff", "#AA1D8C"];

const Body = (props) => {
  const [color, setColor] = useState("#ff0000");
  const [redClass, setRedClass] = useState("color active");
  const [greenClass, setGreenClass] = useState("color");
  const [orangeClass, setOrangeClass] = useState("color");
  const [blueClass, setBlueClass] = useState("color");
  const [purpleClass, setPurpleClass] = useState("color");
  const [data, setData] = useState("Click on Body Part");

  const joints = useSelector(state => state.jointReducer.joints);
  const dispatch = useDispatch();

  console.log(joints);



  const redclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("setlect-color active");
    setGreenClass("setlect-color");
    setOrangeClass("setlect-color");
    setBlueClass("setlect-color");
    setPurpleClass("setlect-color");
  };

  const greenclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("setlect-color ");
    setGreenClass("setlect-color active");
    setOrangeClass("setlect-color");
    setBlueClass("setlect-color");
    setPurpleClass("setlect-color");
  };

  const orangeclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("setlect-color ");
    setGreenClass("setlect-color");
    setOrangeClass("setlect-color active");
    setBlueClass("setlect-color");
    setPurpleClass("setlect-color");
  };

  const blueclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("setlect-color ");
    setGreenClass("setlect-color");
    setOrangeClass("setlect-color");
    setBlueClass("setlect-color active");
    setPurpleClass("color");
  };

  const purpleclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("color ");
    setGreenClass("color");
    setOrangeClass("color");
    setBlueClass("color");
    setPurpleClass("color active");
  };

  const getData = useCallback((data) => {
    dispatch({type:'ADD',joint:data})
    setData(data);
  },[dispatch]);

  return (
    <>
      <h1>{data.id}</h1>
      <div className="svg-img">
        <div className="colors">
          <div className="color_text">
            <div
              onClick={redclickHandler}
              className={redClass}
              style={{ backgroundColor: "#ff0000" }}
            ></div>
            <p>Burning</p>
          </div>

          <div className="color_text">
            <div
              onClick={greenclickHandler}
              className={greenClass}
              style={{ backgroundColor: "#2EDC0C" }}
            ></div>
            <p>Itching</p>
          </div>

          <div className="color_text">
            <div
              onClick={orangeclickHandler}
              className={orangeClass}
              style={{ backgroundColor: "#ff9900" }}
            ></div>
            <p>Pain</p>
          </div>

          <div className="color_text">
            <div
              onClick={blueclickHandler}
              className={blueClass}
              style={{ backgroundColor: "#3366ff" }}
            ></div>
            <p>Cold</p>
          </div>

          <div className="color_text">
            <div
              onClick={purpleclickHandler}
              className={purpleClass}
              style={{ backgroundColor: "#AA1D8C" }}
            ></div>
            <p>Burning</p>
          </div>
        </div>
        <svg x="0px" y="0px" viewBox="0 0 612 792">
          {front_paths.map((path) => (
            <Path
              d={path.d}
              key={path.id}
              id={path.id}
              muscle={path.muscle}
              joint={path.joint}
              color={color}
              getData={getData}
            />
          ))}
        </svg>
        <svg x="0px" y="0px" viewBox="170 0 612 792">
          {back_paths.map((path) => (
            <Path
              d={path.d}
              key={path.id}
              id={path.id}
              muscle={path.muscle}
              joint={path.joint}
              color={color}
              getData={getData}
            />
          ))}
        </svg>
      </div>
    </>
  );
};

export default Body;
