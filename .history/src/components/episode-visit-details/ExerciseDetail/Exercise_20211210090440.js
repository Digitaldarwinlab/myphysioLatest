import {React,useEffect,useState} from 'react'

import Data from '../../UtilityComponents/dummyData/output.json'

import {Row,Col,Table} from 'antd'


import { Menu, Dropdown, Button } from 'antd'

const Exercise=()=>{
    const columns = [
        
        {
          title: 'Joint',
          dataIndex: 'joint',
          key: 'joint',
        },
        {
          title: 'Max',
          dataIndex: 'max_angle',
          key: 'max_angle',
        },
        {
            title: 'Min',
            dataIndex: 'min_angle',
            key: 'min_angle',
          },
          {
            title: 'Exercise',
            dataIndex: 'exercise_name',
            key: 'exercise_name',
          },
          {
            title: 'Sets',
            dataIndex: 'sets',
            key: 'sets',
          },
          
      ];
      
    
    const [exercise,Setexercise]=useState([Data.KPIs.Data])
    console.log(exercise)
    const dates=exercise.map(user=>{
        return Object.keys(user)

    })
   const values= exercise.map(i=>{
        return Object.values(i)
    })
    
 const enry=   values[0].map((user)=>{
       return user
    })

   

    const menu=(id) => (
        
        <Menu>
            
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
            <b>Exercise name</b> : {enry[id].exercise_name}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              <b>Joint : </b> {enry[id].joint}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              <b>Max Angle : </b>{enry[id].max_angle}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              <b>Min Angle: </b>{enry[id].min_angle}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              <b>Sets : </b>{enry[id].sets.set}  <b>Rep : </b> {enry[id].sets.rep_count}
            </a>
          </Menu.Item>
        </Menu>
        
      );
    return(
        <div className="exercise p-2">
             <Row gutter={[10, 10]}>
                <Col lg={6} md={6} sm={4} xs={24}>
                <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                    <p className="fw-bold"><b> Episode </b>: {Data.episode.episode_number}</p>

                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24} >
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p" ><strong>Complaint: </strong>  {Data.episode.primary_complaint}</p>
                    
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"> <strong>Start Date :</strong>{Data.episode.start_date} </p>
                       
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> Assesment Type : </strong>  {Data.assessment.types} </p>
                        
                    </div>
                </Col>          
            </Row>
            <Row className="m-1" gutter={[10, 10]}>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"> <strong>Symptoms Koos Score :</strong>{Data.assessment.Symptoms_koos_score} </p>
                       
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> Stifness Koos Score: </strong>  {Data.assessment.Stiffness_koos_score} </p>
                        
                    </div>
                </Col> 
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> Stifness Koos Score: </strong>  {Data.assessment.Stiffness_koos_score} </p>
                        
                    </div>
                </Col>    

                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> Daily Living Score: </strong>  {Data.assessment.DailyLiving_koos_score} </p>
                        
                    </div>
                </Col>      
            </Row>

            <Row className="m-1" gutter={[10, 10]}>
                <Col lg={6} md={6} sm={4} xs={24}>
                <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                    <p className="fw-bold"><b> Total Exercise </b>: {Data.care_plan.total_exercise}</p>

                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24} >
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p" ><strong>Pending Exercise: </strong>  {Data.care_plan.pending_exercise}</p>
                    
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"> <strong>Slot Per Day :</strong>{Data.care_plan.slot_per_day} </p>
                       
                    </div>
                </Col>
                
                <Col lg={6} md={6} sm={12} xs={24}>
                    <div className="border rounded px-1 py-2 text-center" style={{maxHeight:'45px'}}>
                        <p className="fw-bold p"><strong> ending Date: </strong>  {Data.care_plan.end_date} </p>
                        
                    </div>
                </Col>    

                      
            </Row>
            

            <Row className="m-1" gutter={[10, 10]} className="m-2">
            {
                dates[0].map((user,index)=>{

                    return ( 
                        <Col span={4}>
                    <Dropdown overlay={menu(index)} placement="bottomLeft" arrow>
                    <Button>{user}</Button>
                  </Dropdown>
                  
                  </Col>)
})
            }

            </Row>

            
        </div>
        
    )
}


export default Exercise