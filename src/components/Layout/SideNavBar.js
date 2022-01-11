import React, { useState } from 'react'
import { Menu } from 'antd';
import { FaColumns } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine, RiFileTextFill } from "react-icons/ri";
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaWindowClose} from 'react-icons/fa'
import { GrGroup } from "react-icons/gr";
import { FaCalendarPlus, FaPills, FaMicroscope } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import { AiFillCalendar, AiFillCamera, AiFillMedicineBox } from "react-icons/ai";

const SideNavBar = ({ isSideNavbarCollpased, SideNavbarCollpased, pathName, getCurrentPath }) => {
    const [pateintItemActive, setPatientItemActive] = useState(pathName.includes("pateints"));
    const [SchedulingItemActive, setSchedulingItemActive] = useState(pathName.includes("appointments"));
    const [episodeItemActive, setEpisodeItemActive] = useState(pathName.includes("episode"));
    const [visitItemActive, setVisitItemActive] = useState(pathName.includes("care"));
    const [assessmentItemActive, setAssessmentItemActive] = useState(pathName.includes("assessment"));
    const [notesItemActive, setNotesItemActive] = useState(pathName.includes("notes"));
    const [physioItemActive, setPhysioItemActive] = useState(pathName.includes("physio"));
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" }
    const handleClick = listItem => {
        if (listItem === "patients") {
            setPatientItemActive(!pateintItemActive);
            getCurrentPath("pateints");
        } else if (listItem === "Scheduling") {
            setSchedulingItemActive(!SchedulingItemActive);
            getCurrentPath("appointments");
        }
        else if (listItem === "episode") {
            setEpisodeItemActive(!episodeItemActive);
            getCurrentPath("episode");
        }
        else if (listItem === "carePlan") {
            setVisitItemActive(!visitItemActive);
            getCurrentPath("care");
        }
        else if (listItem === "assessment") {
            setAssessmentItemActive(!assessmentItemActive);
            getCurrentPath("assessment");
        }
        else if (listItem === "notes") {
            setNotesItemActive(!notesItemActive);
            getCurrentPath("notes");
        }
        else if (listItem === "physio") {
            setPhysioItemActive(!physioItemActive);
            getCurrentPath("physio");
        }
    }

    // Patients 
    const pateintItems = () => {
        return (
            <Menu.SubMenu key="link2"
                className={(pathName.includes("pateints") || pathName.includes("dashboard")) ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("patients")}
                icon={<i className="fas fa-user iconClass1"></i>}
                title="Patients">
                <Menu.Item key="link1"
                    onClick={() => { getCurrentPath("dashboard") }}
                    icon={<FaColumns size={18} style={{position:'relative',top:"1px"}} className="iconClass1" />}
                >
                    <Link to="/dashboard"
                        className="text-decoration-none"
                        style={{ color: "black" }}
                    >Dashboard
                    </Link>
                </Menu.Item>
                <Menu.Item key="link3"
                    icon={<HiUserAdd size={22} style={{position:'relative',top:"1px"}} className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/pateints/new"
                        style={{ color: "black" }}
                    >New Patient</Link>
                </Menu.Item>
                <Menu.Item key="link4"
                    icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
                    className="text-decoration-none"
                >
                    <Link to="/pateints"
                        style={{ color: "black" }}
                    >Patient List</Link>
                </Menu.Item>
            </Menu.SubMenu>
        )
    }
    //physio
    const physioItems = () => {
        return (
            <Menu.SubMenu key="link45"
                className={pathName.includes("physio") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("physio")}
                icon={<i className="fas fa-user-md iconClass1"></i>}
                title="Physio">
                <Menu.Item key="link37"
                    icon={<i className="fas fa-user-md" style={{position:'relative',top:"1px",fontSize:'18px'}}/>}
                    className="text-decoration-none"
                >
                    <Link to="/physio/register"
                        style={{ color: "black" }}
                    >Physio Register</Link>
                </Menu.Item>
                <Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/physio/clinic/register"
                        style={{ color: "black" }}
                    >Clinic Register</Link>
                </Menu.Item>
                <Menu.Item key="link56"
                    icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
                    className="text-decoration-none"
                >
                    <Link to="/physio/list"
                        style={{ color: "black" }}
                    >Physio List</Link>
                </Menu.Item>
            </Menu.SubMenu>
        )
    }
    // Scheduling 
    const schedulingItems = () => {
        return (
            <Menu.SubMenu key="link5"
                className={pathName.includes("appointments") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("Scheduling")}
                icon={<AiFillCalendar className="iconClass1" />}
                title="Visit">
                <Menu.Item key="link6"
                    icon={<FaCalendarPlus className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/appointments/new"
                        style={{ color: "black" }}
                    >New Visit</Link>
                </Menu.Item>
            </Menu.SubMenu>
        )
    }

    // Episode
    const episodeItems = () => {
        return (
            <Menu.SubMenu key="link8"
                className={pathName.includes("episode") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("episode")}
                icon={<FaPills className="iconClass1" />}
                title="Episode">
                <Menu.Item key="link9"
                    icon={<ImPlus className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/add-episode"
                        style={{ color: "black" }}
                    >Add Episode</Link>
                </Menu.Item>
            </Menu.SubMenu>
        )
    }

    //carePlan 
    const carePlanItem = () => {
        
        return (
            <Menu.SubMenu key="link11"
                className={pathName.includes("care") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("carePlan")}
                icon={<FaMicroscope className="iconClass1" />}
                title="Care Plan">
                <Menu.Item key="link12"
                    icon={<ImPlus className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/care-plan"
                        style={{ color: "black" }}
                    >Add Care Plan</Link>
                </Menu.Item>
            </Menu.SubMenu>
        )
    }

    // imaging
    const assessmentItems = () => {
        return (
            <Menu.SubMenu key="link14"
                className={pathName.includes("assessment") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("assessment")}
                icon={<AiFillMedicineBox className="iconClass1" />}
                title="Assessment">
                <Menu.Item key="link15"
                    icon={<ImPlus className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/assessment/1"
                        style={{ color: "black" }}
                    >Add Assesment</Link>
                </Menu.Item>
                
            </Menu.SubMenu>
        )
    }

    //incidents
    const notesItems = () => {
        return (
            <Menu.SubMenu key="link17"
                className={pathName.includes("notes") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("notes")}
                icon={<i className="fas fa-notes-medical iconClass1"></i>}
                title="Prescription">
                <Menu.Item key="link18"
                    icon={<ImPlus className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/notes"
                        style={{ color: "black" }}
                    >Add Prescription</Link>
                </Menu.Item>
            </Menu.SubMenu>

        )
    }
        /*
            <Menu.Item key="1" style={{backgroundColor:'transparent',color:'black'}} onClick={() => { SideNavbarCollpased() }}>
                {isSideNavbarCollpased
                    ? <GiHamburgerMenu  />
                    : <FaWindowClose style={{ float: "right" }} />}
            </Menu.Item>
            */

    return (
        <Menu className={`d-md-block bg-light sidebar`}
            style={{height: "92vh", fontSize: "1.08rem", overflow: "auto" }} mode="inline">
            
            {userInfo.role === "admin" && physioItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && pateintItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && episodeItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && schedulingItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && carePlanItem()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && assessmentItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin") && notesItems()}
        </Menu>
    )
}
export default SideNavBar;





