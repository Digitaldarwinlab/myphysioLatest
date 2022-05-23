import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Tabs, notification, message, Button, Alert } from 'antd';
import { ImPlus } from 'react-icons/im';
// import Episodes from './episodes/Episodes';
// import Visits from './visits/visit';
import { useSelector, useDispatch } from "react-redux";
import ActiveSearch from "../../components/UtilityComponents/ActiveSearch"
import { useHistory } from 'react-router-dom';
import Patient from '../episode-visit-details/Patient-Details/Patient-Detail';
import { getPatientList, Patient_profile } from './../../API/PatientRegistration/Patient';
import { EPISODE_CLEAR_STATE } from "../../contextStore/actions/episode";
import { searchOrganizations } from "../../API/Enterprise/Enterprise";
import { useCallback } from "react";
import axios from "axios";
// import Assesment1 from './../Assesment/Assesment1';
// import AssessmentList from "./Assessment/AssessmentList";
// import Prescriptions from './Prescreptions/Prescreption';
// import { getEpisodeDetails } from "./../care-plan/carePlanIndex";
// import Careplan from './../care-plan/carePlanIndex';
// import Notes from './Notes.js';
import CarePlanView from '../episode-visit-details/carePlanView/carePlanView';
import CarePlanViewEnterprise from "../episode-visit-details/carePlanViewEnterprise/carePlanView"
import '../../styles/Layout/Heading.css'
// import Tempdashboard from "./PatientGraph/Tempdashboard";
// import Exercise from './ExerciseDetail/Exercise'
{/* aswin start 10/30/2021 stop */}
import { getEpisode } from "../../API/Episode/EpisodeApi";
import Error from "../UtilityComponents/ErrorHandler";
import { VALIDATION } from "../../contextStore/actions/authAction";
import {STATECHANGE}  from '../../contextStore/actions/Assesment'
import { EPISODE_STATECHANGE } from "../../contextStore/actions/episode";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Qa from "../../EnterpriseNew/QA/Qa";
//import  checkEpisodeId  from "./checkEpisodeId";
const { TabPane } = Tabs;
const pp='asas'

