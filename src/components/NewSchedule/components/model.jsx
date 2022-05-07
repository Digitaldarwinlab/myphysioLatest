import { useState } from 'react';
//moment.js
import moment from 'moment';
import 'moment/locale/zh-cn';
//redux
import { useDispatch, useSelector } from "react-redux";
import { ADD_VISIT} from '../actions/types';
//import ant design
import { Modal, Button, Row, Col, Form, Input, Select, Switch, InputNumber, Radio } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';




const Model = ({ isVisible, setIsVisible }) => {
  const dayValue = useSelector(state =>state.dayReducer.data)
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState('Daily')
  const [show, setShow] = useState(false);
  const weeks = [

    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]
  const [data, setData] = useState({
    patient: '',
    episode: '',
    date: moment(dayValue),
    duration: '',
    vistiType: '',
    status: '',
    location: '',
    link: '',
    notes: '',
  });

  //radio ant design
  const { Option } = Select;

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleChange = (value, name) => {
    setData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_VISIT,
      payload: { CalenderData: data },
    });
    setIsVisible(false)
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
                <label className='lab' > Select Patient <span className='col'>*</span></label>
                <Input
                  value={data.patient}
                  style={{ width: 195 }}
                  onChange={e => handleChange(e.target.value, 'patient')} placeholder='Select Patient..'
                />
              </Col>
              <Col span={12}>
                <label className='lab' > Episode <span className='col'>*</span></label>
                <Input value={data.episode} style={{ width: 195 }} onChange={e => handleChange(e.target.value, 'episode')} placeholder='Episode..' />
              </Col>
            </Row>

            <Row className='pt'>
              <Col span={12}>
                <label className='lab' >  From Time <span className='col'>*</span></label>
                <Space direction="vertical" size={12}>
                  <DatePicker
                    style={{ width: 195 }}
                    onChange={value => handleChange(value, 'date')}
                    format="MM/DD/YYYY [,] h:mm A"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    value={moment(dayValue)}
                    showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                  /> 
                </Space>
              </Col>
              <Col span={12}>
                <label className='lab' >   Duration <span className='col'>*</span></label>
                <Select  defaultValue="Select .." onChange={value => handleChange(value, 'duration')}>

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
                <Select style={{ width: 195 }} defaultValue="Select .."  onChange={value => handleChange(value, 'vistiType')}>
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
                  <Option value="Pre">Pre-Operation</Option>
                  <Option value="Post">Post Operation</Option>
                  <Option value="Trauma">Trauma</Option>
                  <Option value="Corporate">Corporate</Option>
                  <Option value="Wellness">Wellness</Option>
                </Select>
              </Col>
            </Row>

            <Row className='pt'>
              <Col span={12}>
                <label className='lab' >   Location <span className='col'>*</span></label>
                <Select style={{ width: 195 }} defaultValue="Select .."  onChange={value => handleChange(value, 'location')}>
                  <Option value="Clinic">Clinic</Option>
                  <Option value="Home">Home</Option>
                  <Option value="Visit">Visit</Option>
                  <Option value="Vedio-confrence">Vedio Confrence</Option>
                </Select>
              </Col>
              <Col span={12}>
                <label className='lab' >  Add Video Confrences</label>
                <Input style={{ width: 195 }} onChange={e => handleChange(e.target.value, 'link')}
                  placeholder='https://drive.in/..' />
              </Col>
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
              <br />
              {/* <p> Recurrence Rule</p> */}
              <Col span={24}>
                {/* Repeat */}
                <br />
                <center>
                  <Select defaultValue="Daily" style={{ width: 470 }} onChange={value => setRepeat(value)}>

                    <Option value="Hourly">Hourly</Option>
                    <Option value="Daily">Daily</Option>
                    <Option value="Weekly">Weekly</Option>
                    <Option value="Monthly">Monthly</Option>
                    <Option value="Yearly">Yearly</Option>
                  </Select>
                </center>
                <br />
              </Col>
              <Col span={24}>
                Repeat Every
                <br />
                {repeat === "Hourly" && (<div className='repeatFun'>
                  <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => console.log(value)} />   <span>hour(s)</span>

                  <p>Repeat On</p>
                  <br />
                  <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  <p>End Repeat</p>
                  <br />
                  <Radio value={1}>Never</Radio> <br /> <br />
                  <Radio value={2}>On <DatePicker defaultValue={moment()} format="d-MM-YYYY" /> </Radio> <br /> <br />
                  <Radio value={3}>after   <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} /> <span>occurence(s)</span> </Radio>
                </div>
                )
                }
                {repeat === "Daily" && (<div className='repeatFun'>
                  <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => console.log(value)} />   <span>day(s)</span>

                  <p>Repeat On</p>
                  <br />
                  <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  <p>End Repeat</p>
                  <br />
                  <Radio value={1}>Never</Radio> <br /> <br />
                  <Radio value={2}>On <DatePicker defaultValue={moment()} format="d-MM-YYYY" /> </Radio> <br /> <br />
                  <Radio value={3}>after   <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} /> <span>occurence(s)</span> </Radio>
                </div>
                )
                }
                {repeat === "Weekly" && (<div className='repeatFun'>
                  <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => console.log(value)} />   <span>week(s)</span>

                  <p>Repeat On</p>
                  {weeks.map((week,index) => <button key={index}>week</button>)}
                  <br />
                  <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  <p>End Repeat</p>
                  <br />
                  <Radio value={1}>Never</Radio> <br /> <br />
                  <Radio value={2}>On <DatePicker defaultValue={moment()} format="d-MM-YYYY" /> </Radio> <br /> <br />
                  <Radio value={3}>after   <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} /> <span>occurence(s)</span> </Radio>
                </div>
                )
                }
                {repeat === "Monthly" && (<div className='repeatFun'>
                  <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => console.log(value)} />   <span>month(s)</span>

                  <p>Repeat On</p>
                  <br />
                  <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  <p>End Repeat</p>
                  <br />
                  <Radio value={1}>Never</Radio> <br /> <br />
                  <Radio value={2}>On <DatePicker defaultValue={moment()} format="d-MM-YYYY" /> </Radio> <br /> <br />
                  <Radio value={3}>after   <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} /> <span>occurence(s)</span> </Radio>
                </div>
                )
                }
                {repeat === "Yearly" && (<div className='repeatFun'>
                  <InputNumber min={1} max={50} defaultValue={1} onChange={(value) => console.log(value)} />   <span>year(s)</span>

                  <p>Repeat On</p>
                  <br />
                  <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} />
                  <p>End Repeat</p>
                  <br />
                  <Radio value={1}>Never</Radio> <br /> <br />
                  <Radio value={2}>On <DatePicker defaultValue={moment()} format="d-MM-YYYY" /> </Radio> <br /> <br />
                  <Radio value={3}>after   <InputNumber min={1} max={31} defaultValue={1} onChange={(value) => console.log(value)} /> <span>occurence(s)</span> </Radio>
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