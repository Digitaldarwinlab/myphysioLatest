import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DAY_DATE } from '../actions/types';
import { GetClinicVisits, getEndDate, GetVisit } from "../../../API/Visit/visitApi"
import { Calendar, Badge } from 'antd';
import moment from 'moment';

export default function Month({ setIsVisible, month,setMonth}) {
  const dispatch = useDispatch()

  let MonthTag = useSelector(state => state.Calender.date);

  const [select, setSelect] = useState(moment())

  let val = useSelector(state => state.month.data);

  useEffect(() => {
    setSelect(val)
  }, [val])

  const onSelect = (value) => {
    dispatch({
      type: DAY_DATE,
      payload: { dayData: value },
    })

    dispatch({
      type: 'VISIT_DATE',
      payload: { date: value },
    })
    setMonth(moment(value, "DD/MM/YYYY"));
    setSelect(value)
    setIsVisible(true)
  }

  let exactDate = moment(MonthTag.date).format('D')
  let exactMonth = moment(MonthTag.date).format('M')
  const [data, setData] = useState([]);

  // console.log(MonthTag.patient)
  // function getListData(value) {

  //   let listData;

  //   switch (value.date()) {

  //     case  parseInt(exactDate):
  //       listData = [
  //         {  content: MonthTag.patient },
  //       ];
  //       break;


  //     default:
  //   }
  //   return listData || [];
  // }

  const parseVisits = (visits) => {
    console.log(visits);
    let newVisits = [];
    for (let i = 0; i < visits.length; i++) {

      let newData = {};
      newData["episode"] = visits[i].pp_ed_id;
      newData["created_by"] = visits[i].created_by;
      newData['days'] = visits[i].days;
      newData['isRepeat'] = visits[i].isRepeat;
      newData['occurence'] = visits[i].occurence;
      newData["id"] = visits[i].pp_vd_id;
      newData["visit_number"] = visits[i].visit_number;
      newData["complaint"] = visits[i].visit_type;
      newData["notes"] = visits[i].notes;
      newData["status"] = visits[i].status;
      newData["location"] = visits[i].location;
      newData["video_link"] = visits[i].video_link ? visits[i].video_link : "";
      newData["startDate"] = visits[i].appointment_detail.startDate;
      newData['startTime'] = visits[i].appointment_detail.start_time
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
      } else {
        newData['patient'] = visits[i].appointment_detail.patient
      }
      newVisits.push(newData);
    }
    return newVisits;
  }

  const handleVisitClick = (data) => {
    //         allDay: false
    // complaint: "Check Up"
    // duration: "15 minutes"
    // endDate: Mon May 16 2022 08:45:00 GMT+0530 (India Standard Time) {}
    // episode: 224
    // id: 484
    // location: "Clinic"
    // notes: "NO Notes"
    // patient: "Gaurav Srivastava 242"
    // startDate: "2022-05-16T03:00:00.000Z"
    // startTime: "08:30:00"
    // status: "Pre-Operation"
    // video_link: ""
    // visit_number: 2
    console.log(data);

    // dispatch({type:'NAME',payload:{name:data.patient}})

    //     dispatch({type:'EPISODE_ID',payload:{episode:data.episode}})
    //   dispatch({type:'VISIT_TYPE',payload:{visitType:data.complaint}})

    //   dispatch({type:'VISIT_ID',payload:{id:data.id}})

    //   dispatch({type:'VISIT_DATE',payload:{date:moment(new Date(data.startDate))}})


    //   dispatch({type:'DURATION',payload:{duration:data.duration}})

    //   dispatch({type:'VISIT_STATUS',payload:{status:data.status}})

    //   dispatch({type:'LOCATION',payload:{location:data.location}})

    //   dispatch({type:'NOTES',payload:{notes:data.notes}})

    //   dispatch({type:'VISIT_NUMBER',payload:{visit_number:data.visit_number}})

    //   dispatch({type:'OCCURENCE',payload:{occurence:data.occurence}})

    //   dispatch({type:'IS_REPEAT',payload:{isRepeat:data.isRepeat}})

    // dispatch({type:'CREATED_BY', payload:{created_by:data.created_by}})

  }

  useEffect(() => {
    const getVisits = async () => {
      const responseData = await GetVisit();
      const showVisits = parseVisits(responseData);
      console.log(showVisits)
      setData(showVisits)
    }
    let role = JSON.parse(localStorage.getItem("user"))
    const getClinicVisits = async () => {
      const responseData = await GetClinicVisits(role.clinic_id);
      const showVisits = parseVisits(responseData);
      // console.log(showVisits)
      setData(showVisits)
    }
    if (role.role == "admin") {
      console.log("role is ", role.role)
      getVisits();
    } else {
      console.log("role is ", role.role)
      getClinicVisits()
    }
    // let role = JSON.parse(localStorage.getItem("user"))
    // // console.log(role)
    // const getClinicVisits = async () => {
    //   console.log(role)
    //     const responseData = await GetClinicVisits(role.clinic_id);
    //     const showVisits = parseVisits(responseData);
    //     setData(showVisits)
    // }

    // getClinicVisits(role)

  }, [])

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  function getListData(value) {
    // console.log(value.month());
    const listData = data.filter(d => month.toDate().getMonth() === new Date(d.startDate).getMonth() && new Date(d.startDate).getDate() === value.date())
    if (value.month() == data.startDate) {
      const date = new Date('01/25/2015');
      console.log('From Month Tabb...', value, value.month(), date.getMonth())
      // console.log(value.date());
      // switch (value.date()) {
      //   case 8:
      //     listData = [
      //       { type: 'warning', content: 'This is warning event.' },
      //       { type: 'success', content: 'This is usual event.' },
      //     ];
      //     break;
      //   case 10:
      //     listData = [
      //       { type: 'warning', content: 'This is warning event.' },
      //       { type: 'success', content: 'This is usual event.' },
      //       { type: 'error', content: 'This is error event.' },
      //     ];
      //     break;
      //   case 15:
      //     listData = [
      //       { type: 'warning', content: 'This is warning event' },
      //       { type: 'success', content: 'This is very long usual event。。....' },
      //       { type: 'error', content: 'This is error event 1.' },
      //       { type: 'error', content: 'This is error event 2.' },
      //       { type: 'error', content: 'This is error event 3.' },
      //       { type: 'error', content: 'This is error event 4.' },
      //     ];
      //     break;
      //   default:
      // }
    }
    // console.log('List DAta',listData);
    return listData || [];
  }
  function disabledDate(current) {
    return current < moment().endOf('day');
  }
  function dateCellRender(value) {
    // console.log(value);
    const listData = getListData(value);
    console.log(listData)
    return (
      <ul style={{ padding: 0, overflow: 'hidden' }}>
        {<li style={{ textAlign: 'center' }}><span style={{ backgroundColor: 'transparent', border: 'none', color: 'black', fontWeight: '600' }} className='month_data'>{listData.length === 0 ? '' : listData.length}</span></li>}
        {/* { listData.map(item => (
          <li key={ Math.random()}  style={{marginBottom:'5px'}}>
             <button key={item.id} className='month_data' onClick={() => {handleVisitClick(item)}}>
             {item.patient || "This is event"} </button>
      
          </li>
        ))} */}
      </ul>
    );
  }
  console.log(select)
  return (
    <>
      <Calendar locale={{
        lang: {
          locale: 'en',
          dayFormat: moment.updateLocale('en', {
            weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          })
        }
      }} disabledDate={disabledDate} onSelect={onSelect} value={select} dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
    </>
  )
}
