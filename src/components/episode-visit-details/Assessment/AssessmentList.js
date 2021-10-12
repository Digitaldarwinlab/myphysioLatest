import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Descriptions, Empty ,Table} from "antd";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import { ImPlus } from "react-icons/im";
import Loading from './../../UtilityComponents/Loading';
import { useHistory } from "react-router-dom";
import { getAssesment } from "../../../API/Assesment/getAssesment";
import { Pagination } from "antd";
const AssessmentList = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const state = useSelector(state => state.episodeReducer);
    const [loading, setLoading] = useState(false);
    const [QuestionVisibility, setQuestionVisibility] = useState('none');
    const [RomVisibility, setRomVisibility] = useState('none');
    const [AssesmentData, setAssesmentData] = useState([]);
    const [physicalData, setPhysicalData] = useState([]);

    const [kSymptoms, setKsymptoms] = useState([]);
    const [kStiffness, setKstiffness] = useState([]);
    const [kPain, setKpain] = useState([]);
    const [kDl, setKDl] = useState([]);
    const [kSports, setKsports] = useState([]);
    const [kQOL, setKQOL] = useState([]);
    const [itemArray,SetitemArray]=useState([])
    const [paginationState, setPaginationState] = React.useState({
        totalPage: 5,
        current: 1,
        minIndex: 0,
        maxIndex: 1,
        pageSize: 1
    });


    const [angleValues, setAngleValues] = useState({
        LeftShoulder_ver: '',
        RightShoulder_ver: '',
        LeftElbow: '',
        RightElbow: '',
        LeftHip: '',
        RightHip: '',
        LeftKnee: '',
        RightKnee: '',
    })

    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: AssesmentData.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }

    /*
    {
        LeftShoulder_ver: '',
        RightShoulder_ver: '',
        LeftElbow: '',
        RightElbow: '',
        LeftHip: '',
        RightHip: '',
        LeftKnee: '',
        RightKnee: '',
    }
    */
       const columns = [
        {
            title: "Angles",
            dataIndex: "angles",
            key: "angles"
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            render: number => Math.round(number)
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            render: number => Math.round(number)
        },
    ]

  

        const dataArray= AssesmentData.map((item)=>{
            const key=Object.keys(item.AI_data)
            let exercise=item.Exercise_Name[0]
            console.log('exercise name')
            console.log(exercise)
          
          
            if(exercise)
            {
                
                   // console.log('AI datas is')
                   // console.log(exercise)
                    if(item.AI_data[exercise] && item.AI_data[exercise].angles && item.AI_data[exercise].angles['Left Shoulder(ver)'].min)
                    {
                     //   console.log(item.AI_data[exercise].angles)
                        
                        return (
                            {
                                 table :[
                            {
                                key: '1',
                                angles: 'Left Shoulder(ver)',
                                min: item.AI_data[exercise].angles['Left Shoulder(ver)'].min,
                                max: item.AI_data[exercise].angles['Left Shoulder(ver)'].max
                            },
                            {
                                key: '2',
                                angles: 'Right Shoulder(ver)',
                                min: item.AI_data[exercise].angles['Right Shoulder(ver)'].min,
                                max: item.AI_data[exercise].angles['Right Shoulder(ver)'].max
                            },
                            {
                                key: '3',
                                angles: 'Left Elbow',
                                min: item.AI_data[exercise].angles['Left Elbow'].min,
                                max:item.AI_data[exercise].angles['Left Elbow'].max
                            },
                            {
                                key: '4',
                                angles: 'Right Elbow',
                                min: item.AI_data[exercise].angles['Right Elbow'].min,
                                max: item.AI_data[exercise].angles['Right Elbow'].max
                            },
                    
                        ],

                        table2:[
                            {
                                key: '5',
                                angles: 'Left Hip',
                                min: item.AI_data[exercise].angles['Left Hip'].min,
                                max: item.AI_data[exercise].angles['Left Hip'].max
                            },
                            {
                                key: '6',
                                angles: 'Right Hip',
                                min: item.AI_data[exercise].angles['Right Hip'].min,
                                max: item.AI_data[exercise].angles['Right Hip'].max
                            },
                            {
                                key: '7',
                                angles: 'Left Knee',
                                min: item.AI_data[exercise].angles['Left Knee'].min,
                                max: item.AI_data[exercise].angles['Left Knee'].max
                            },
                            {
                                key: '8',
                                angles: 'Right Knee',
                                min: item.AI_data[exercise].angles['Right Knee'].min,
                                max: item.AI_data[exercise].angles['Right Knee'].max
                            },
                        ]
                    }
                )
            

            }
           
    
        
        
    }   

  
    else
    {
        return (
            {
                table :[
                    {
                        key: '1',
                        angles: 'Left Shoulder(ver)',
                        min:'No Data',
                        max: 'No Data'
                    },
                    {
                        key: '2',
                        angles: 'Right Shoulder(ver)',
                        min:'No Data',
                        max: 'No Data'
                    },
                    {
                        key: '3',
                        angles: 'Left Elbow',
                        min: 'No Data',
                        max:'No Data'
                    },
                    {
                        key: '4',
                        angles: 'Right Elbow',
                        min:'No Data',
                        max: 'No Data'
                    },
            
                ],

                table2:[
                    {
                        key: '5',
                        angles: 'Left Hip',
                        min:'No Data',
                        max:'No Data'
                    },
                    {
                        key: '6',
                        angles: 'Right Hip',
                        min:'No Data',
                        max: 'No Data'
                    },
                    {
                        key: '7',
                        angles: 'Left Knee',
                        min:'No Data',
                        max: 'No Data'
                    },
                    {
                        key: '8',
                        angles: 'Right Knee',
                        min: 'No Data',
                        max: 'No Data'
                    },
                ]
            }
        )


    }
    
  
    

 })
    
 console.log('page number')
 console.log(AssesmentData)
 console.log(dataArray)
 const tableNOdata1=[
    {
        key: '1',
        angles: 'Left Shoulder(ver)',
        min:'No Data',
        max: 'No Data'
    },
    {
        key: '2',
        angles: 'Right Shoulder(ver)',
        min:'No Data',
        max: 'No Data'
    },
    {
        key: '3',
        angles: 'Left Elbow',
        min: 'No Data',
        max:'No Data'
    },
    {
        key: '4',
        angles: 'Right Elbow',
        min:'No Data',
        max: 'No Data'
    },

]
 const tableNOdata2=[
    {
        key: '5',
        angles: 'Left Hip',
        min:'No Data',
        max:'No Data'
    },
    {
        key: '6',
        angles: 'Right Hip',
        min:'No Data',
        max: 'No Data'
    },
    {
        key: '7',
        angles: 'Left Knee',
        min:'No Data',
        max: 'No Data'
    },
    {
        key: '8',
        angles: 'Right Knee',
        min: 'No Data',
        max: 'No Data'
    },
]
 //console.log('pagee is ')

  const onClick = () => {
        if(AssesmentData.length==0){
            history.push({
                pathname: "/assessment/1",
                state: {
                  type: "First",
                },
              });
            }
            else{
            history.push({
                pathname: "/assessment/1",
                state: {
                    type: "Periodic",
                },
                  });
            }
            };

    useEffect(async () => {
        setLoading(true);
        const data = await getAssesment(state.patient_code);
        setAssesmentData(data)
        setLoading(false)
      

        if(data.length!=0){
            let temp=[]
        
            let i=0
            for(i=0;i<data.length;i++)
            {
                temp[i]=data[i].physical_assessement
            }


        setPhysicalData(temp)

     
              /*


              
            if(data.physical_assessement!=""){
            setPhysicalData(data.physical_assessement)
            }
            if(data.questionnaires.Life[3]!==null){
            setQuestionVisibility('block')
            setKsymptoms(data.questionnaires.Symptoms[3])
            setKstiffness(data.questionnaires.Stiffness[3])
            setKpain(data.questionnaires.pain[3])
            setKDl(data.questionnaires.DailyLiving[3])
            setKsports(data.questionnaires.Sports[3])
            setKQOL(data.questionnaires.Life[3])
            }
            if(data.AI_data!=""){
            setRomVisibility("block")
            const exercise=data.Exercise_Name
            const AI_Data = data.AI_data[exercise].angles
            setAngleValues(preValues => ({
            ...preValues,
            ['LeftShoulder_ver']: AI_Data["Left Shoulder(ver)"],
            ['RightShoulder_ver']: AI_Data["Right Shoulder(ver)"],
            ['LeftElbow']: AI_Data["Left Elbow"],
            ['RightElbow']: AI_Data["Right Elbow"],
            ['LeftHip']: AI_Data["Left Hip"],
            ['RightHip']: AI_Data["Right Hip"],
            ['LeftKnee']: AI_Data["Left Knee"],
            ['RightKnee']: AI_Data["Right Knee"],
        }))
    }

    */

    }
    
        setPaginationState({
        ...paginationState,
        pageSize: 1,
        total: AssesmentData.length / 1,
        current: 1,
        minIndex: (2 - 1) * (1),
        maxIndex: 1 * (2)
    })
  
    }, [state.patient_code])

