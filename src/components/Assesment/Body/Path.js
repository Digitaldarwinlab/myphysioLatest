import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Path = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [prevColor, setPrevColor] = useState("");
  const [isClicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const { color, getData, id, muscle, joint } = props;

  useEffect(() => {
    if (isClicked) {
      getData({ id, muscle, joint });
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

  const clickHandler = () => {
    setClicked((prevState) => {
      return !prevState;
    });
  };

  return <path d={props.d} fill={backgroundColor} onClick={clickHandler} />;
};

export default Path;
