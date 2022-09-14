import React, { useState, useEffect } from "react";
// import { Menu } from "antd";
import { FaColumns, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideNavbar.css";
import { FaCalendarPlus, FaPills, FaMicroscope } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import {
  AiFillCalendar,
  AiFillCamera,
  AiFillMedicineBox,
} from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";

const SideNavBar = ({
  isSideNavbarCollpased,
  SideNavbarCollpased,
  pathName,
  getCurrentPath,
}) => {
  const [pateintItemActive, setPatientItemActive] = useState(
    pathName.includes("pateints")
  );
  const [SchedulingItemActive, setSchedulingItemActive] = useState(
    pathName.includes("appointments")
  );
  const [episodeItemActive, setEpisodeItemActive] = useState(
    pathName.includes("episode")
  );
  const [visitItemActive, setVisitItemActive] = useState(
    pathName.includes("care")
  );
  const [assessmentItemActive, setAssessmentItemActive] = useState(
    pathName.includes("assessment")
  );
  const [notesItemActive, setNotesItemActive] = useState(
    pathName.includes("notes")
  );
  const [physioItemActive, setPhysioItemActive] = useState(
    pathName.includes("physio")
  );
  const [EnterpriseItemActive, setEnterpriseItemActive] = useState(
    pathName.includes("enterprise")
  );
  const [clinicItemActive, setClinicItemActive] = useState(
    pathName.includes("clinic")
  );
  let location = useLocation();
  const [path, setPath] = useState();
  useEffect(() => {
    console.log(location.pathname);
    setPath(location.pathname);
  }, [location]);

  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { role: "physio" };
  const handleClick = (listItem) => {
    if (listItem === "patients") {
      setPatientItemActive(!pateintItemActive);
      getCurrentPath("pateints");
    } else if (listItem === "Scheduling") {
      setSchedulingItemActive(!SchedulingItemActive);
      getCurrentPath("appointments");
    } else if (listItem === "episode") {
      setEpisodeItemActive(!episodeItemActive);
      getCurrentPath("episode");
    } else if (listItem === "carePlan") {
      setVisitItemActive(!visitItemActive);
      getCurrentPath("care");
    } else if (listItem === "assessment") {
      setAssessmentItemActive(!assessmentItemActive);
      getCurrentPath("assessment");
    } else if (listItem === "notes") {
      setNotesItemActive(!notesItemActive);
      getCurrentPath("notes");
    } else if (listItem === "physio") {
      setPhysioItemActive(!physioItemActive);
      getCurrentPath("physio");
    } else if (listItem === "clinic") {
      setClinicItemActive(!clinicItemActive);
      getCurrentPath("clinic");
    }
  };
  getCurrentPath;
  // Patients
  const pateintItems = () => {
    return (
      <SubMenu
        key="link2"
        // className={
        //   pathName.includes("pateints") || pathName.includes("dashboard")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        
        onClick={() => handleClick("patients")}
        icon={<i className="fas fa-user "></i>}
        title="Patients"
      >
        <MenuItem
          key="link1"
          active={path === "/dashboard" ? true : false}
          onClick={() => {
            getCurrentPath("dashboard");
          }}
          icon={
            <FaColumns
              size={18}
              style={{ position: "relative", top: "1px" }}
              className=""
            />
          }
        >
          <Link
            to="/dashboard"
            className="text-decoration-none"
            style={{ color: "black" }}
          >
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem
          key="link3"
          active={path === "/pateints/new" ? true : false}
          icon={
            <HiUserAdd
              size={22}
              style={{ position: "relative", top: "1px" }}
              className=""
            />
          }
          className="text-decoration-none"
        >
          <Link to="/pateints/new" style={{ color: "black" }}>
            New Patient
          </Link>
        </MenuItem>
        <MenuItem
          key="link4"
          active={path === "/pateints" ? true : false}
          icon={
            <i
              className="fas fa-clipboard-list"
              style={{ position: "relative", top: "1px", fontSize: "18px" }}
            />
          }
          className="text-decoration-none"
        >
          <Link to="/pateints" style={{ color: "black" }}>
            Patient List
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };
  //physio
  const physioItems = () => {
    return (
      <SubMenu
        key="link45"
        // className={
        //   pathName.includes("physio")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("physio")}
        icon={<i className="fas fa-user-md "></i>}
        title="Physio"
      >
        {userInfo.role == "admin" && (
          <MenuItem
            key="link37"
            active={path === "/physio/register" ? true : false}
            icon={
              <i
                className="fas fa-user-md"
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            className="text-decoration-none"
          >
            <Link to="/physio/register" style={{ color: "black" }}>
              Physio Register
            </Link>
          </MenuItem>
        )}
        {/* { userInfo.role == "admin" && <MenuItem key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/clinic-list"
                        style={{ color: "black" }}
                    >Clinic View</Link>
                </MenuItem>}
               { userInfo.role == "admin" && <MenuItem key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                >
                    <Link to="/physio/clinic/register"
                        style={{ color: "black" }}
                    >Clinic Register</Link>
                </MenuItem>} */}

        {userInfo.role == "HeadPhysio" && (
          <MenuItem
            key="link4"
            active={path === "/clinic/view" ? true : false}
            icon={
              <i
                className="fas fa-clinic-medical"
                size={18}
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            className="text-decoration-none"
          >
            <Link to="/clinic/view" style={{ color: "black" }}>
              View Clinic
            </Link>
          </MenuItem>
        )}
        <MenuItem
          key="link56"
          active={path === "/physio/list" ? true : false}
          icon={
            <i
              className="fas fa-clipboard-list"
              style={{ position: "relative", top: "1px", fontSize: "18px" }}
            />
          }
          className="text-decoration-none"
        >
          <Link to="/physio/list" style={{ color: "black" }}>
            Physio List
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  const clinicItems = () => {
    return (
      <SubMenu
        key="link46"
        
        // className={
        //   pathName.includes("clinic")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("clinic")}
        icon={
          <i
            className="fas fa-clinic-medical"
            size={18}
            style={{ position: "relative", top: "1px", fontSize: "18px" }}
          />
        }
        title="  Clinics"
      >
        {userInfo.role == "admin" && (
          <MenuItem
            key="link4986"
            active={path === "/clinic/register" ? true : false}
            icon={
              <i
                className="fas fa-clinic-medical"
                size={18}
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            className="text-decoration-none"
          >
            <Link to="/clinic/register" style={{ color: "black" }}>
              Clinic Register
            </Link>
          </MenuItem>
        )}
        {userInfo.role == "admin" && (
          <MenuItem
            key="link451"
            active={path === "/clinic-list" ? true : false}
            icon={
              <i
                className="fas fa-clipboard-list"
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            className="text-decoration-none"
          >
            <Link to="/clinic-list" style={{ color: "black" }}>
              Clinic List
            </Link>
          </MenuItem>
        )}
      </SubMenu>
    );
  };

  const EnterpriseItems = () => {
    return (
      <SubMenu
        key="link506"
        // className={
        //   pathName.includes("enterprise")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("enterprise")}
        icon={<i className="fas fa-user-md "></i>}
        title="Enterprise"
      >
        {userInfo.role == "admin" && (
          <MenuItem
            key="link4"
            icon={
              <i
                className="fas fa-clinic-medical"
                size={18}
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            active={path === "/enterprise/organization-register" ? true : false}
            className="text-decoration-none"
          >
            <Link
              to="/enterprise/organization-register"
              style={{ color: "black" }}
            >
              Organization Register
            </Link>
          </MenuItem>
        )}

        {userInfo.role == "admin" && (
          <MenuItem
            key="link37"
            icon={
              <i
                className="fas fa-user-md"
                style={{ position: "relative", top: "1px", fontSize: "18px" }}
              />
            }
            active={path === "/enterprise/employee-register" ? true : false}
            className="text-decoration-none"
          >
            <Link to="/enterprise/employee-register" style={{ color: "black" }}>
              Employee Register
            </Link>
          </MenuItem>
        )}

        <MenuItem
          key="link65"
          icon={
            <i
              className="fas fa-clipboard-list"
              style={{ position: "relative", top: "1px", fontSize: "18px" }}
            />
          }
          active={path === "/enterprise/organization-list" ? true : false}
          className="text-decoration-none"
        >
          <Link to="/enterprise/organization-list" style={{ color: "black" }}>
            Organization List
          </Link>
        </MenuItem>
        <MenuItem
          key="link66"
          icon={
            <i
              className="fas fa-clipboard-list"
              style={{ position: "relative", top: "1px", fontSize: "18px" }}
            />
          }
          active={path === "/enterprise/employee-list" ? true : false}
          className="text-decoration-none"
        >
          <Link to="/enterprise/employee-list" style={{ color: "black" }}>
            Employee List
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };
  // Scheduling
  const schedulingItems = () => {
    return (
      <SubMenu
        key="link5"
        // className={
        //   pathName.includes("appointments")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("Scheduling")}
        icon={<AiFillCalendar className="" />}
        title="Visit"
      >
        <MenuItem
          key="link6"
          icon={<FaCalendarPlus className="" />}
          active={path === "/appointments/new" ? true : false}
          className="text-decoration-none"
        >
          <Link to="/appointments/new" style={{ color: "black" }}>
            New Visit
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  // Episode
  const episodeItems = () => {
    return (
      <SubMenu
        key="link8"
        // className={
        //   pathName.includes("episode")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        
        onClick={() => handleClick("episode")}
        icon={<FaPills className="" />}
        title="Episode"
      >
        <MenuItem
          key="link9"
          icon={<ImPlus className="" />}
          className="text-decoration-none"
          active={path === "/add-episode" ? true : false}
        >
          <Link to="/add-episode" style={{ color: "black" }}>
            Add Episode
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  //carePlan
  const carePlanItem = () => {
    return (
      <SubMenu
        key="link11"
        // className={
        //   pathName.includes("care")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("carePlan")}
        icon={<FaMicroscope className="" />}
        
        title="Care Plan"
      >
        <MenuItem
          key="link12"
          icon={<ImPlus className="" />}
          active={path === "/care-plan" ? true : false}
          className="text-decoration-none"
        >
          <Link to="/care-plan" style={{ color: "black" }}>
            Add Care Plan
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  // imaging
  const assessmentItems = () => {
    return (
      <SubMenu
        key="link14"
        // className={
        //   pathName.includes("assessment")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("assessment")}
        icon={<AiFillMedicineBox className="" />}
        title="Assessment"
      >
        <MenuItem
          key="link15"
          icon={<ImPlus className="" />}
          className="text-decoration-none"
          active={path === "/assessment/1" ? true : false}
        >
          <Link to="/assessment/1" style={{ color: "black" }}>
            Add Assesment
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  //incidents
  const notesItems = () => {
    return (
      <SubMenu
        key="link17"
        // className={
        //   pathName.includes("notes")
        //     ? "active text-decoration-none"
        //     : "text-decoration-none"
        // }
        onClick={() => handleClick("notes")}
        icon={<i className="fas fa-notes-medical "></i>}
        title="Prescription"
      >
        <MenuItem
          key="link18"
          icon={<ImPlus className="" />}
          className="text-decoration-none"
          active={path === "/notes" ? true : false}
        >
          <Link to="/notes" style={{ color: "black" }}>
            Add Prescription
          </Link>
        </MenuItem>
      </SubMenu>
    );
  };

  const Invoice = () => {
    return (
      <MenuItem
        key="link12"
        title="Invoice"
        icon={<FaFileInvoiceDollar className="" />}
        className="text-decoration-none"
        active={path === "/invoice" ? true : false}
      >
        <Link to="/invoice" style={{ color: "black" }}>
          Invoice
        </Link>
      </MenuItem>
    );
  };
  /*
            <MenuItem key="1" style={{backgroundColor:'transparent',color:'black'}} onClick={() => { SideNavbarCollpased() }}>
                {isSideNavbarCollpased
                    ? <GiHamburgerMenu  />
                    : <FaWindowClose style={{ float: "right" }} />}
            </MenuItem>
            */

  return (
    // <Menu
    //   className={`d-md-block bg-light sidebar`}
    //   style={{ height: "92vh", fontSize: "1.08rem", overflow: "auto" }}
    //   mode="inline"
    // >
    //    {userInfo.role === "patient" && (
    //     <MenuItem
    //       title="Dashboard"
    //       icon={<i className="fas fa-user "></i>}
    //       className="text-decoration-none"
    //     >
    //       <Link to="/patient/dashboard" style={{ color: "black" }}>
    //         Dashboard
    //       </Link>
    //     </MenuItem>
    //   )}
    //   {userInfo.role === "patient" && (
    //     <MenuItem
    //       title="Visit"
    //       icon={<AiFillCalendar className="" />}
    //       style={{ backgroundColor:'fff' }}
    //       className="text-decoration-none"
    //     >
    //       <Link to="/patient/visits" style={{ color: "black" }}>
    //         Visits
    //       </Link>
    //     </MenuItem>
    //   )}

    //   {userInfo.role === "patient" && (
    //     <MenuItem
    //       title="Prescription"
    //       icon={<i className="fas fa-notes-medical "></i>}
    //       className="text-decoration-none"
    //     >
    //       <Link to="/patient/prescription" style={{ color: "black"}}>
    //       Prescription
    //       </Link>
    //     </MenuItem>
    //   )}
    //   {userInfo.role === "patient" && (
    //     <MenuItem
    //       title="Careplan"
    //       icon={<i className="fas fa-notes-medical "></i>}
    //       className="text-decoration-none"
    //     >
    //       <Link to="/patient/careplan" style={{ color: "black"}}>
    //       Careplan
    //       </Link>
    //     </MenuItem>
    //   )}
    //   {userInfo.role === "admin" && clinicItems()}
    //   {userInfo.role === "admin" && EnterpriseItems()}
    //   {(userInfo.role === "admin" || userInfo.role == "HeadPhysio") &&
    //     physioItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     pateintItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     episodeItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     schedulingItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     assessmentItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     notesItems()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     carePlanItem()}
    //   {(userInfo.role === "physio" ||
    //     userInfo.role === "admin" ||
    //     userInfo.role == "HeadPhysio") &&
    //     Invoice()}
    // </Menu>
    <div id="header">
      <ProSidebar className={userInfo.role == "patient" ? 'patientSidebar' : "otherSidebar"} collapsed={isSideNavbarCollpased}>
        <SidebarContent>
          <Menu iconShape="square">
            {userInfo.role === "patient" && (
              <MenuItem
                title="Dashboard"
                icon={<i className="fas fa-user "></i>}
                active={path === "/patient/dashboard" ? true : false}
                className="text-decoration-none"
              >
                <Link to="/patient/dashboard" style={{ color: "black" }}>
                  Dashboard
                </Link>
              </MenuItem>
            )}
            {userInfo.role === "patient" && (
              <MenuItem
                title="Visit"
                icon={<AiFillCalendar className="" />}
                active={path === "/patient/visits" ? true : false}
                style={{ backgroundColor: "fff" }}
                className="text-decoration-none"
              >
                <Link to="/patient/visits" style={{ color: "black" }}>
                  Visits
                </Link>
              </MenuItem>
            )}

            {userInfo.role === "patient" && (
              <MenuItem
                title="Prescription"
                icon={<i className="fas fa-notes-medical "></i>}
                active={path === "/patient/prescription" ? true : false}
                className="text-decoration-none"
              >
                <Link to="/patient/prescription" style={{ color: "black" }}>
                  Prescription
                </Link>
              </MenuItem>
            )}
            {userInfo.role === "patient" && (
              <MenuItem
                title="Careplan"
                icon={<FaMicroscope className="" />}
                active={path === "/patient/careplan" ? true : false}
                className="text-decoration-none"
              >
                <Link to="/patient/careplan" style={{ color: "black" }}>
                  Careplan
                </Link>
              </MenuItem>
            )}
            {userInfo.role === "admin" && clinicItems()}
            {userInfo.role === "admin" && EnterpriseItems()}
            {(userInfo.role === "admin" || userInfo.role == "HeadPhysio") &&
              physioItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              pateintItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              episodeItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              schedulingItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              assessmentItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              notesItems()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              carePlanItem()}
            {(userInfo.role === "physio" ||
              userInfo.role === "admin" ||
              userInfo.role == "HeadPhysio") &&
              Invoice()}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};
export default SideNavBar;