//   console.log('assesment datssa iss')
  // console.log(AssesmentData)




    return (
        <React.Fragment>
             <Col span={24} className="px-3 py-3">
                <Row>
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <h4 className="fw-bold">Assessments</h4>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                        <Button className="btncolor" onClick={onClick}>
                            <ImPlus className="me-2" /> {"  "}Add
                        </Button>
                    </Col>
                </Row>

        
            {
                         AssesmentData.map((data, index) =>
                        index >= paginationState.minIndex && index < paginationState.maxIndex
                        && (
                            <div key={index} className="px-1 py-1">
            <Col span={24} className="px-3">
                {loading && <Loading />}
                
                                {AssesmentData.length === 0 ? <p className="fw-bold">No Assesment Present..</p> : (
                    <>
                        <div className=" border mb-3 mt-3">
                            <Row className="border">
                                <Col md={24} lg={24} sm={24} xs={24}>
                                    <h4 className="p-2">Physical Assesment</h4>
                                </Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                                <Descriptions>
                                <Descriptions.Item label="Assesment Date">{data.assesmentdate.slice(0,10)}</Descriptions.Item>
                                    <Descriptions.Item label="Scars">{data.physical_assessement.Scars}</Descriptions.Item>
                                    <Descriptions.Item label="Numbness">{data.Numbmess}</Descriptions.Item>
                                    <Descriptions.Item label="Swelling"> {data.physical_assessement.Swelling}</Descriptions.Item>
                                    <Descriptions.Item label="Pain Level"> {data.physical_assessement.PainMeter}</Descriptions.Item>
                                    <Descriptions.Item label="Recent History" span={3}>{data.physical_assessement.RecentHistory}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="Trauma / Hospitalization History"
                                        span={3}
                                    >
                                        {data.physical_assessement.Trauma}
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Special Tests"
                                        span={3}
                                    >
                                        {data.physical_assessement.Test}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Row>
                        </div>
                        <div className=" border mb-3 mt-3">
                            <Row className="border">
                                <Col md={24} lg={24} sm={24} xs={24}>
                                    <h4 className="p-2">Questionnaire </h4>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="KOOS Symptoms">{data.questionnaires.Symptoms[3]}</Descriptions.Item>
                                        <Descriptions.Item label="KOOS Stiffness">{data.questionnaires.Stiffness[3]}</Descriptions.Item>
                                        <Descriptions.Item label="KOOS Pain">{data.questionnaires.pain[3]}</Descriptions.Item>
                                        <Descriptions.Item label="KOOS Daily Life">{data.questionnaires.DailyLiving[3]}</Descriptions.Item>
                                        <Descriptions.Item label="KOOS Sports">{data.questionnaires.Sports[3]}</Descriptions.Item>
                                        <Descriptions.Item label="KOOS Quality of Life">{data.questionnaires.Life[3]}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2"></Row>
                        </div>
                        <div className=" border mb-3 mt-3" >


                        <div className=" border mb-3 mt-3">
                            <Row className="border">
                                <Col md={24} lg={24} sm={24} xs={24}>
                                    <h4 className="p-2">ROM Assesment</h4>
                                </Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                                <Col md={12} lg={12} sm={24} xs={24}>
                                    <Table pagination={false} columns={columns} dataSource={  dataArray[paginationState.current-1] ? dataArray[paginationState.current-1].table ? dataArray[paginationState.current-1].table : tableNOdata1 : tableNOdata1} />
                                </Col>
                                <Col md={12} lg={12} sm={24} xs={24}>
                                <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current-1] ?  dataArray[paginationState.current-1].table2 ? dataArray[paginationState.current-1].table2 : tableNOdata2 : tableNOdata2} />'
                                </Col>
                            </Row>

                        </div>


                        </div>
                        <center>
                        <Pagination
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={AssesmentData.length}
                        onChange={PaginationChange}
                        style={{marginBottom:'10px'}}
                    />
                    </center>
                    </>
                )}
            </Col>
                            
                               
                            </div>
                        ))
                }
              
            </Col>

           
        </React.Fragment>

    );
};
export default AssessmentList;
