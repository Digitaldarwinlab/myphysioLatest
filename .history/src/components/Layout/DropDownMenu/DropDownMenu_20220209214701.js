import React from 'react'
import { Link } from "react-router-dom";
import { Items } from './Items';
import { Menu } from 'antd';
import { GoCalendar } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const DropDownMenu = ({ getCurrentPath }) => {
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" };
    const [devices, setDevices] = useState([]);
    //admin Panel 
    const AdminMenu = () => {
        return (
            <>
                {
                    Items.map((item, index) => {
                        return (
                            <Menu.Item key={index}
                                className={item.isHidden ? "hiddenDropDown" : ""}
                                onClick={() => { getCurrentPath(item.currentPath) }}
                                icon={item.Icon}
                                style={{ borderTop:"solid 1px black",marginTop:'0px' }}
                               
                            >
                                <Link to={item.path} className="text-secondary text-decoration-none">
                                    {item.name}
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </>
        )
    }

    //Physio Menu
    const PhysioMenu = () => {
        return (
            <>
                {
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
                }
            </>
        )
    }
    //Patient Menu
    const PatientMenu = () => {
        return (
            <>
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon={<GoCalendar className="iconClass2" />}
                    style={{ }}
                >
                    <Link to="/patient/schedule" className="text-secondary text-decoration-none">
                        Schedule
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon={<CgProfile className="iconClass2" />}
                    style={{ }}
                >
                    <Link to="/patient/profile" className="text-secondary text-decoration-none">
                        Account
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="hiddenDropDown"
                    onClick={() => { getCurrentPath("") }}
                    icon=""
                    style={{ }}
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