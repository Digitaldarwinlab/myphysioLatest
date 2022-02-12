import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import html2canvas from 'html2canvas'
const Path = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [prevColor, setPrevColor] = useState("");
  const [isClicked, setClicked] = useState(false);
  const [jointColor, setJointColor] = useState("");
  const dispatch = useDispatch();

  const { color, getData, id, muscle, joint , joints,backColor } = props;

  useEffect(() => {
    if (isClicked ) {
      if(jointColor === color){
        setJointColor('')
        dispatch({type:'REMOVE',id})
          setBackgroundColor("#000000");
      } else {
        getData({ id, muscle, joint,color });
        setPrevColor(color);
        setBackgroundColor(color);
      }
      
    } else {
      if (backgroundColor) {
        if (prevColor === color ) {
          setJointColor('')
          dispatch({type:'REMOVE',id})
          setBackgroundColor("#000000");
        } else {
          setClicked(true);
          setBackgroundColor(color);
        }
      } else {
        setBackgroundColor("#000000");
      }
    }
  }, [isClicked, prevColor,dispatch,getData,id,joint,muscle,backColor]);

  useEffect(()=>{
    if(joints){
      const jointIndex = joints.findIndex(joint => joint.id === id);
    const joint = joints[jointIndex]
    if(joint){
      setJointColor(joint.color)
      setBackgroundColor(joint.color)
    }
    }
    
  },[joints,prevColor,id])

  const clickHandler = async () => {
    setClicked(!isClicked)
  //   let video = props.screenShotRef.current
  //   props.executeScroll()    
  //   let div = document.getElementById(video.id);
  //   let can =  await html2canvas(div)
  //   let url = can.toDataURL()
  //   dispatch({
  //     type: STATECHANGE,
  //     payload: {
  //         key:'body_image',
  //         value:url
  //     }
  // });
  };

  return <path d={props.d} fill={backgroundColor} onClick={clickHandler} />;
};

export default Path;
