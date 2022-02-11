import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import html2canvas from 'html2canvas'
const Path = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [prevColor, setPrevColor] = useState("");
  const [isClicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const { color, getData, id, muscle, joint } = props;

  useEffect(() => {
    if (isClicked) {
      getData({ id, muscle, joint, color });
      setPrevColor(color);
      setBackgroundColor(color);
    } else {
      if (backgroundColor) {
        if (prevColor === color) {
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
  }, [isClicked, prevColor,dispatch,getData,id,joint,muscle]);

  const clickHandler = async () => {
    setClicked((prevState) => {
      return !prevState;
    });
    let video = props.screenShotRef.current
    props.executeScroll()    
    let div = document.getElementById(video.id);
    let can =  await html2canvas(div)
    let url = can.toDataURL()
    dispatch({
      type: STATECHANGE,
      payload: {
          key:'body_image',
          value:url
      }
  });
  };

  return <path d={props.d} fill={backgroundColor} onClick={clickHandler} />;
};

export default Path;
