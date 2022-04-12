import React, { useState } from 'react'
import { Menu } from 'antd';
import { FaColumns ,FaUserMd  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine, RiFileTextFill } from "react-icons/ri";
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaWindowClose} from 'react-icons/fa'
import { GrGroup } from "react-icons/gr";
import { FaCalendarPlus, FaPills, FaMicroscope } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import { AiFillCalendar, AiFillCamera, AiFillMedicineBox } from "react-icons/ai";
import { FaFileInvoiceDollar} from "react-icons/fa";

const SideNavBar = ({ isSideNavbarCollpased, SideNavbarCollpased, pathName, getCurrentPath }) => {
    const [pateintItemActive, setPatientItemActive] = useState(pathName.includes("pateints"));
    const [SchedulingItemActive, setSchedulingItemActive] = useState(pathName.includes("appointments"));
    const [episodeItemActive, setEpisodeItemActive] = useState(pathName.includes("episode"));
    const [visitItemActive, setVisitItemActive] = useState(pathName.includes("care"));
    const [assessmentItemActive, setAssessmentItemActive] = useState(pathName.includes("assessment"));
    const [notesItemActive, setNotesItemActive] = useState(pathName.includes("notes"));
    const [physioItemActive, setPhysioItemActive] = useState(pathName.includes("physio"));
    const [clinicItemActive, setClinicItemActive] = useState(pathName.includes("clinic"));
    const [EnterpriseItemActive, setEnterpriseItemActive] = useState(pathName.includes("enterprise"));
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
        else if (listItem === "clinic") {
            setClinicItemActive(!clinicItemActive);
            getCurrentPath("clinic");
        }
        else if(listItem === "enterprise"){
            setEnterpriseItemActive(!EnterpriseItemActive);
            getCurrentPath("enterprise");
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
               { userInfo.role == "admin"&& <Menu.Item key="link37"
                    icon={<i className="fas fa-user-md" style={{position:'relative',top:"1px",fontSize:'18px'}}/>}
                    className="text-decoration-none"
                >
                    <Link to="/physio/register"
                        style={{ color: "black" }}
                    >Physio Register</Link>
                </Menu.Item>}
                {/* { userInfo.role == "admin" && <Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/clinic-list"
                        style={{ color: "black" }}
                    >Clinic View</Link>
                </Menu.Item>}
               { userInfo.role == "admin" && <Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/physio/clinic/register"
                        style={{ color: "black" }}
                    >Clinic Register</Link>
                </Menu.Item>} */}
              
                {userInfo.role == "HeadPhysio"&&<Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/clinic/view"
                        style={{ color: "black" }}
                    >View Clinic</Link>
                </Menu.Item>}
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

    const clinicItems = () => {
        return (
            <Menu.SubMenu key="link45"
                className={pathName.includes("enterprise") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("enterprise")}
                icon={<i className="fas fa-user-md iconClass1"></i>}
                title="Enterprise">
                     { userInfo.role == "admin" && <Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/enterprise/organization-register"
            <Menu.SubMenu key="link46"
                className={pathName.includes("clinic") ? "active text-decoration-none" : "text-decoration-none"}
                onClick={() => handleClick("clinic")}
                icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />} 
                title="  Clinics">
                       { userInfo.role == "admin" && <Menu.Item key="link4986"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/clinic/register"
                        style={{ color: "black" }}
                    >Clinic Register</Link>
                </Menu.Item>}

               { userInfo.role == "admin"&& <Menu.Item key="link37"
                    icon={<i className="fas fa-user-md" style={{position:'relative',top:"1px",fontSize:'18px'}}/>}
                    className="text-decoration-none"
                >
                    <Link to="/enterprise/employee-register"
                        style={{ color: "black" }}
                    >Employee Register</Link>
                </Menu.Item>}

                
                <Menu.Item key="link56"
                    icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
                    className="text-decoration-none"
                >
                    <Link to="/enterprise/organization-list"
                        style={{ color: "black" }}
                    >Organization List</Link>
                </Menu.Item>
                <Menu.Item key="link56"
                    icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
                    className="text-decoration-none"
                >
                    <Link to="/enterprise/employee-list"
                        style={{ color: "black" }}
                    >Employee List</Link>
                </Menu.Item>
                { userInfo.role == "admin" && <Menu.Item key="link451"
                    icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
                    className="text-decoration-none"
                >
                    <Link to="/clinic-list"
                        style={{ color: "black" }}
                    >Clinic List</Link>
                </Menu.Item>}
            </Menu.SubMenu>
        )
    }    // Scheduling 
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

    const Invoice = () => {
        
        return (
           
                <Menu.Item key="link12" title="Invoice"
                    icon={<FaFileInvoiceDollar className="iconClass1" />}
                    className="text-decoration-none"
                >
                    <Link to="/invoice"
                        style={{ color: "black" }}
                    >Invoice</Link>
                </Menu.Item>
           
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
            
            {(userInfo.role === "admin") &&  EnterpriseItems()}
            {(userInfo.role === "admin") &&  clinicItems()}
            {(userInfo.role === "admin" || userInfo.role == "HeadPhysio") &&  physioItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && pateintItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && episodeItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && schedulingItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && assessmentItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && notesItems()}
            {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && carePlanItem()}
            {/* {(userInfo.role === "physio" || userInfo.role === "admin"|| userInfo.role == "HeadPhysio") && Invoice()} */}
        </Menu>
    )
}
export default SideNavBar;