const EmployeeDashborad = () => {
    const episodeRef = useRef(null);
    const episodeDetail=useSelector(state=>state)
    const history = useHistory();
    const checkEpisodeId = async () => {
        if(episodeDetail.episodeReducer.patient_code){
            const res = await getEpisode(episodeDetail.episodeReducer.patient_code)
            if(res.length===0){
                dispatch({ type: "EPISODE_CHECK", payload: "patient don't have an episode" });
                setTimeout(() => {
                    dispatch({type:"NOERROR"})
                }, 10000);
                return false;
            }
            if(res[0].end_date.length===0){
                return true;
            }
            // notification.warning({
            //     message: "Patient don't have an open episode",
            //     placement: 'topRight',
            //     duration: 10,
            //     key:1,
            //     style: {
            //         marginTop: '10vh',
            //       },
            //     btn:<Button size="small" onClick={() => {
            //         history.push('/add-episode') 
            //         notification.close(1)
            //       }}>
            //       Add-episode
            //     </Button>,
            // })
            dispatch({ type: "EPISODE_CHECK", payload: "patient don't have open an episode"  });
            setTimeout(() => {
                dispatch({type:"NOERROR"})
            }, 10000);
            return false;
           // message.error("Patient don't have an open episode");
          //  setTimeout(function(){ history.push('/add-episode'); }, 5000);
        }else{
            // notification.warning({
            //     message: "Please select a patient",
            //     placement: 'bottomLeft',
            //     duration: 5,
            //     style:'margin-top:20px'
            // });
            dispatch({ type: "EPISODE_CHECK", payload: "Please select a patient"  });
            setTimeout(() => {
                dispatch({type:"NOERROR"})
            }, 3000);
            return false;
        }
    }
    //aswin 10/30/2021 start
    const [org,setOrg] = useState('');
    const [employee,setEmployee]=  useState('');
  const [employees, setEmployees] = useState([]);
  const [showEmployees,setShowEmployees] = useState([]);
     const [organizations, setOrganizations] = useState([]);
    const state = useSelector(state => state.episodeReducer);
    const orgState = useSelector(state => state.organizationReducer);
    console.log(state);
    const carePlanState = useSelector(state => state.carePlanRedcucer)
    //  console.log(state)
    const dispatch = useDispatch();
    const [activetabindex,Setactivetabindex]=useState(history.location.state ? history.location.state.tab : '1 '  )
  // console.log('historyyy is : ' + history.location.state.tab + ' : '  + activetabindex)
//  console.log('history iss : ' +  activetabindex)
//console.log(history)   
    const [patId, setPatId] = React.useState(state.patient_code);
    const [change, setChange] = React.useState(true);
    const [viewState, setViewState] = React.useState({
        FirstName: "",
        MiddleName: "",
        LastName: "",
        dob: "",
        Gender: "",
        bloodType: "",
        MobileNo: "",
        WhatsAppNo: "",
        landline: "",
        Address: "",
        pincode: "",
        City: "",
        State: "",
        Country: "",
        EmergencyContact: "",
        Email: "",
        Facebook: "",
        LinkedIn: "",
        Allergies: "",
        MedicalHistory: "",
        FamilyHistory: ""
    });
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getEmployees = useCallback((org) => {
      
        dispatch({type:"ADD ORGANIZATION",org:org});
        setOrg('');
        setOrganizations([]);
      
        axios.post(process.env.REACT_APP_API + "/empolyee_list/", { id: org.pp_org_id ? org.pp_org_id : 500 }).then(res => {
         
          const data = res.data;
          setEmployees(data);
console.log(state.employee_code);
          if (state.employee_code && orgState.org.pp_org_id === org.pp_org_id) {
            let filtered = data.filter((val) => {
                return val.pp_em_id === state.employee_code
            });
            console.log(filtered[0]);
            updatePatientState(filtered[0]);
            setChange(!change);
            // setPatId(state.patient_code);
        }
         
        }).catch(err => console.log(err));
        
      },[state.employee_code])

    useEffect(() => {
        localStorage.setItem("care-plan-cart", JSON.stringify([]));
       
        async function getPatients() {
            let data = await getPatientList();
            if (state.patient_code) {
                let filtered = data.filter((val) => {
                    return val.pp_em_id === state.patient_code
                });
                console.log(filtered[0]);
                // updatePatientState(filtered[0]);
                setChange(!change);
                setPatId(state.patient_code);
            }
        }
        getPatients();
        getEmployees(orgState.org);
        // ['quest','pain1','special','pose','romAss'].map(key=>{
        //     dispatch({
        //         type: STATECHANGE,
        //         payload: {
        //           key,
        //           value:true
        //         }
        //       });
        // })
        // eslint-disable-next-line
    }, [getEmployees]);

    useEffect(() => {
        const unblock = () => {
            dispatch({type:EPISODE_CLEAR_STATE})
            console.log("Dispatching EPISODE_CLEAR_STATE");
        };
        return () => {
            unblock();
          };
    }, [history])
    //update Patient State 
    const updatePatientState = async (val) => {
        //Updating Care Plan Episode Details
    //    await  getEpisodeDetails(val, dispatch);

        setViewState({
            ...viewState,
            FirstName: val.first_name,
            MiddleName: val.middle_name,
            LastName: val.last_name,
            Gender: val.gender,
            bloodType: val.blood_group,
            MobileNo: val.mobile_no,
            landline: val.landline,
            WhatsAppNo: val.whatsapp_no,
            Address: val.Address_1, 
            pincode: val.pin,
            City: val.city,
            dob: val.dob,
            State: val.state,
            Country: val.country,
            EmergencyContact: val.emergence_contact,
            Email: val.email,
            Facebook: val.facebook,
            LinkedIn: val.linkedin,
            Allergies: val.allergy_detail,
            MedicalHistory: val.patient_medical_history,
            FamilyHistory: val.patient_Family_History
        });
    }
    // useEffect( async () => {
    //     let state = { ...history.location.state };
    //     // console.log("history loaction ",state)
    //     if(history.location.state){
    //         if(history.location.state.prevPath==='/visit')
    //         if(!isNaN(history.location.state.id)){
    //             const res = await Patient_profile(parseInt(history.location.state.id))
    //             // console.log("working ",res)
    //             updatePatientState(res)
    //             dispatch({
    //                 type: EPISODE_STATECHANGE,
    //                 payload: {
    //                     key: 'patient_main_code',
    //                     value: res.patient_code
    //                 }
    //             })
    //             dispatch({
    //                 type: EPISODE_STATECHANGE,
    //                 payload: {
    //                     key: 'patient_name',
    //                     value: res.first_name+" "+res.last_name
    //                 }
    //             })
    //             dispatch({
    //                 type: EPISODE_STATECHANGE,
    //                 payload: {
    //                     key: 'Patient_no',
    //                     value: res.mobile_no
    //                 }
    //             })
    //             dispatch({
    //                 type: EPISODE_STATECHANGE,
    //                 payload: {
    //                     key: 'patient_code',
    //                     value: res.pp_patm_id
    //                 }
    //             })
    //             history.replace({ ...history.location, state:{} })
    //            // window.history.location.state = {}
    //         }
    //     }
  
    //   }, []);
    const episodeClick = () => {
        
        history.push({
            pathname: "/add-episode",
            state: {
                patient: [{
                    patient_code: state.patient_code,
                    patient_name: state.patient_name,
                    Patient_no: state.Patient_no
                }]
            }
        })

        
    }
    // aswin 11/1/2021 start
    const handleClick = async () => {
        const res = await checkEpisodeId()
        if(res===true){
            return history.push({
                pathname: "/appointments",
                state: {
                    patient: [{ name: state.patient_name, code: state.patient_code }]
                }
            })
        }
    }

    
  const handlePrint = useReactToPrint({
    content: () => episodeRef.current,
  });

    const assesmentClick = async () => {
        const res = await checkEpisodeId()
        if(res===true){
        history.push({
            pathname: "/assessment/1",
            state: {
                patient: [{ code: state.patient_code }],

            }
        })
    }
}
    const prescriptionClick = async () => {
        const res = await checkEpisodeId()
        if(res===true){
            history.push({
                pathname: "/notes"
            })
        }
    }
    const carePlanClick = async () => {
        const res = await checkEpisodeId()
        if(res===true){
            history.push({
                pathname: "/care-plan"
            })
            return true;
        }
        return false;
    }

    const handleViewDashboard = (val) => {

        console.log(val);
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "employee_code",
                value: val.pp_em_id
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "patient_main_code",
                value: val.employee_code
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "patient_name",
                value: val.first_name + " " + val.last_name
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "Patient_no",
                value: val.mobile_no
            }
        });
      
        setEmployee('');
        setShowEmployees([]);
    }
    // aswin 11/1/2021 start
    //Header 
    const Header = () => {
        return (
            <React.Fragment>
                <div style={{ minHeight: "20px" }}></div>
                <Row>
                    <Col lg={4} md={14} sm={14} xs={24}>
                        <h3 className="fw-bold page-heading">
                            <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
                                onClick={() => { history.push('/enterprise/employee-list') }}
                                title="Go Back"
                                role="button"></i>
                             <b className="fw-bold"> Employee</b>
                        </h3>
                    </Col>
                    <Col lg={8} md={14} sm={14} xs={24}>
                    {orgState && <h4>Organization Name: <b>{orgState.org.org_name}</b></h4>}
                    </Col>
                   
                    <Col lg={6} md={10} sm={10} xs={24} style={{paddingRight:"20px"}}>
                        {/* <ActiveSearch carePlan={false} updatePatientState={updatePatientState} prescreption={false} /> */}
                        <input
          placeholder="Search Organization"
          onChange={onSearch}
          value={org}
     
          style={{ width: '100%' }}
        />
        <ul className="orgg-listing">
         { organizations.map(org => <li key={org.pp_org_id} onClick={()=>{  dispatch({type:"EPISODE_FULL_CLEAR_STATE"});getEmployees(org)}}>{org.org_name}</li>)}
        </ul>
               
                    </Col>
                    <Col lg={6} md={10} sm={10} xs={24}>
                        {/* <ActiveSearch carePlan={false} updatePatientState={updatePatientState} prescreption={false} /> */}
                        <input
          placeholder="Search Employee"
          onChange={onSearchEmployee}
          value={employee}
     
          style={{ width: '100%' }}
        />
        <ul className="orgg-listing">
         { showEmployees.map(emp => <li key={emp.pp_em_id} onClick={()=> handleViewDashboard(emp)}>{emp.first_name + " "+ emp.last_name}</li>)}
        </ul>
                        {}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    //Patient Detail
    const PatientDetails = () => {
        return (
            <Row className="pat_details_mobile" >
                <Col lg={6} md={6} sm={4} xs={24}>
                    <h3 className="fw-bold">Employee Details</h3>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24} >
                        <p className="fw-bold" ><strong>Employee Code : </strong> {state.patient_main_code}</p>
                    {/* <div className="border rounded " style={{maxHeight:'45px'}}>
                    
                    </div> */}
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                        <p className="fw-bold"> <strong>Employee Name :</strong> {state.patient_name}</p>
                    {/* <div className="border rounded " style={{maxHeight:'45px'}}>
                       
                    </div> */}
                </Col>
               {userInfo.role!='physio'&&<Col lg={6} md={6} sm={12} xs={24}>
                        <p className="fw-bold"><strong> Contact Number : </strong> {state.Patient_no} </p>
                </Col>}
            </Row>
        )
    }

    const onSearch = async (e) => {
        let val = e.target.value;
        setOrg(val);
        if(val.length == 0){
          setOrganizations([]);
          return;
         
        }
      
        const searchedData = await searchOrganizations(val);
        if (searchedData.message) {
         
          setOrganizations([]);
    
        } else {
           
          setOrganizations(searchedData);
         
    
        }
      }

        const onSearchEmployee = async (e) => {
        let val = e.target.value;
        setEmployee(val);
        if(val.length == 0){
        setShowEmployees([]);
          return;
         
        }
      
        setShowEmployees(employees.filter(emp =>  emp.first_name.toLowerCase().includes(val) || emp.last_name.toLowerCase().includes(val)))
      }
    const searchComponent = () => {
        return <Row>
            <Col md={12} sm={12} xs={12} >
        <input
          //   className="p-2 input-field my-3"
       
          placeholder="Search Organization"
          onChange={onSearch}
          value={org}
     
          style={{ width: '90%' ,marginRight:"10px"}}
        />
        <ul className="orgg-listing">
         { organizations.map(org => <li key={org.pp_org_id} onClick={()=>{getEmployees(org)}}>{org.org_name}</li>)}
        </ul>
      </Col>
        </Row>
    }

    const resizeIframe = () => {
        const frame = document.getElementById('physioDashboard')
        frame.style.height = frame.contentWindow.document.documentElement.scrollHeight + 'px';
    }
    //Tabs 
    const DetailTabs = () => {
        return (
            <div className="card card-container PatientDetails">
                <Tabs defaultActiveKey={activetabindex==2 ? '2' :  '1'} type="card" size="medium">
                    <TabPane 
                        tab={<div className="fw-bold ant-tabs-btn">Employee Details</div>}
                        key="1"
                    >

                        <Patient viewState={viewState} />
                    </TabPane>
                    <TabPane 
                        tab={<div className="fw-bold ant-tabs-btn">Assesment</div>}
                        key="2"
                    >
                        <Qa />
                       
                    </TabPane>
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Episodes</div>
                        }
                        key="2"
                    >
                        <Episodes handleClick2={episodeClick}  />
                    </TabPane> */}
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Visit</div>
                        }
                        key="3"
                    >
                        <Visits handleClick={handleClick} patId={patId} change={change} />
                    </TabPane> */}
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Assessment</div>
                        }
                        key="4"
                    >
                        aswin start 10/30/2021 start
                        <AssessmentList assesmentClick={assesmentClick} patientId={state.patient_code} />
                        aswin start 10/30/2021 stop
                    </TabPane> */}
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Prescription</div>
                        }
                        key="5"
                    >
                        aswin start 10/30/2021 start
                        <Prescriptions prescriptionClick={prescriptionClick} dashboard={true} eid={carePlanState.pp_ed_id} />
                        aswin start 10/30/2021 stop
                    </TabPane> */}
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Care Plan</div>
                        }
                        key="6"
                    >
                            <Button className="btncolor me-2" onClick={() => history.push('/enterprise/care-plan')}><ImPlus className="me-2" /> {"  "}Add</Button>
                            <CarePlanViewEnterprise carePlanClick={carePlanClick} eid={state.employee_code} searchBar={false} />
                        {/* aswin start 10/30/2021 start */}
                        {/* <CarePlanView carePlanClick={carePlanClick} eid={carePlanState.pp_ed_id} searchBar={false} /> */}
                        {/* aswin start 10/30/2021 stop */}
                    </TabPane>
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Notes</div>
                        }
                        key="7"
                    >
                        <Notes eid={carePlanState.pp_ed_id} />
                    </TabPane> */}
                    {/* <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn"  onClick={()=>{
                                console.log('params ',`${`http://3.110.147.171:8089/superset/dashboard/1/?standalone=true&physio_id=${localStorage.getItem('userId')}&patient_id=${carePlanState.patient_code}`}`)
                                let url = `${`http://3.110.147.171:8089/superset/dashboard/6/?standalone=true&patient_id=${carePlanState.patient_code}`}`
                                window.open(url,'_blank')
                            }} >Exercise Detail</div>
                        }
                        key="8"
                    >
                         <div style={{ margin: 50 }}>
	                        Always opens in new tab
                        </div> */}
                        {/* {console.log('params ',`${`http://13.127.176.250:8089/superset/dashboard/1/?standalone=true&physio_id=${localStorage.getItem('userId')}&patient_id=${carePlanState.patient_code}`}`)}
                        {process.env.NODE_ENV=="development"?  <iframe
                            width='100%'
                            height={screen.height}
                            className="iframeDashboard"
                            frameBorder="0"
                            id="physioDashboard"
                            src={`http://13.127.176.250:8089/superset/dashboard/1/?standalone=true&physio_id=${localStorage.getItem('userId')}&patient_id=${carePlanState.patient_code}`}
                            >
                        </iframe>:  <iframe
                            width='100%'
                            height={screen.height}
                            className="iframeDashboard"
                            frameBorder="0"
                            id="physioDashboard"
                            src={`http://13.127.176.250:8089/superset/dashboard/2/?standalone=true&physio_id=${localStorage.getItem('userId')}&patient_id=${carePlanState.patient_code}`}
                            >
                        </iframe>} */}
                    {/* </TabPane> */}
                </Tabs>
            </div>
        )
    }

    return (
        <div className="" style={{maxWidth:'100%',msOverflowX:'hidden'}} ref={episodeRef}>
            {Header()}
            <div className="rest">
                {/* aswin 11/15/2021 start */}
                {episodeDetail.Validation.episode_check==='failed'&&<Error error={episodeDetail.Validation.msg} />}
                {/* aswin 11/15/2021 start */}
            {/* <div style={{ minHeight: "20px" }}></div> */}
            {PatientDetails()}
            <div style={{ minHeight: "20px" }}></div>
            {DetailTabs()}
            </div>
           
        </div>
    )
}
export default EmployeeDashborad;