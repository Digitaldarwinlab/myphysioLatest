import React, { useCallback, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Items } from './Items';
import { Menu } from 'antd';
import { GoCalendar } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons"
const DropDownMenu = ({ getCurrentPath, setShowMenu, showMenu,setDisCamSelection }) => {
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" };
    const [activeDevice, setActiveDevice] = useState({ deviceId: "", label: "" });
    const [devices, setDevices] = useState([]);
    const [showDevice, setshowDevices] = useState(true);

    console.log(showMenu);
    let temp = [
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
    const handleDevices = useCallback(
        (mediaDevices) =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );
    useEffect(() => {
        const fetch = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log("available devices ",devices)
            handleDevices(devices);
        };

        fetch();
    }, [handleDevices]);
    const clickHandler = (id) => {
        darwin.cameraIdFunc(id)
        console.log("isClocked")
        setshowDevices(prev => !prev);
        setDisCamSelection(true)
    }   

    useEffect(() => {
        if (showMenu) {
            setshowDevices(true);
        }
    }, [showMenu])

    const AdminMenu = () => {
        return (
            <>
                {showDevice && <>
                    {
                        devices.map((item, index) => {
                            return (
                                <Menu.Item key={index}
                                    onClick={() => clickHandler(item.deviceId)}
                                    style={{ borderTop: "solid 1px black", marginTop: '0px' }}
                                >

                                    {item.label}

                                </Menu.Item>
                            )
                        })
                    }
                </>}
            </>
        )
    }

    //Physio Menu
    const PhysioMenu = () => {
        return (
            <>
                {/* {
                    Items.map((item, index) => {
                        return (
                            <>
                                {item.role === "physio" && (
                                    <Menu.Item key={index}
                                        className={item.isHidden ? "hiddenDropDown" : ""}
                                        onClick={() => { getCurrentPath(item.currentPath) }}
                                        icon={item.Icon}
                                        style={{ borderTop: "1px solid red" }}
                                    >
                                        <Link to={item.path} className="text-secondary text-decoration-none">
                                            {item.name}
                                        </Link>
                                    </Menu.Item>
                                )}
                            </>
                        )
                    })
                } */}
                 {showDevice && <>
                    {
                        devices.map((item, index) => {
                            return (
                                <Menu.Item key={index}
                                    onClick={() => clickHandler(item.deviceId)}
                                    style={{ borderTop: "solid 1px black", marginTop: '0px' }}
                                >

                                    {item.label}

                                </Menu.Item>
                            )
                        })
                    }
                </>}
            </>
        )
    }
    //Patient Menu
    const PatientMenu = () => {
        return (
            <>
            {/* BsGlobe */}
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon={<GoCalendar className="iconClass2" />}
                    style={{}}
                >
                    <Link to="/patient/schedule" className="text-secondary text-decoration-none">
                        Schedule
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon={<CgProfile className="iconClass2" />}
                    style={{}}
                >
                    <Link to="/patient/profile" className="text-secondary text-decoration-none">
                        Account
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon=""
                    style={{}}
                >
                    <Link to="/logout" className="text-secondary text-decoration-none">
                        Logout
                    </Link>
                </Menu.Item>
            </>
        )
    }
    return (
        <Menu className="dropDownMenu">
            {userInfo.role === "admin" && AdminMenu()}
            {userInfo.role === "physio" && PhysioMenu()}
            {(userInfo.role !== "admin" && userInfo.role !== "physio") && PatientMenu()}
        </Menu>
    )
}
export default DropDownMenu;