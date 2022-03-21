/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import React, { useState, useEffect } from "react";
import { GoCalendar } from "react-icons/go";
import { ImPlus } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { Row, Col } from 'antd';
import Scheduler from 'devextreme-react/scheduler';
import Autocomplete from "devextreme/ui/autocomplete";
import notify from 'devextreme/ui/notify';
// import { getData,addData,UpdateData } from './../UtilityComponents/dummyData/calendarData.js';
import complaint from "./../UtilityComponents/dummyData/complaint.json";
import status from "./../UtilityComponents/dummyData/status.json";
import location from "./../UtilityComponents/dummyData/location.json";
import "../../../node_modules/devextreme/dist/css/dx.light.css";
import Appointment from './AppointmentView';
import AppointmentTooltip from './AppointmentToolTip';
import { Button } from 'antd';
import Loading from './../UtilityComponents/Loading';
import { getExercise, getPatientList } from "../../API/PatientRegistration/Patient.js";
import { AddVisit, GetVisit, UpdateVisit, getEndDate } from './../../API/Visit/visitApi';
import Error from './../UtilityComponents/ErrorHandler';
import Success from './../UtilityComponents/SuccessHandler';
import DataCell from "./../UtilityComponents/SchedularDataRender/DataCellRender.js";
import DateCell from './../UtilityComponents/SchedularDataRender/DateCellRender';
import { useSelector } from 'react-redux';
// import TimeCell from './../UtilityComponents/SchedularDataRender/TimCellRender';
import Utils from './../UtilityComponents/SchedularDataRender/Utils';
import './style.css'
import '../../styles/Layout/Heading.css'
import SchduleForm from "../UtilityComponents/SchduleForm";

export const parseVisits = (visits) => {
    let newVisits = [];
    for (let i = 0; i < visits.length; i++) {
        let newData = {};
        newData["episode"] = visits[i].pp_ed_id;
        newData["id"] = visits[i].pp_vd_id;
        newData["visit_number"] = visits[i].visit_number;
        newData["complaint"] = visits[i].visit_type;
        newData["notes"] = visits[i].notes;
        newData["status"] = visits[i].status;
        newData["location"] = visits[i].location;
        newData["video_link"] = visits[i].video_link ? visits[i].video_link : "";
        newData["startDate"] = visits[i].appointment_detail.startDate;
        if (!visits[i].appointment_detail.duration) {
            newData["endDate"] = new Date(new Date(visits[i].appointment_detail.startDate).getTime() + 15 * 60 * 1000);
        } else {
            newData["endDate"] = new Date(new Date(visits[i].appointment_detail.startDate).getTime() + getEndDate(visits[i].appointment_detail.duration))
        }
        let starting = new Date(visits[i].appointment_detail.startDate).getMinutes();
        let ending = new Date(newData["endDate"]).getMinutes();
        let diff = ending - starting;
        let duration;
        if (diff === 60) {
            duration = "1 hour";
        } else if (diff === 120) {
            duration = "2 hour";
        } else {
            duration = diff.toString() + " minutes";
        }
        newData["duration"] = visits[i].appointment_detail.duration ? visits[i].appointment_detail.duration : duration;
        newData["allDay"] = visits[i].appointment_detail.allDay ? visits[i].appointment_detail.allDay : false;
        if (visits[i].patient_datail && visits[i].patient_datail[0]) {
            let { first_name, last_name, pp_patm_id } = visits[i].patient_datail[0];
            newData["patient"] = first_name + " " + last_name + " " + pp_patm_id;
        }
        newVisits.push(newData);
    }
    return newVisits;
}

