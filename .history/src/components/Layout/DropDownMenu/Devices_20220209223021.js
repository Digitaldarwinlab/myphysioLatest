import { useState, useCallback, useEffect } from "react";

const newDevices = [
    {
        "deviceId": "ee7c0889458681b465b13bdaf9ad0afa498065d50b02dc4b6c84140943d3fc9c",
        "kind": "videoinput",
        "label": "DroidCam Source 3",
        "groupId": "649a976668c9a1e74f0f99822a3144a35c29f1f43fa1eafc9b8595dfe21ae541"
    },
    {
        "deviceId": "623969252b9c6deb21548a7ea4896272979ef45d0099e76ab6d50abea0719a22",
        "kind": "videoinput",
        "label": "DroidCam Source 2",
        "groupId": "c599461e7d837fe556fdd63223f38dd7e538d904ddc4d6b2dd78d9f6607166e7"
    }
]

const Devices = () => {
  const [activeDevice, setActiveDevice] = useState({ deviceId: "", label: "" });
  const [devices, setDevices] = useState([]);
 

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {

   const fetch = async() => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    handleDevices(devices);
    
  }

  fetch();
 
  }, [handleDevices]);



  const changeHandler = (e) => {
    
    console.log(e.target.value);
   
    setActiveDevice({
      deviceId: e.target.value,
      label: e.target.value,
    });
  };

  console.log(devices);

//   const clickHandler = (e) => {
//     console.log(e.target.child);
//   }


  
        {/* <select
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
        </select> */}
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
          {newD.map((device) => (
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
        {/* <Webcam
          audio={false}
          videoConstraints={{ deviceId: activeDevice.deviceId }}
        /> */}
        
        {activeDevice.label || `Device ${0}`} 
      </div>
    </>
  );
};

export default Devices;