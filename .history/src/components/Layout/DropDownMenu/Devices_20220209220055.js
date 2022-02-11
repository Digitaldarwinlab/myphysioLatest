import { useState, useCallback, useEffect } from "react";
// import Webcam from "react-webcam";
import { getId } from "./script";

const WebcamCapture = () => {
  const [activeDevice, setActiveDevice] = useState({ deviceId: "", label: "" });
  const [devices, setDevices] = useState([]);
  // const [device, setDevice] = useState(null);
  // const videoRef = useRef();

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  // const handleVideo = useCallback((stream) => {
  //   console.log(stream);
  //   // console.log(window.URL.createObjectURL(stream));
  //   // // Update the state, triggering the component to re-render with the correct stream
  //   // setDevice({ videoSrc: window.URL.createObjectURL(stream) });
  //   videoRef.current.srcObject = stream;
  // },[setDevice])

  // const handleError = useCallback(() => {},[])

  useEffect(() => {

   const fetch = async() => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    handleDevices(devices);
    
  }

  fetch();
 
  }, [handleDevices]);



  const changeHandler = (e) => {
    
    console.log(e.target.value);
    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    // if(navigator.getUserMedia){
      // navigator.getUserMedia({video: true ,deviceId: e.target.value},handleVideo,handleError);
      getId(e.target.value)
    // }
    // getId(e.target.value);
    setActiveDevice({
      deviceId: e.target.value,
      label: e.target.value,
    });
  };

  console.log(devices);

  const clickHandler = (e) => {
    console.log(e.target.child);
  }


  return (
    <>
      <div>
        <select
          name="devices"
          id="devices"
          onChange={changeHandler}
          defaultValue={0}
        >
          <option value={0} disabled hidden>
            Choose Any Device
          </option>
          {devices.map((device) => (
            <option
              key={device.deviceId}
              value={device.deviceId}
              name={device.label}
              onClick={clickHandler.bind(null)}
            >
              {device.label}
            </option>
          ))}
        </select>
      </div>

      <div>
      
        
        {activeDevice.label || `Device ${0}`} 
      </div>
    </>
  );
};

export default WebcamCapture;