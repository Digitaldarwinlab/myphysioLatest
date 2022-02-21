import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./../../styles/Layout/Navbar.css";
import DropDownMenu from './DropDownMenu/DropDownMenu';
import { Dropdown, Menu ,Row,Col} from 'antd';
import MyPhysioLogo from './../UtilityComponents/MyPhysioLogo';
import { GoCalendar } from "react-icons/go";
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaWindowClose} from 'react-icons/fa'

import {IoMdVideocam} from 'react-icons/io'
const Navigationbar = (props) => {
//	console.log(props)
	const [showMenu, setShowMenu] = useState(false);
	const [showToggleMenu, setShowToggleMenu] = useState(false);
	const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio", info: { first_name: "User" } };
	const [disCamSelection ,setDisCamSelection ] = useState(false)
	const LogoutMenu = () => {
		return (
			<Menu className="dropDownMenu UserDropDown">
				{userInfo.role === "admin" && (
					<Menu.Item
						key="1" style={{ borderTop: "0px solid black" }}>
						<Link to="#Myprofile" className="text-secondary text-decoration-none">
							My Profile
						</Link>
					</Menu.Item>
				)}
				{(userInfo.role !== "admin" && userInfo.role !== "physio") && <Menu.Item
					key="2" style={{ borderTop: "0px solid black" }}>
					<Link to="/patient/profile" className="text-secondary text-decoration-none">
						My Profile
					</Link>
				</Menu.Item>}
				<Menu.Item
					key="2" style={{ }}>
					<Link to="/logout" className="text-secondary text-decoration-none">
						LogOut
					</Link>
				</Menu.Item>
			</Menu>
		)
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg sticky-top navigationBar">
				
				<Dropdown overlay={<DropDownMenu classname="navbar-toggler" id="navbar-toggler" getCurrentPath={props.getCurrentPath} />}
					className="navbar-toggler" type="button"  id="navbar-toggler"
					trigger={['click']}>
					<a className="ant-dropdown-link text-white border" onClick={e => {
						setShowToggleMenu(!showToggleMenu)
						e.preventDefault()
					}}>
						<AiOutlineMenu style={{ fontSize: "20px" }} className="navbar-toggler-icon" />
					</a>
				</Dropdown>
				
				{userInfo.role =='admin' || userInfo.role=='physio'
				?

				<Menu className={`d-md-inline  hamburgerMenu `} style={margin}} id="hamburgerMenu" >
					{/* aswin 10/27/2021 start */}
					<Menu.Item key="1" className="ant-menu-item-selected" style={{backgroundColor:'transparent',color:'white'}} onClick={() => { props.SideNavbarCollpased() }}>
						{/* aswin 10/27/2021 stop */}
                {props.isSideNavbarCollpased
                    ? <GiHamburgerMenu style={{marginTop:'5px'}} size={25}  />
                    : <GiHamburgerMenu  style={{marginTop:'5px'}} size={25} />}
            </Menu.Item>
			</Menu>
			:

			null

				}
		
			
			
			<Link style={{position:'relative',top:'0px'}}  to={(userInfo.role === "physio" || userInfo.role === "admin") ? "/dashboard" : "/patient/dashboard"}
					className="navbar-brand text-white text-decoration-none">
					<MyPhysioLogo page='dashboard'  />
					
				</Link>
				
			
			
				<div className="d-inline-flex p-2 text-white navigationMenu topScheduleIcon" >
				{(userInfo.role !== "admin" && userInfo.role !== "physio")
						? (
							
							<Link to="/patient/schedule">
								<h4 className="text-white me-3 "><GoCalendar />{" "}Schedule</h4>
							</Link>)
						:<> <Dropdown disabled={disCamSelection} overlay={<DropDownMenu setDisCamSelection={setDisCamSelection} setShowMenu={setShowMenu} showMenu={showMenu} getCurrentPath={props.getCurrentPath} />} trigger={['click']}>
						{/* : (<Dropdown overlay={<Devices />} trigger={['click']}> */}
							<a className="ant-dropdown-link text-white" onClick={e => {
								setShowMenu(prev => !prev)
								e.preventDefault()
							}}>
								<IoMdVideocam />
								{/* {!showMenu ? <IoMdArrowDropdown size={25} /> : <IoMdArrowDropup size={25} />} */}
							</a>
						</Dropdown> </>
						//:<Devices />
					}

					<div>
						<Dropdown overlay={LogoutMenu()}
							type="button"
							trigger={['hover']}>
							<a style={{position:'relative',bottom:'0px'}} className="ant-dropdown-link text-white" onClick={e => {
								e.preventDefault()
							}}>
								<CgProfile style={{ margin: "auto 10px 0px", fontSize: "26px", marginTop:'0px' }} />	Hello {userInfo.info.first_name}
							</a>
						</Dropdown>   
					</div>
				</div>
				
			</nav>
		</>
	)
}
export default Navigationbar;