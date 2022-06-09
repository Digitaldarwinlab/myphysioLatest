import { useEffect, useMemo, useState } from 'react';

//moment.js
import moment from 'moment';
import 'moment/locale/zh-cn';
//redux
import { useDispatch, useSelector } from "react-redux";
import { ADD_VISIT } from '../actions/types';
import { getPhysio } from "../../../API/Physio/PhysioRegister";
//import ant design
import { Modal, Button, Row, Col, Form, Input, Select, Switch, InputNumber, Radio } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import PatientSearch from '../../UtilityComponents/PatientSearch';
import SelectDay from './SelectDay';
import { getExercise } from '../../../API/PatientRegistration/Patient';
import axios from 'axios';
import { Decode, Encode } from '../../../Encode/hashing';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ImPlus } from 'react-icons/im';


const Model = ({ isVisible, setIsVisible, setError, setSuccess }) => {
  const episodeState = useSelector(state => state.episodeReducer);
  console.log(episodeState);

  const days = useMemo(() => {
    return [
      "sunday", "monday", "tuesday", "wednesday", "thrusday", "friday", "saturday"
    ]
  }, [])
  const reducerData = useSelector(state => state.Calender);
  const dayValue = useSelector(state => state.dayReducer.data);
  const today = new Date().getDay()
  const [addVideo, setAddVideo] = useState(false);
  const dispatch = useDispatch();
  const [activeDays, setActiveDays] = useState([days[today]]);
  const [repeat, setRepeat] = useState('Weekly');
  const [occurences, setOccurences] = useState(1);
  const [episode, setEpisode] = useState('');
  const [videoLink, setvideoLink] = useState('');
  const [show, setShow] = useState(reducerData.isRepeat);
  const history = useHistory();

  console.log(reducerData);


  const [data, setData] = useState({
    patient: episodeState.patient_name,
    pp_ed_id: episodeState.patient_code,
    episode: episodeState.patient_code,
    date: moment(dayValue),
    duration: '',
    visitType: '',
    status: '',
    location: '',
    link: '',
    notes: '',
  });

  console.log(activeDays);

  if (data.date._d) {
    console.log((data.date._d.toISOString().slice(11, 19)));
    console.log((data.date.toISOString()))
  }


  useEffect(async () => {
    if (episodeState.patient_code) {
      let channel = ''
      const user_id = localStorage.getItem("userId")
      const response = await getExercise(parseInt(episodeState.patient_code));
      setEpisode(response)
      var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const physioDetails = await getPhysio(user_id)
      if (physioDetails != "") {
        const physio_id = physioDetails[0].uid
        channel += physio_id + "-"
      }
      else {
        channel += user_id + "-"
      }
      const patient_id = episodeState.patient_main_code
      channel += patient_id + "-"
      for (var i = 0; i < 7; i++) {
        if (i == 6) {
          channel += "_"
          channel += user_id
          channel += "_"
          channel += episodeState.patient_code
          break
        }
        channel += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      // dispatch({type:'EPISODE_ID',payload:{episode:response}})
      console.log('From Visittt', response)
      setData(data => ({ ...data, patient: episodeState.patient_name, episode: response, pp_ed_id: episodeState.patient_code, link: channel }))

    }
    else {
      setEpisode('')
    }
  }, [episodeState, dispatch])


  useEffect(() => {
    if (!show) {
      setActiveDays([days[today]]);
    }
  }, [show, days])

  console.log("occurences", occurences);

  const changeTime = (time) => {
    let hours = +time.slice(0, 2) + 5;
    let min = time.slice(3, 5);
    console.log('MInutes and Hours', hours, min);

    if (min == 30) {
      hours = hours + 1;
      min = '00';
    } else if (min == 15) {
      min = '45';
    } else if (min == 45) {
      hours = hours + 1;
      min = '15'
    } else {
      min = 30;
    }


    if (hours.length === 1) {
      hours = '0' + hours.toString();
    }
    let finalTime = hours.toString() + ':' + min + ':00'


    if (finalTime.length == 7) return '0' + finalTime;

    return finalTime
  }

  //radio ant design
  const { Option } = Select;

  const showModal = () => {


    setIsVisible(true);
  };

  const handleOk = () => {
    // dispatch({ type: 'CLEAR_VISIT' })
    setEpisode('')
    setIsVisible(false);
  };

  const handleChange = (value, name) => {
    if (name === 'location') {
      if (value === 'Video-confrence') {
        setAddVideo(true);
      } else {
        setAddVideo(false);
      }
    }
    if (name == 'visitType') {
      dispatch({ type: 'VISIT_TYPE', payload: { [name]: value } })
    }
    if (name == 'episode') {
      dispatch({ type: 'EPISODE_ID', payload: { episode: data.episode } })
    }
    if (name == 'date') {
      dispatch({ type: 'VISIT_DATE', payload: { [name]: value } })
    }
    if (name == 'duration') {
      dispatch({ type: 'DURATION', payload: { [name]: value } })
    }
    if (name == 'status') {
      dispatch({ type: 'VISIT_STATUS', payload: { [name]: value } })
    }
    if (name == 'location') {
      dispatch({ type: 'LOCATION', payload: { [name]: value } })
    }
    if (name == 'notes') {
      dispatch({ type: 'NOTES', payload: { [name]: value } })
    }

    setData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data) {
      if (data.patient && data.duration && data.episode && data.date && data.location) {

        const userId = JSON.parse(localStorage.getItem('userId'));
        let payload
        if (show) {
          payload = {
            pp_ed_id: data.episode,
            visit_type: data.visitType,
            notes: data.notes,
            status: data.status,
            video_link: data.location === 'Video-confrence' ? data.link : '',
            appointment_detail: {
              patient: data.patient,
              startDate: data.date._d.toISOString(),
              start_time: changeTime(reducerData.date._d.toISOString().slice(11, 19)),
              duration: data.duration
            },
            location: data.location,
            isRepeat: 1,
            repeat: "weekly",
            days: activeDays,
            occurence: occurences,
            created_by: userId
          }
        } else {
          payload = {
            pp_ed_id: data.episode,
            visit_type: data.visitType,
            notes: data.notes,
            status: data.status,
            video_link: data.location === 'Video-confrence' ? data.link : '',
            appointment_detail: {
              patient: data.patient,
              startDate: data.date._d.toISOString(),
              start_time: changeTime(reducerData.date._d.toISOString().slice(11, 19)),
              duration: data.duration
            },
            location: data.location,
            isRepeat: 0,
            created_by: userId
          }
        }
        console.log('payloaddd', payload);
        axios.post(process.env.REACT_APP_API + "/add_visit_v2/", payload).then(res => {
          console.log(res.data);
          setIsVisible(false);
          setSuccess("Visit Added Successfully.");
          setTimeout(() => {
            history.push('/dashboard');
          }, 1000)
        }
        ).catch(err => {
          console.log(err);
          setError(err);
        })
      }


      dispatch({
        type: ADD_VISIT,
        payload: { CalenderData: data },
      });


    }
  }



  console.log(changeTime('00:30:00'));

  const handleUpdate = (e) => {
    e.preventDefault();


    const payload = {
      pp_ed_id: reducerData.pp_ed_id,
      visit_type: reducerData.visitType,
      notes: reducerData.notes,
      status: reducerData.status,
      location: reducerData.location,
      isRepeat: reducerData.isRepeat ? 1 : 0,
      video_link: reducerData.link,
      repeat: 'weekly',
      days: reducerData.days,
      occurence: reducerData.occurence || reducerData.visit_number || 1,
      created_by: reducerData.created_by,
      appointment_detail: {
        patient: reducerData.patient,
        startDate: reducerData.date._d.toISOString(),
        start_time: changeTime(reducerData.date._d.toISOString().slice(11, 19)),
        duration: reducerData.duration
      },
      pp_vd_id: reducerData.id,
    }

    const encodedData = Encode(payload);

    console.log(payload);

    axios.post(process.env.REACT_APP_API + "/update_visit_v1/", encodedData).then(res => {
      console.log(Decode(res.data));
      setIsVisible(false);
      setSuccess("Visit Updated Successfully.");
      setTimeout(() => {
        history.push('/dashboard');
      }, 1000)
    }).catch(err => {
      console.log(err);
      setError(err);
    })


  }

  //disabel past time and date
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // console.log("current",current, moment().endOf('day'));
    return current < moment().subtract(1, 'day').endOf('day');
    // if(new Date().getDate() == new Date(current.toDate()).getDate()-1){
    //   return true;
    // }
    // return false; 
  }

  // sushant 31-05-22

  // function disabledDateTime() {
  //   if (new Date().getDate() == new Date(data.date).getDate()) {
  //     const upperLimit = new Date().getHours();
  //     return {
  //       disabledHours: () => range(0, upperLimit + 1),
  //       disabledMinutes: () => [...range(1,15), ...range(16,30),...range(31,45),...range(46,60)],
  //     }
  //   }
  //   return {
  //     disabledHours: () => range(0, 7),
  //     disabledMinutes: () => [...range(1,15), ...range(16,30),...range(31,45),...range(46,60)],
  //     // disabledMinutes: () => range(30, 60),
  //   };
  // }


  //model style
  const divStyle = {
    //  overflowY: 'scroll',
    //   width: '496px',
    //  visible: 'hidden',
    //  height: '500px',
    //   position: 'relative'
  };


  console.log(reducerData);

  return (
    <div className='modell'>


      <Button type="primary" style={{ width: '100%', height: '20%', marginLeft: '50px' }} className='visitButton' onClick={showModal}>
        <ImPlus style={{ paddingRight: '5px' }} />{'  '} New Visit
      </Button>

      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Modal
          footer={[
            <>
              {!reducerData.id && <Button key="submit" type="primary" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>}
              {reducerData.id && <Button key="submit" type="primary" onClick={(e) => handleUpdate(e)}>
                Update
              </Button>}
            </>
            ,
            <Button key="back" onClick={handleOk} >
              Cancel
            </Button>,
          ]}
          style={{ top: 30, }} visible={isVisible} onOk={handleOk} bodyStyle={{ overflowY: 'auto', height: '400px', scrollbarWidth: 'auto' }}>
          <div style={divStyle}>
            {/* sushant 31-05-22 */}
            {/* <Row><div className='patient_search'><PatientSearch /></div></Row> */}
            <Row className='pt' >
              <Col span={12}>
                <label className='lab' > Search Patient <span className='colreq'>*</span></label>
                {/* <label className='lab' > {episodeState.patient_code ? 'Patient' : 'Search Patient'} <span className='col'>*</span></label>
                 {( reducerData.patient) && <Input
                  value={reducerData.patient}
                  style={{ width: 195, fontWeight: '600' }}
                  className="patient_Name"
                  disabled={true}
                />}
                { !reducerData.patient && <div style={{ width: '83%' }}><PatientSearch /></div>} */}
                <Row><div className='patient_search' ><PatientSearch value={reducerData.patient} /></div></Row>
              </Col>
              <Col span={12}>
                <label className='lab' >  Episode <span className='colreq'>*</span></label>
                {/* <Select style={{ width: 195 }} value={reducerData.episode} onChange={value => handleChange(value, 'visitType')}>
                  <Option value="Check-up">Check Up</Option>
                  <Option value="Emergency">Emergency</Option>
                  <Option value="Follow-up">Follow Up</Option>
                  <Option value="Routine">Routine</Option>
                  <Option value="Walk-in">Walk in</Option>
                  <Option value="Other">Other</Option>
                </Select> */}
                <Input placeholder="Episode" className='modalInputs' value={episode} onChange={value => handleChange(value, 'episode')} disabled />

              </Col>
            </Row>

            <Row className='pt'>
              <Col span={12}>
                <label className='lab' >   Visit Type <span className='colreq'>*</span></label>
                <Select className='modalInputs' placeholder="Visit Type" value={reducerData.visitType} onChange={value => handleChange(value, 'visitType')}>
                  <Option value="Check-up">Check Up</Option>
                  <Option value="Emergency">Emergency</Option>
                  <Option value="Follow-up">Follow Up</Option>
                  <Option value="Routine">Routine</Option>
                  <Option value="Walk-in">Walk in</Option>
                  <Option value="Other">Other</Option>
                </Select>

              </Col>
              <Col span={12}>
                <label className='lab' >  From Time <span className='colreq'>*</span></label>
                <Space direction="vertical" size={10}>
                  <DatePicker
                    className='modalInputs'
                    onChange={value => {
                      handleChange(value, 'date');
                      dispatch({ type: 'VISIT_DATE', payload: { date: value } })
                    }}
                    format="MM/DD/YYYY HH:mm "
                    disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    value={reducerData.date}
                    showTime={true}
                  />
                </Space>
              </Col>
            </Row>

            <Row className='pt'>
              <Col span={12}>
                <label className='lab' >   Duration <span className='colreq'>*</span></label>

                <Select className='modalInputs' placeholder='Duration' value={reducerData.duration} onChange={value => handleChange(value, 'duration')} >

                  <Option value="15 minutes">15 minutes</Option>
                  <Option value="30 minutes">30 minutes</Option>
                  <Option value="45 minutes">45 minutes</Option>
                  <Option value="1 hour">1 hour</Option>
                  <Option value="75 minutes">75 minutes</Option>
                  <Option value="90 minutes">90 minutes</Option>
                  <Option value="105 minutes">105 minutes</Option>
                  <Option value="2 hours">2 hour</Option>

                </Select>


              </Col>
              <Col span={12}>
                <label className='lab' >   Status <span className='colreq'>*</span></label>
                <Select className='modalInputs' placeholder='Status' value={reducerData.status} onChange={value => handleChange(value, 'status')}>
                  <Option value="Pre Operation">Pre-Operation</Option>
                  <Option value="Post Operation">Post Operation</Option>
                  <Option value="Trauma">Trauma</Option>
                  <Option value="Corporate">Corporate</Option>
                  <Option value="Wellness">Wellness</Option>
                </Select>
              </Col>
            </Row>

            <Row className='pt'>
              <Col span={12}>
                <label className='lab' >   Location <span className='colreq'>*</span></label>
                <Select className='modalInputs' placeholder='Location' value={reducerData.location} onChange={value => handleChange(value, 'location')}>
                  <Option value="Clinic">Clinic</Option>
                  <Option value="Home">Home</Option>
                  <Option value="Video-confrence">Video Conference</Option>
                </Select>
              </Col>
              {addVideo && <Col span={12} style={{ marginTop: '5px' }}>
                <label className='lab' >  Add Video Confrences</label>
                <Input value={data.link} placeholder='https://drive.in/..' className='modalInputs' onChange={e => handleChange(e.target.value, 'link')}
                />
              </Col>}
            </Row>
            <Row className='pt'>
              <Col span={12} style={{ marginTop: '15px' }}>
                <Switch checkedChildren="on" unCheckedChildren="off"
                  checked={reducerData.isRepeat}
                  onChange={() => {
                    setShow(!show)
                    dispatch({ type: 'IS_REPEAT', payload: { isRepeat: !reducerData.isRepeat } })
                  }} />
                <span style={{ paddingLeft: 8, }}>Repeat</span>
              </Col>
            </Row>

            <br />
            {/* <Row>
                <Col span={24}>
                  <Switch checkedChildren="on" unCheckedChildren="off"
                  checked={reducerData.isRepeat}
                    onChange={() => {
                      setShow(!show)
                    dispatch({type:'IS_REPEAT',payload:{isRepeat:!reducerData.isRepeat}})
                    }} />
                  <span style={{ paddingLeft: 8, }}>Repeat</span>

                </Col>
              </Row> */}
            {/* repeat  */}
            {(reducerData.isRepeat) && <Row>

              <p> Recurrence Rule</p>
              <Col span={24}>
                {/* Repeat */}


                {repeat === "Weekly" && (<div className='repeatFun'>


                  <p>Repeat On</p>
                  <div style={{ marginBottom: '80px' }}>
                    {days.map((day, index) => <SelectDay day={day} key={index} activeDays={reducerData.days || []} setActiveDays={setActiveDays} />)}
                  </div>


                  <label>Visits Occurence</label>
                  <br></br>
                  <InputNumber value={reducerData.occurence || reducerData.visit_number} min={1} max={31} onChange={(value) => {
                    setOccurences(value);
                    dispatch({ type: 'OCCURENCE', payload: { occurence: value } })
                  }} />
                </div>
                )
                }

              </Col>
              <Row className='pt'>
                <Col span={24}>
                  <label className='lab' >Notes</label> <br />
                  <Input style={{ width: 430 }} size="large" value={reducerData.notes} onChange={e => handleChange(e.target.value, 'notes')} />
                </Col>
              </Row>

            </Row>
            }

          </div>
        </Modal>
      </Form>
    </div>
  );
};

export default Model;