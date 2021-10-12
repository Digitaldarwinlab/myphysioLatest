import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Tabs } from 'antd';
import Episodes from './episodes/Episodes';
import Visits from './visits/visit';
import { useSelector, useDispatch } from "react-redux";
import ActiveSearch from "../../components/UtilityComponents/ActiveSearch"
import { useHistory } from 'react-router-dom';
import Patient from './Patient-Details/Patient-Detail';
import { getPatientList } from './../../API/PatientRegistration/Patient';
import Assesment1 from './../Assesment/Assesment1';
import AssessmentList from "./Assessment/AssessmentList";
import Prescriptions from './Prescreptions/Prescreption';
import { getEpisodeDetails } from "./../care-plan/carePlanIndex";
import Careplan from './../care-plan/carePlanIndex';
import Notes from './Notes.js';
import CarePlanView from './carePlanView/carePlanView';
import '../../styles/Layout/Heading.css'
import Tempdashboard from "./PatientGraph/Tempdashboard";
import Exercise from './ExerciseDetail/Exercise'
const { TabPane } = Tabs;
const pp='asas'

const EpisodeVisitDetails = () => {
    const episodeDetail=useSelector(state=>state)

    const history = useHistory();
    const state = useSelector(state => state.episodeReducer)
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

    React.useEffect(() => {
        async function getPatients() {
            let data = await getPatientList();
            if (state.patient_code) {
                let filtered = data.filter((val) => {
                    return val.pp_patm_id === state.patient_code
                });
                updatePatientState(filtered[0]);
                setChange(!change);
                setPatId(state.patient_code);
            }
        }
        getPatients();
        // eslint-disable-next-line
    }, []);
    //update Patient State 
    const updatePatientState = async (val) => {
        //Updating Care Plan Episode Details
       await  getEpisodeDetails(val, dispatch);

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

    const handleClick = () => {
        history.push({
            pathname: "/appointments",
            state: {
                patient: [{ name: state.patient_name, code: state.patient_code }]
            }
        })
    }

    const assesmentClick = () => {
        history.push({
            pathname: "/assessment/1",
            state: {
                patient: [{ code: state.patient_code }],

            }
        })
    }

    //Header 
    const Header = () => {
        return (
            <React.Fragment>
                <div style={{ minHeight: "20px" }}></div>
                <Row>
                    <Col lg={18} md={14} sm={14} xs={24}>
                        <h1 className="page-heading">
                            <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
                                onClick={() => { history.goBack() }}
                                title="Go Back"
                                role="button"></i>
                             <b> Patient</b>
                        </h1>
                    </Col>
                    <Col lg={6} md={10} sm={10} xs={24}>
                        <ActiveSearch carePlan={false} updatePatientState={updatePatientState} prescreption={false} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    //Patient Detail
    const PatientDetails = () => {
        return (
            <Row gutter={[10, 10]}>
                <Col lg={6} md={6} sm={4} xs={24}>
                    <h3 className="fw-bold">Patient Details</h3>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24} >
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p" ><strong>Patient Code : </strong> {state.patient_main_code}</p>
                    
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"> <strong>Patient Name :</strong> {state.patient_name}</p>
                       
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> Contact Number : </strong> {state.Patient_no} </p>
                        
                    </div>
                </Col>
            </Row>
        )
    }


    //Tabs 
    const DetailTabs = () => {
        return (
            <div className="card card-container PatientDetails">
                <Tabs defaultActiveKey={activetabindex==2 ? '2' :  '1'} type="card" size="medium">
                    <TabPane 
                        tab={<div className="fw-bold ant-tabs-btn">Patient Details</div>}
                        key="1"
                    >

                        <Patient viewState={viewState} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Episodes</div>
                        }
                        key="2"
                    >
                        <Episodes handleClick2={episodeClick}  />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Visit</div>
                        }
                        key="3"
                    >
                        <Visits handleClick={handleClick} patId={patId} change={change} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Assessment</div>
                        }
                        key="4"
                    >
                        <AssessmentList handleAssesment={assesmentClick} patientId={state.patient_code} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Prescription</div>
                        }
                        key="5"
                    >
                        <Prescriptions dashboard={true} eid={carePlanState.pp_ed_id} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Care Plan</div>
                        }
                        key="6"
                    >
                        <CarePlanView eid={carePlanState.pp_ed_id} searchBar={false} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Notes</div>
                        }
                        key="7"
                    >
                        <Notes eid={carePlanState.pp_ed_id} />
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="fw-bold ant-tabs-btn">Exerside Detail</div>
                        }
                        key="8"
                    >
                        <Tempdashboard viewstate={viewState}  />
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    return (
        <div className="ms-2 me-2" style={{maxWidth:'100%',msOverflowX:'hidden'}}>
            {Header()}
            <div className="rest">
            <div style={{ minHeight: "20px" }}></div>
            {PatientDetails()}
            <div style={{ minHeight: "20px" }}></div>
            {DetailTabs()}
            </div>
        </div>
    )
}
export default EpisodeVisitDetails;