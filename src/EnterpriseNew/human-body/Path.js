import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Path = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [prevColor, setPrevColor] = useState("");
  const [jointColor, setJointColor] = useState("");
  const [isClicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const { color, getData, id, muscle, joint,backColor,joints,section } = props;



  useEffect(() => {
    if (isClicked ) {
      console.log(jointColor);
      console.log(color);
      if(jointColor === color){
        setJointColor('')
        dispatch({type:'REMOVE',id})
          setBackgroundColor("#000000");
      } else {
        getData({ id, muscle, joint,color,section });
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
        setJointColor('');
        setBackgroundColor("#000000");
      }
    }
  }, [isClicked, prevColor,dispatch,getData,id,joint,muscle,backColor,section]);

  useEffect(()=>{
    if(joints){
      const jointIndex = joints.findIndex(joint => joint.id === id);
    const joint = joints[jointIndex]
    if(joint){
      setJointColor(joint.color);
      setBackgroundColor(joint.color)
    }
    }
    
  },[joints,prevColor,id])

  

  const clickHandler = () => {
    setClicked(!isClicked)
    // setClicked((prevState) => {
    //   return !prevState;
    // });
  };

  return <path d={props.d} fill={backgroundColor } onClick={clickHandler} />;
};

export default Path;
