import { useState } from "react";
import "./Body.css";
// import paths from "./svg-path";
import Path from "./Path";
import { front_paths } from "../body-svg";
import { back_paths } from "../body-svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../Store/auth-context";
import { useHistory } from "react-router-dom";
// import { logout } from '../API/userAuth/userAuth';

// let colors = ["#ff0000", "#2EDC0C", "#ff9900", "#3366ff", "#AA1D8C"];

const Body = (props) => {
  const [color, setColor] = useState("rgb(255, 0, 0)");
  const [redClass, setRedClass] = useState("color active");
  const [greenClass, setGreenClass] = useState("color");
  const [orangeClass, setOrangeClass] = useState("color");
  const [blueClass, setBlueClass] = useState("color");
  const [purpleClass, setPurpleClass] = useState("color");
  const [data, setData] = useState("Click on Body Part");

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const joints = useSelector(state => state.jointReducer.joints);
  const dispatch = useDispatch();

  let allJoints = [];
  
  for(let joint in joints){
    allJoints.push(...joints[joint].joint);
  }

  allJoints = [...new Set(allJoints)];
  console.log(allJoints);

  const redclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("color active");
    setGreenClass("color");
    setOrangeClass("color");
    setBlueClass("color");
    setPurpleClass("color");
  };

  const greenclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("color ");
    setGreenClass("color active");
    setOrangeClass("color");
    setBlueClass("color");
    setPurpleClass("color");
  };

  const orangeclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("color ");
    setGreenClass("color");
    setOrangeClass("color active");
    setBlueClass("color");
    setPurpleClass("color");
  };

  const blueclickHandler = (event) => {
    console.log(event.target.style.backgroundColor);
    setColor(event.target.style.backgroundColor);
    setRedClass("color ");
    setGreenClass("color");
    setOrangeClass("color");
    setBlueClass("color active");
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

  // const logoutHandler = () => {
  //   logout();
  //   localStorage.clear();
  //   window.location.href="/"
  // };

  const submitClickHandler =() => {
    if(allJoints.length !== 0){
      history.push('/quiz');
    } else {
      alert("Select Any Muscles");
    }
    
  }

  


  return (
    <>
    <div className="logout">
        {/* <button onClick={logoutHandler}>Logout</button> */}
      </div>
      <div className="submit">
        <button onClick={submitClickHandler}>Submit</button>
      </div>
      <div className="svg-img">
        <div className="colors">
          <div className="color_text">
            <div
              onClick={redclickHandler}
              className={redClass}
              style={{ backgroundColor: "rgb(255, 0, 0)" }}
            ></div>
            <p>Burning</p>
          </div>

          <div className="color_text">
            <div
              onClick={greenclickHandler}
              className={greenClass}
              style={{ backgroundColor: "rgb(46, 220, 12)" }}
            ></div>
            <p>Itching</p>
          </div>

          <div className="color_text">
            <div
              onClick={orangeclickHandler}
              className={orangeClass}
              style={{ backgroundColor: "rgb(255, 153, 0)" }}
            ></div>
            <p>Pain</p>
          </div>

          <div className="color_text">
            <div
              onClick={blueclickHandler}
              className={blueClass}
              style={{ backgroundColor: "rgb(51, 102, 255)" }}
            ></div>
            <p>Cold</p>
          </div>

          <div className="color_text">
            <div
              onClick={purpleclickHandler}
              className={purpleClass}
              style={{ backgroundColor: "rgb(170, 29, 140)" }}
            ></div>
            <p>Burning</p>
          </div>
        </div>
        <svg x="0px" y="0px" viewBox="0 80 612 792" className="body-s">
          {front_paths.map((path) => (
            <Path
              d={path.d}
              key={path.id}
              id={path.id}
              muscle={path.muscle}
              joint={path.joint}
              color={color}
              section={path.section}
              joints={joints}
              getData={getData}
            />
          ))}
        </svg>
        <svg x="0px" y="0px" viewBox="170 80 612 792">
          {back_paths.map((path) => (
            <Path
              d={path.d}
              key={path.id}
              id={path.id}
              muscle={path.muscle}
              joint={path.joint}
              section={path.section}
              color={color}
              joints={joints}
              getData={getData}
            />
          ))}
        </svg>
      </div>
      
    </>
  );
};

export default Body;
