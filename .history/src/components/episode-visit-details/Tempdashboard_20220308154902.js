import {react,useEffect,useState} from 'react'
import './Tempdashboard.css'

import Line from '../../../PatientComponents/Charts/ChartComponents/line'
import data_line from '../../../PatientComponents/Charts/ChartData/data_line.json'
import StreamLine from '../../../PatientComponents/Charts/ChartComponents/streamline'
import stream_data from '../../../PatientComponents/Charts/ChartData/data_stream.json'
import VerticalBar from '../../../PatientComponents/Charts/ChartComponents/VerticalBar'

import  data_vertical_bar  from '../../../PatientComponents/Charts/ChartData/data_vertical_bar.json'
import { DatePicker, Space } from 'antd';

import Bar from '../../../PatientComponents/Charts/ChartComponents/bar'
import {Row,Col} from 'antd'
import bar_data from '../../../PatientComponents/Charts/ChartData/data_bar';
import Pie from '../../../PatientComponents/Charts/ChartComponents/pie'
import pie_data1 from '../../../PatientComponents/Charts/ChartData/data_pie';
import VerticalBar2 from '../../../PatientComponents/Charts/ChartComponents/Verticalbar2'

import data_vertical_bar2 from '../../../PatientComponents/Charts/ChartData/data_vertical_bar2.json'
import line1_data from '../../../PatientComponents/Charts/ChartData/data_line.json'
import line2_data from '../../../PatientComponents/Charts/ChartData/data_line2.json'
import { Button, Radio,Switch,Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
import { Table, Tag } from 'antd';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { get_progress } from '../../../API/Progress/ProgressApi'
import { useSelector ,useDispatch} from 'react-redux'
import { getEpisodeDetails } from '../../care-plan/carePlanIndex'
const { Option } = Select;
const Tempdashboard=({viewstate})=>{
 // console.log('stateee comeeddd is')
 // console.log(viewstate)
    var doc = new jsPDF();
   
        const [date,Setdate]=useState('20-09-2021')
        const [graphview,Setgraphview]=useState(true)
        const[minmaxgraphdata,Setminmaxgraphdata]=useState(data_vertical_bar)
        const [koosgraphdata,Setkoosgraphdata]=useState(bar_data)
        const [exercisecompletiondata,Setexercisecompletiondata]=useState(pie_data1)
        const [setcompletionratedata,Setsetcompletionratedata]=useState([{}])
        const [targetminmaxdata,Settargetminmaxdata]=useState(line1_data)
        const [accuracygraphdata,Setaccuracygraphdata]=useState(line2_data)
        const [selectedexercise1,Setselectedexercise]=useState(0)
        const [minmaxgraphdata2,Setminmaxgraphdata2]=useState([{}])
        const [exerciseoption,Setexerciseoption]=useState([])
        const state = useSelector(state => state.episodeReducer)
        const dispatch=useDispatch()
        const [finaldata,SetfinalData]=useState({})
        const [selectedexercise2,Setselectedexercise2]=useState('')
 
        useEffect( async()=>{
            const data=await get_progress(state.patient_code)
            // console.log('data  progress')
            // console.log(data)
            SetfinalData(data)
            // console.log('episode aaingg')
            // console.log(state)
            Setsetcompletionratedata(data.data_vertical_bar2)
            //alert(state.patient_code)
            Setminmaxgraphdata2(data.data_vertical_bar)
              data.data_vertical_bar.map((item)=>{
                if(!exerciseoption.includes(item.exercise_name))
                {
                  let temp=exerciseoption
                  temp.push(item.exercise_name)
                  Setexerciseoption(temp)
                  
                }
              })

              Setselectedexercise2(exerciseoption[0])
              let temparray=data.data_vertical_bar.map((item)=>{
                if(item.exercise_name==selectedexercise2)
                {
                  return(
                    {
                      Joints:item.Joints,
                      Max:item.max.toFixed(2),
                      MaxColor: "hsl(18, 70%, 50%)",
                      Min:item.min.toFixed(2),
                      MinCOlor:"hsl(147, 70%, 50%)",
                      exercise_name:item.exercise_name
                    }
                  )
                }
                else{
                  return false
                }
                
              })

              const filteredPeople = temparray.filter((item) => item.Joints!== undefined);
           //   console.log('filtered')
        //    console.log(filteredPeople)
            Setminmaxgraphdata2(filteredPeople)
        },[state])

        
     //   console.log('optionss are')
        //  console.log(exerciseoption)
     
        var dataSourcejpint =minmaxgraphdata.map((item,index)=>{
                return {
                    key: index,
                    Joint:item.Joints,
                    Min: item.Min,
                    Max:item.Max

                }
            })
          

         // console.log('mapping k baad')
       //   console.log(dataSourcejpint)
          //  console.log('minmaxtarget')
         //   console.log(targetminmaxdata)
            targetminmaxdata[0].data.map((item,index)=>{
                return  {
                       title:item.x,
                       dataIndex:item.x,
                       key:item.x
                   }
               })
              
            var targetminmaxcolumn=[
                
               
                {
                    title:'Type',
                    dataIndex:'Type',
                    key:'Type'
                }
            ]
            let temparray=targetminmaxdata[0].data.map((item)=>{
                    
                return {
                    
                    title :item.x,
                    dataIndex:item.x,
                    key :item.x
                
                }
            })
          //  console.log(temparray)
          
            targetminmaxcolumn=targetminmaxcolumn.concat(temparray)
          //  console.log('target min max columsn')
          //  console.log(targetminmaxcolumn)
            const targgetminmaxdatasource=[]

            

            targetminmaxdata.map((item,index)=>{
             
                item.data.map((item1,index1)=>{ 
                    for ( let j=0;j<targetminmaxcolumn.length;j++)
                {   
                                    targgetminmaxdatasource[targetminmaxcolumn[j].title]=item1.x
                }

                })
                
            })
        //    console.log('target  misn dmax datraa')      
         //   console.log(targetminmaxdata)
            
           
            const kooscolumn=  [
                {
                  title: 'Koos',
                  dataIndex: 'Koos',
                  key: 'Koos',
                },
                {
                  title: 'Score',
                  dataIndex: 'Score',
                  key: 'Score',
                },
                
              ];
              const completioncolumn=  [
                {
                  title: 'Exercise Alloted',
                  dataIndex: 'Exercise_Alloted',
                  key: 'Exercise_Alloted',
                },
                {
                  title: 'Exercise Completed',
                  dataIndex: 'Exercise_Completed',
                  key: 'Exercise_Completed',
                },
                {
                    title: 'Exercise pending',
                    dataIndex: 'Exercise_pending',
                    key: 'Exercise_pending',
                  },
                
              ];

              const completiondatasource=[

                {
                    key :1,
                    Exercise_Alloted :'6',
                Exercise_Completed :'3',
                Exercise_pending :'3'
                    
                }
              ]

              const koosdatasource=[
                {
                  key:0,
                  Koos:'Symptoms koos score',
                  Score :finaldata.Symptoms_koos_score
                },
                {
                  key:1,
                  Koos:'Stiffness koos score',
                  Score:finaldata.Stiffness_koos_score
                },
                {
                  key:2,
                  Koos:'Pain Meter',
                  Score :finaldata.pain_meter
                },
                {
                  key:3,
                  Koos:'Life koos score',
                  Score:finaldata.Life_koos_score
                },
                {
                  key:4,
                  Koos:'Sports koos score',
                  Score:finaldata.Sports_koos_score
                }
              ]
          const columnsminmaxjoint = [
            {
              title: 'Joints',
              dataIndex: 'Joints',
              key: 'Joints',
            },
            {
              title: 'Min',
              dataIndex: 'Min',
              key: 'Min',
            },
            {
              title: 'Max',
              dataIndex: 'Max',
              key: 'Max',
            },
          ];

     

          const columnsetcompletionrate =[
            {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
              },
              {
                title: 'SetCompletionRate',
                dataIndex: 'SetCompletionRate',
                key: 'SetCompletionRate',
              }
          ]

          const Setcompletiondatasource= setcompletionratedata.map((item,index)=>{


            return {
                key :index,
                Date :item.Date,
                SetCompletionRate:item.SetCompletionRate
            }
          })
    const onDateChange=(date, dateString)=>{
        //console.log(dateString)
        Setdate(dateString)
    }
       

    function jointchange(e)
    {
        Setselectedexercise(e)
      //  console.log(minmaxgraphdata)
    }


    function make_pdf()
    {   
        if(graphview)
        {
            html2canvas(document.getElementById("tempdashboard")).then(canvas => {
                document.body.appendChild(canvas);  // if you want see your screenshot in body.
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.setFontSize(10);
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("Patient-Data"); 
    
            })
        }
        else{
            alert('cannot download raw sdata')
        }
        
    }

    function select_exercise(value){
     // alert(value)
      Setselectedexercise2(value)
      let temparray=finaldata.data_vertical_bar.map((item)=>{
        if(item.exercise_name==selectedexercise2)
        {
          return(
            {
              Joints:item.Joints,
              Max:item.max.toFixed(2),
              MaxColor: "hsl(18, 70%, 50%)",
              Min:item.min.toFixed(2),
              MinCOlor:"hsl(147, 70%, 50%)",
              exercise_name:item.exercise_name
            }
          )
        }
        else{
          return false
        }
        
      })

    const filteredPeople = temparray.filter((item) => item.Joints!== undefined);
      console.log('filtered')
   // console.log(filteredPeople)
    Setminmaxgraphdata2(filteredPeople)
    }


    return (
        <div className="tempdashboard" id="tempdashboard">
          <Button type="primary" onClick={make_pdf}  className="pdf-button" id="pdf-button" shape="round" icon={<DownloadOutlined />} size={'medium'}>
          Download PDf
        </Button>
            <div className="header">
                <Row className="patientInfo">
                  
                    <Col span={2}>
                        
                    <p><b> Basic Info </b></p>
                        </Col>
                   
                        
                        <Col   className="border p-2" span={4} >
                        <p>Contact Number : {viewstate.MobileNo}</p>
                        
                        </Col> 
                        <Col  className="border p-2" span={4} >
                        <p> Gender : {viewstate.Gender} </p>
                        
                        </Col> 
                        <Col  className="border p-2" span={4} >
                        <p> Blood Group : {viewstate.bloodType}</p>
                        
                        </Col>  
                        <Col  className="border p-2" span={4}>
                        <p> Allergies: {viewstate.MedicalHistory} </p>
                        
                        </Col>  
                       
                </Row>
                <div className="episodeInfo">
                <Col  >
                        
                        <p> <b>Episode INfo </b></p>
                        </Col> 
                    <Col span={5}  className="border detail">
                        
                        <p>Episode Id :40</p>
                        </Col> 
                        <Col span={5} className="border detail">
                        <p> Referred Doctor : Dr. Rajiv</p>
                        
                        </Col>
                        <Col span={5} className="border detail">
                        
                        <p>Primary Complaint : Checkup</p>
                        </Col> 
                        <Col span={5} className="border detail">
                        <p> Episode Issue : High level problem</p>
                        
                        </Col> 
                       
                         
                </div>
              
            </div>

            <div className="assesment">
                <div className="switch-box">
            View Type: <Switch checkedChildren="Raw Data" unCheckedChildren="Graph" onChange={()=>Setgraphview(!graphview)} className="switch-data" id="switch-data"  />
            </div>
              <center>  <h3> <strong>{'Assesment  Analysis '}</strong></h3></center>
              <div className="border detail-assesment">
                        <p id="henry"> Diagnose Disease : Liver Infection</p>
                        
                        </div> 
                        <div className="border detail-assesment">
                        <p>Treatment PLanned : tsreatment</p>
                        
                        </div> 
              <Row className="assesment-main" id="tableclass" >
                  <Col    className="left-graph">
                  {  graphview ?
                      <Select  placeholder={exerciseoption[0]} defaultValue={exerciseoption[0]} style={{ width: 120 }} onChange={select_exercise} >
              {
                exerciseoption.map((item,index)=>{
                return (<Option value={item} key={index}>{item}</Option>)
                })
              }
            </Select> 
            
            : null   } 
                <div className="col"  style={{ height: 800,width:'200%',position:'relative',left:'40px'}}>
                   { graphview ?  <VerticalBar   data={minmaxgraphdata2} date={date} /> : <Table size="small" className="min-max-table" columns={columnsminmaxjoint} dataSource={minmaxgraphdata2} />}
               
            </div>
            </Col>
            <Col    className="right-graph">
                <div className="col" style={{ height: 400,width:900,marginTop:20}}>
           
    
    <Table size="small" className="koos-table" columns={kooscolumn} pagination={false} dataSource={koosdatasource} />
    
            </div>
            
            </Col>
            </Row>
            <Row>
            
           
            
            
            </Row>
            
            </div>
            <div className="bottom-container">
                <center><h1><strong> Care Plan Analysis </strong> </h1></center>
            <div class="bottom-inner-container" style={{ height: 500}}>
                <div className="bottom-left-date-picker">
               { graphview ?  <DatePicker className='date-picker' onChange={onDateChange}  placeholder="Select Date" /> : null }
                </div>
              
                <div class="col pie-chart">
             
                <Row class="row-bottom m-3" style={{ height: 500}}>
               
                 
                <Col class="col"  style={{ height: 400,width:600,marginTop:20}}>
                    {graphview ?  <VerticalBar2 data={setcompletionratedata} /> :  <Table size="small" pagination={false} className="setcompletion-table" columns={columnsetcompletionrate} dataSource={Setcompletiondatasource} />}
                </Col> 
                </Row>
                
                </div>   
                
                   
                     
            </div>
            <div class="row" style={{ height: 400}}>
                
                    <div class="col-6">
                       {
                       
                       graphview
                       ?
                       <Line data={targetminmaxdata} 
                        min={40} max={190}
                        ylegend={"Angles"}/>
                        :
                        <Table size="small" className="setcompletion-table" columns={targetminmaxcolumn} />
                    }
                      
                    </div> 
                     
                    
                    
                </div>
            </div>
            
           
        </div>
    )

}


export default Tempdashboard;