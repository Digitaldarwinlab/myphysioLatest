import { useEffect, useMemo, useState } from 'react';
//moment.js
import moment from 'moment';
import 'moment/locale/zh-cn';
//redux
import { useDispatch, useSelector } from "react-redux";
import { ADD_VISIT } from '../actions/types';
//import ant design
import { Modal, Button, Row, Col, Form, Input, Select, Switch, InputNumber, Radio } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import PatientSearch from '../../UtilityComponents/PatientSearch';
import SelectDay from './SelectDay';
import { getExercise } from '../../../API/PatientRegistration/Patient';
import axios from 'axios';



const Model = ({ isVisible, setIsVisible }) => {
  const episodeState = useSelector(state => state.episodeReducer);
  console.log(episodeState);

  const days = useMemo(() => {
    return [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"
    ]
  }, [])
  const dayValue = useSelector(state => state.dayReducer.data);
  const today = new Date().getDay()
  const [addVideo, setAddVideo] = useState(false);
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState('Weekly');
  const [activeDays, setActiveDays] = useState([days[today]]);
  const [ocurrences, setOccurences] = useState(1);
  const [show, setShow] = useState(false);


  const [data, setData] = useState({
    patient: episodeState.patient_name,
    pp_ed_id: episodeState.patient_code,
    episode: episodeState.patient_code,
    date: moment(dayValue),
    duration: '',
    vistiType: '',
    status: '',
    location: '',
    link: '',
    notes: '',
  });

  console.log(activeDays);

  if (data.date._d) {
    console.log((data.date._d.toISOString().slice(11, 19)))
  }


  useEffect(async () => {
    if (episodeState.patient_code) {


      const response = await getExercise(parseInt(episodeState.patient_code));
      console.log('From Visittt', response)
      setData(data => ({ ...data, patient: episodeState.patient_name, episode: response, pp_ed_id: episodeState.patient_code }))
    }
  }, [episodeState])


  useEffect(() => {
    if (!show) {
      setActiveDays([days[today]]);
    }
  }, [show, days])

  //radio ant design
  const { Option } = Select;

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
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
            pp_ed_id: data.pp_ed_id,
            visit_type: data.vistiType,
            notes: data.notes,
            status: data.status,
            video_link:data.link,
            appointment_detail: {
              startDate: data.date._d.toISOString(),
              start_time: data.date._d.toISOString().slice(11, 19),
              duration: duration + ' minutes'
            },
            location: data.location,
            isRepeat: 1,
            repeat: "weekly",
            days: activeDays,
            visit_number: occurence,
            created_by: userId
          }
        } else {
           payload = {
            pp_ed_id: data.episode,
            visit_type: data.vistiType,
            notes: data.notes,
            status: data.status,
            video_link:data.link,
            appointment_detail: {
              startDate: data.date._d.toISOString(),
              start_time: data.date._d.toISOString().slice(11, 19),
              duration: data.duration + ' minutes'
            },
            location: data.location,
            isRepeat: 0,
            created_by: userId
          }
        }
        console.log('payloaddd',payload);
        axios.post(process.env.REACT_APP_API + "/add_visit_v2/",payload).then(res =>console.log( res.data)).catch(err => console.log(err))
      }

      dispatch({
        type: ADD_VISIT,
        payload: { CalenderData: data },
      });

      setIsVisible(false);
    }
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
      return current && current < moment().endOf('day');
    }

    function disabledDateTime() {
      return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
      };
    }


    //model style
    const divStyle = {
      //  overflowY: 'scroll',
      //   width: '496px',
      //  visible: 'hidden',
      //  height: '500px',
      //   position: 'relative'
    };


    console.log(data);

    return (
      <>
        <Button type="primary" icon={"+"} onClick={showModal}>
          New Visit
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
              <Button key="submit" type="primary" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>,
              <Button key="back" onClick={handleOk} >
                Cancel
              </Button>,
            ]}
            style={{ top: 30 }} visible={isVisible} onOk={handleOk}>
            <div style={divStyle}>
              <Row className='pt' >
                <Col span={12}>
                  <label className='lab' > {episodeState.patient_code ? 'Patient' : 'Search Patient'} <span className='col'>*</span></label>
                  {episodeState.patient_code && <Input
                    value={episodeState.patient_name}
                    style={{ width: 195, fontWeight: '600' }}

                    disabled={true}
                  />}
                  {!episodeState.patient_code && <div style={{ width: '83%' }}><PatientSearch /></div>}
                </Col>
                <Col span={12}>
                  <label className='lab' > Episode <span className='col'>*</span></label>
                  <Input style={{ fontWeight: '600', width: 195 }} value={data.episode} disabled={true} placeholder='Episode..' />
                </Col>
              </Row>

              <Row className='pt'>
                <Col span={12}>
                  <label className='lab' >  From Time <span className='col'>*</span></label>
                  <Space direction="vertical" size={12}>
                    <DatePicker

                      style={{ width: 195 }}
                      onChange={value => handleChange(value, 'date')}
                      format="MM/DD/YYYY HH:mm "
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      value={data.date}
                      defaultValue={moment(dayValue)}
                      showTime={{ defaultValue: moment(dayValue) }}
                    />
                  </Space>
                </Col>
                <Col span={12}>
                  <label className='lab' >   Duration <span className='col'>*</span></label>

                  <Select style={{ width: 195 }} defaultValue="Select .." onChange={value => handleChange(value, 'duration')} >

                    <Option value="15">15 minutes</Option>
                    <Option value="30">30 minutes</Option>
                    <Option value="45">45 minutes</Option>
                    <Option value="60">1 hour</Option>
                    <Option value="75">75 minutes</Option>
                    <Option value="90">90 minutes</Option>
                    <Option value="105">105 minutes</Option>
                    <Option value="120">2 hour</Option>

                  </Select>


                </Col>
              </Row>

              <Row className='pt'>
                <Col span={12}>
                  <label className='lab' >   Visit Type <span className='col'>*</span></label>
                  <Select style={{ width: 195 }} defaultValue="Select .." onChange={value => handleChange(value, 'vistiType')}>
                    <Option value="Check-up">Check Up</Option>
                    <Option value="Emergency">Emergency</Option>
                    <Option value="Follow-up">Follow Up</Option>
                    <Option value="Routine">Routine</Option>
                    <Option value="Walk-in">Walk in</Option>
                    <Option value="Other">Other</Option>
                  </Select>

                </Col>
                <Col span={12}>
                  <label className='lab' >   Status <span className='col'>*</span></label>
                  <Select style={{ width: 195 }} defaultValue="Select .." onChange={value => handleChange(value, 'status')}>
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
                  <label className='lab' >   Location <span className='col'>*</span></label>
                  <Select style={{ width: 195 }} defaultValue="Select .." onChange={value => handleChange(value, 'location')}>
                    <Option value="Clinic">Clinic</Option>
                    <Option value="Home">Home</Option>
                    <Option value="Video-confrence">Video Confrence</Option>
                  </Select>
                </Col>
                {addVideo && <Col span={12}>
                  <label className='lab' >  Add Video Confrences</label>
                  <Input style={{ width: 195 }} onChange={e => handleChange(e.target.value, 'link')}
                    placeholder='https://drive.in/..' />
                </Col>}
              </Row>
              <Row className='pt'>
                <Col span={24}>
                  <label className='lab' >Notes</label> <br />
                  <Input style={{ width: 430 }} size="large" onChange={e => handleChange(e.target.value, 'notes')} />
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={24}>
                  <Switch checkedChildren="on" unCheckedChildren="off"
                    onChange={() => setShow(!show)} />
                  <span style={{ paddingLeft: 8, }}>Repeat</span>

                </Col>
              </Row>
              {/* repeat  */}
              {show && <Row>

                <p> Recurrence Rule</p>
                <Col span={24}>
                  {/* Repeat */}


                  {repeat === "Weekly" && (<div className='repeatFun'>


                    <p>Repeat On</p>
                    <div style={{ marginBottom: '80px' }}>
                      {days.map((day, index) => <SelectDay day={day} key={index} activeDays={activeDays} setActiveDays={setActiveDays} />)}
                    </div>


                    <label>Visits Occurence</label>
                    <br></br>
                    <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  </div>
                  )
                  }

                </Col>

              </Row>
              }

            </div>
          </Modal>
        </Form>
      </>
    );
  };

  export default Model;