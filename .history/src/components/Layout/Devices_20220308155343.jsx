import React, { useEffect, useState } from "react";
import { Menu, Select } from "antd";
const { Option } = Select;
const Devices = () => {
  const [activeDevice, setActiveDevice] = useState({ deviceId: "", label: "" });
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  const changeHandler = (e) => {
     // console.log(e.target.value);
//     getId(e.target.value);
//     setActiveDevice({
//       deviceId: e.target.value,
//       label: e.target.value,
//     });
  };

//   console.log(devices);

//   const clickHandler = (e) => {
//     console.log(e.target.child);
//   };

  useEffect(() => {
    const fetch = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();

      handleDevices(devices);
    };

    fetch();
  }, [handleDevices]);
//   let temp = [
//     {
//       name: "1st cam",
//     },
//     {
//       name: "2nd cam",
//     },
//   ];

  return (
    <Select defaultValue="lucy" style={{ width: 120 }} onChange={changeHandler}>
      <Option value="jack">Jack</Option>
      <Option value="jack">Jack</Option>
      <Option value="jack">Jack</Option>
    </Select>
  );
};

export default Devices;