const Appointments = () => {
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [schedular, setSchedular] = useState(null);
    const [users, setusers] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const history = useHistory();
    const state=useSelector(state=>state)
    const today = new Date();
    //   const currentDate = (new Date()).toLocaleDateString();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //const currentDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    //  const currentDate = new Date(2021, 6, 2, 11, 30);
    const views = ['day', 'week', 'month'];

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        if (window.innerWidth <= 800) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        resizeWindow();
        const patientData = history.location.state;
        const loadUsers = async () => {
            const responseData = await getPatientList();
            const patientData = responseData.map((data, index) => data.first_name + " " + data.last_name + " " + data.pp_patm_id);
            setusers(patientData);
        }
        const getVisits = async () => {
            const responseData = await GetVisit();
            const showVisits = parseVisits(responseData);
            setData(showVisits)
        }
        getVisits();
        if (patientData && patientData.patient) {
            const info = patientData.patient.map((data, ind) => data.name + " " + data.code);
            setusers(info);
        } else {
            loadUsers();
        }

        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    
    const showNewAppointment = () => {
        // setModelShow(true);
        schedular.showAppointmentPopup(schedular);
    }

    //For Getting Episode Details 
    const fetchEpisodeDetail = async (patient) => {
        if (patient === "")
            return "";
        let id = patient.split(" ")[2];
        const response = await getExercise(parseInt(id));
        return response;
    }
    //notify
    function notifyDisableDate(message) {
        notify(message, 'warning', 2000);
    }
    //Schedular Form
    var channel=""
    const onAppointFormOpening = async (data) => {
      // 
        let startDate = data.appointmentData.startDate ? data.appointmentData.startDate : (new Date().toJSON());
        if (Utils.isValidDate(new Date(startDate))) {
            data.cancel = true;
            notifyDisableDate('Cannot create an appointment/event to disabled time/date regions.');
        }

        let form = data.form;
        console.log(history.location)
        data.popup.option("height", "100%");  
        data.popup.option("width", "auto");  
       
        data.popup.option("overflow", "hidden");  

        data.popup.option("margin", "auto");  
        form.option("showRequiredMark", true);
        var characters = 'abcdefghijklmnopqrstuvwxyz';

        const user_id=localStorage.getItem("userId")
        for(var i=0;i<4;i++){
            if(i==3){
                channel+="-"
                channel+=user_id
                channel+="-"
                channel+=state.episodeReducer.patient_code
                break
            }
            channel+=characters.charAt(Math.floor(Math.random()*characters.length))
        }
        let allDay = data.appointmentData.allDay ? data.appointmentData.allDay : false;
        let patientName = data.appointmentData.patient ? data.appointmentData.patient : null;
        let episodeName = data.appointmentData.episode ? data.appointmentData.episode : null;
        let endDate = data.appointmentData.endDate ? data.appointmentData.endDate : (new Date(new Date(startDate).getTime() + 1800000))
        let UpdationForm = data.appointmentData.id ? true : false;
        if (users.length === 1) {
            patientName = users[0];
            if (!episodeName)
                episodeName = await fetchEpisodeDetail(patientName);
        }
        form.option('padding','10px')
        form.option('items', [
            {
                colCountByScreen: { lg: 2, md: 2, sm: 2, xs: 1 },
                colSpan: 2,
                itemType: "group",
                items: [
                    {
                        label: {
                            text: "Select Patient"
                        },
                       // colSpan: 2,
                        name: "patient",
                        dataField: "patient",
                        isRequired: true,
                        editorType: "dxAutocomplete",
                        editorOptions: {
                            placeholder: "Search Patient..",
                            value: patientName,
                            dataSource: users,
                            readOnly: UpdationForm,
                            width: "100%",
                            itemTemplate: function (itemData) {
                                patientName = itemData;
                                return `${itemData}`;
                            },
                            // aswin 11/13/2021 start
                            onItemClick: async function(e){
                                console.log(e.itemData)
                                let value = await fetchEpisodeDetail(e.itemData);
                                episodeName = value;
                                form.updateData("episode", value);
                            }
                            // aswin 11/13/2021 stop
                        }
                    },
                    {
                        label: {
                            text: "Episode"
                        },
                     //   colSpan: 2,
                        name: "episode",
                        dataField: "episode",
                        isRequired: true,
                        editorType: "dxAutocomplete",
                        //visible: !UpdationForm,
                        visible: true,
                        editorOptions: {
                            placeholder: "Episode..",
                            value: episodeName,
                            dataSource: episodes,
                            readOnly: true,
                            width: "95%",
                            itemTemplate: function (itemData) {
                                return `${itemData}`;
                            }
                        }
                    },
                    {
                        label: {
                            text: "From Time"
                        },
                        name: 'startDate',
                        dataField: 'startDate',
                        editorType: "dxDateBox",
                        isRequired: true,
                        editorOptions: {
                            width: "100%",
                            height:'80%',
                            type: "datetime",
                            value: startDate,
                            min: new Date(),
                            onValueChanged: function (args) {
                                startDate = new Date(args.value);

                            }
                        }
                    }, {
                        label: {
                            text: "End Time"
                        },
                        name: 'endDate',
                        dataField: 'endDate',
                        editorType: 'dxDateBox',
                        isRequired: true,
                        visible: false,
                        editorOptions: {
                            width: "95%",
                            isRequired: true,
                            value: endDate,
                            type: 'datetime',
                            min: new Date(startDate),
                            onValueChanged: function (args) {
                                if (new Date(args.value) < new Date(startDate)) {
                                    notify("End Time can't be greater than Start Time.");
                                    form.updateData("endDate", new Date(new Date(startDate).getTime() + 1800000));
                                }
                                if (Date.parse(args.value) < Date.parse(startDate)) {
                                    notify("End Time can't be smaller than Start Time.");
                                    form.updateData("endDate", new Date(new Date(startDate).getTime() + 1800000));
                                }
                            }
                        }
                    },
                    {
                        label: {
                            text: "Duration"
                        },
                        name: 'duration',
                        dataField: 'duration',
                        editorType: 'dxSelectBox',
                        isRequired: true,
                        editorOptions: {
                            width: "95%",
                            items: ["15 minutes", "30 minutes", "45 minutes", "1 hour", "75 minutes", "90 minutes", "105  minutes", "2 hour"],
                            onValueChanged: function (args) {
                                if (!args.value) {
                                    //console.log("Hello")
                                } else {
                                    let value = args.value.split(" ");
                                    if (value[1] === "hour")
                                        form.updateData("endDate", new Date(new Date(startDate).getTime() + parseInt(value[0]) * 60 * 60 * 1000));
                                    else
                                        form.updateData("endDate", new Date(new Date(startDate).getTime() + parseInt(value[0]) * 60 * 1000));
                                }
                            }
                        }
                    }, {
                        label: {
                            text: "Visit Type"
                        },
                        editorType: "dxSelectBox",
                        dataField: "complaint",
                        isRequired: true,
                        editorOptions: {
                            width: "100%",
                            items: complaint,
                            onValueChanged: function (args) {
                                // console.log(args.value);
                            }
                        }
                    }, {
                        label: {
                            text: "Status"
                        },
                        editorType: "dxSelectBox",
                        dataField: "status",
                        colSpan: 2,
                        isRequired: true,
                        editorOptions: {
                            width: "95%",
                            items: status,
                            onValueChanged: function (args) {
                                // console.log(args.value);
                            }
                        }
                    }, {
                        label: {
                            text: "Location"
                        },
                        editorType: "dxSelectBox",
                        dataField: "location",
                        isRequired: true,
                        editorOptions: {
                            items: location,
                            onValueChanged: function (args) {
                                // console.log(args.value);
                            }
                        }
                    },
                    {
                        label: {
                            text: "Add Video Confrences"
                        },
                        name: "video_link",
                        editorType: "dxTextBox",
                        dataField: "video_link",
                        isRequired: false,
                        editorOptions: {
                            width: "95%",
                            placeholder: "https://drive.in/...",
                            value: channel,
                            onValueChanged: function (args) {
                                console.log(args);
                            }
                        }
                    },
                    {
                        label: {
                            text: "Notes"
                        },
                        colSpan: 2,
                        editorType: "dxTextArea",
                        dataField: "notes",
                        editorOptions: {
                            width: "98%",
                            height:'45px',
                            onValueChanged: function (args) {
                                // console.log(args.value);
                            }
                        }
                    }, {
                        colCountByScreen: { lg: 3, xs: 3 },
                        itemType: "group",
                        visible:true,
                        items: [{
                            cssClass: "dx-appointment-form-switch",
                            colSpan: 2,
                            label: { text: "All Day", location: "right" },
                            dataField: "allDay",
                            editorType: "dxSwitch",
                            visible: false,
                            editorOptions: {
                                onValueChanged: function (args) {
                                    allDay = args.value;

                                    if (args.value) {
                                        form.updateData("endDate", new Date(new Date(startDate).getTime() + 86400000))
                                    }
                                }
                            }
                        }, {
                            cssClass: "dx-appointment-form-switch",
                            dataField: "repeat",
                            colSpan: 2,
                            editorType: "dxSwitch",
                            label: { text: "Repeat", location: "right" },
                            editorOptions: {
                               
                                onValueChanged: function (args) {
                                    form.itemOption("recurrenceGroup", "visible", args.value);
                                    form.updateData("patient", patientName)
                                    form.updateData("episode", episodeName)
                                    if (args.value) {
                                        form.updateData("recurrenceRule", "FREQ=DAILY;INTERVAL=1")
                                    } else {
                                        form.updateData("recurrenceRule", "")
                                    }
                                }
                            }
                        }]
                    }],
                name: "mainGroup"
            }, {
                colSpan: 2,
                itemType: "group",
                items: [{
                    dataField: "recurrenceRule",
                    editorType: "dxRecurrenceEditor",
                    editorOptions: {
                        width: "98%",
                        
                        onValueChanged: function (args) {
                        }
                    }
                }],
                name: "recurrenceGroup",
                visible: false
            }
        ]);
        if (UpdationForm)
            data.popup.option("toolbarItems[0].options.text", "Update");
        else
            data.popup.option("toolbarItems[0].options.text", "Submit");
    }
     //method for adding visit
    const onAppointmentAdded = async (e) => {
    //   console.log('add app')
        setLoading(true);
        if(e.appointmentData.location!=='Video Conference'){
            e.appointmentData.video_link=''
        }
        const result = await AddVisit(e.appointmentData);
        setLoading(false);
        if (result && result[0]) {
            setSuccess("Visit Added Successfully.");
            history.push({
                pathname:'/dashboard',
                state:{
                    id:state.episodeReducer.patient_code,
                    prevPath:'/visit'
                }
               })
           // window.location.reload();
        } else {
           
            setError(result[1]);
        }
        
    }
     //method for updating visit
     const onAppointmentUpdated = async (e) => {
        // console.log('update app')
       //  console.log(e)
       setLoading(true);
       console.log("update appointment data ",e.appointmentData)
       if(e.appointmentData.location==='Video Conference'){
        e.appointmentData.video_link = channel
    }
       console.log("update channel" ,channel)
       if(e.appointmentData.id){
         const result = await UpdateVisit(e.appointmentData);
         setLoading(false);
         if (result && result[0]) {
             setSuccess("Visit Updated Successfully.");
               history.push({
                 pathname:'/dashboard',
                 state:{
                     id:state.episodeReducer.patient_code,
                     prevPath:'/visit'
                 }
                })
           //  window.location.reload();
         } else {
           
             setError(result[1]);
         }
       }else{
           onAppointmentAdded(e)
       }
         // e.component.getDataSource().reload();
     }

    const onContentReady = (e) => {
        setSchedular(e.component);
    }


    //Function For Disabling prevouos date/time
    const DataCellRender = (itemData) => {
        return (<DataCell itemData={itemData} />)
    }
    const DateCellRender = (itemData) => {
        return (<DateCell itemData={itemData} />)
    }
    //
    return ( 
        <Profiler
              id="AuthForm"
              onRender={(
                id,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions
              ) => {
                console.log(id);
                console.log(actualDuration);
                console.log(baseDuration);
                console.log(startTime);
                console.log(commitTime);
                console.log(interactions);
              }}
            ></Profiler>
        <>
            <div style={{ background: '#fff', marginTop: '15px' }}>
                <div style={{ minHeight: "20px" }}></div>
                <Row>
                    <Col xs={24} sm={12} md={12} lg={16} xl={16}>
                         <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
            onClick={() => { history.goBack() }}
            title="Go Back"
            role="button"></i>
                        <h3 className="page-heading"><GoCalendar style={{position:"relative",bottom:'3px'}} />{" "}<b>Visits</b></h3>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} className="text-end">

                        <Button
                            className="border text-white"
                            style={{ backgroundColor: "#273647",borderRadius:'10px', marginBottom:'20px', marginRight:'20px' }}
                            onClick={showNewAppointment}>
                            <ImPlus style={{marginRight:'5px',position:'relative',bottom:'2px'}} />New Visit
                        </Button>
                    </Col>
                </Row>
            </div>
            {error && <Error error={error} />}
            {success && <Success success={success} />}
            <Col span={24}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Scheduler
                        timeZone="Asia/Kolkata"
                        dataSource={data}
                        defaultCurrentView="day"
                        height={'100%'}
                        width={'100%'}
                        views={views}
                        startDayHour={7}
                        endDayHour={24}
                        dataCellRender={DataCellRender}
                        dateCellRender={DateCellRender}
                        appointmentComponent={Appointment}
                        onAppointmentFormOpening={onAppointFormOpening}
                        appointmentTooltipComponent={AppointmentTooltip}
                        onAppointmentAdded={onAppointmentAdded}
                        onAppointmentUpdated={onAppointmentUpdated}
                        adaptivityEnabled={visible}
                        recurrenceRuleExpr="recurrenceRule"
                        useDropDownViewSwitcher={visible}
                        onContentReady={onContentReady}
                        min={currentDate}
                    >
                    </Scheduler>
                )}
            </Col>
        </>
    )
}

export default Appointments;