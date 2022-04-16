import React, { useState } from 'react'
import { Card, InputNumber,Input, Form, Row, Col, Modal, Select } from 'antd';
import { FaHeart } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinusCircle, AiTwotoneSwitcher } from "react-icons/ai";
import { useSelector } from 'react-redux';

const { Meta } = Card;
export default function CarePlanCard({ id, Level, Name, image, UpdateCart, cartState, actions, video, handleChange, index, data,Setselectvalue, carePlanView = false }) {
    // console.log(`${process.env.REACT_APP_EXERCISE_URL}/${image}`)
    const [addInCart, setAddInCart] = useState(cartState);
    const state = useSelector(state => state.carePlanRedcucer);
    const [visible, setVisible] = useState(false);
    console.log('careplanreducer')
    console.log("careplanreducer ",data)
    const AddIntoCart = (id) => {
        console.log('cart ',id)
        UpdateCart(id);
        setAddInCart(true);
    }
    const RemoveFromCart = (id) => {
        UpdateCart(id);
       // state.exercises_cart.find(ex=>ex.ex_em_id!==id)
        setAddInCart(false)
    }
    const onOk = () => {
        setVisible(false);
    }
    const onCancel = () => {
        setVisible(false);
    }
    const handleClick = () => {
        setVisible(true);
    }

    const handleChange1=(key,value,id=0)=>{
        
        const reg = /^-?\d*(\.\d*)?$/;
        console.log('click ',key," ",value)
        // if(key=="min"||key=="max"){
        //     if(value>199||value<0){
        //         return
        //     }
        //     if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-' ) {
        //         handleChange(key,value,id);
        //     }
        // }
        // if(key==="rep_count"){
        //     if(value<2){
        //         console.log('inside')
        //         return
        //     }

        // }
        if(key=="set"||key=="rep_count"){
            console.log("repetition ",value>99)
            if(value>99||value<0){
                return
            }
            if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-' ) {
                console.log("repet inside")
                handleChange(key,value,id);
            }
        }
        if(key=='min'||key=='max'){
            handleChange(key,value,id)
        }
    }

    return (
        <>
            <Card
                className="px-1 py-1 ant-card-style"
                cover={
                    <img
                        title="Play The Video"
                        onClick={handleClick}
                        alt="example"
                        className="px-2 py-3 w-100"
                        src={`${process.env.REACT_APP_EXERCISE_URL}/${image}`}
                        style={{ height: "180px", cursor: "pointer" }}
                    />
                }
                actions={actions ? [
                    <>{!cartState
                        ? <AiOutlinePlus onClick={() => AddIntoCart(id)} className="iconClass3" />
                        : <AiOutlineMinusCircle
                            onClick={() => RemoveFromCart(id)} className="iconClass3"
                            style={{ color: "#fa5f7f" }}
                        />}</>,
                    <AiTwotoneSwitcher className="iconClass3" />,
                    <FaHeart className="iconClass3" />,
                ] : [
                    <>
                        <div className="border m-1">
                            <h4 className="border">Repitition</h4>
                            
                            <Row gutter={[10, 10]}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name={"set" + index} label="Set" required={true}>
                                        {console.log("repe ",state.exercises&& state.exercises[index])}
                                        <Input
                                            disabled={carePlanView}
                                            onChange={(e) => handleChange1("set", e.target.value, index)}
                                            value={(data && data.Rep) ? data.Rep.set : (state.exercises&& state.exercises[index]) ? state.exercises[index]["Rep"]["set"] : 1}
                                            min={1} max={99}
                                            defaultValue={(data && data.Rep) ? data.Rep.set :
                                                (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["set"] : 1} className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name={"rep_count" + index} label="Count" required={true}>
                                        <Input
                                            disabled={carePlanView}
                                            onChange={(e) => handleChange1("rep_count", e.target.value, index)}
                                            value={(data && data.Rep) ? data.Rep.rep_count :
                                                (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["rep_count"] : 5}
                                            min={1} max={10}
                                            defaultValue={(data && data.Rep) ? data.Rep.rep_count :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rep"]["rep_count"] : 5} className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Row gutter={[10,10]}>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item name={"hold_time" + index} label="Hold Time(sec)" required={true}>
                                       <Select 
                                        onChange={(value) => handleChange("hold_time", value, index)}
                                        //value={state.exercises[index].Rep.hold_time}
                                        disabled={carePlanView}
                                        value={(data && data.Rep) ? data.Rep.hold_time :
                                            (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["hold_time"] : 5}
                                        defaultValue={(data && data.Rep) ? data.Rep.hold_time :
                                            (state.exercises && state.exercises[index]) ? state.exercises[index]["Rep"]["hold_time"] : 5}
                                       >
                                           <Select.Option value={5}>5</Select.Option>
                                           <Select.Option value={10}>10</Select.Option>
                                           <Select.Option value={15}>15</Select.Option>
                                       </Select>
                                    </Form.Item>
                                </Col>
                                </Row> */}
                        </div>
                    </>,
                    <>
                        <div className="border m-1">
                            <h4 className="border">Rom</h4>
                          
                            <Form.Item name={"joint" + index} label="Joint" required={true}>
                                {/* <label for={"joint" + index}>Joint </label> */}
                                <select style={{width:'100%'}} disabled={carePlanView} id={"joint" + index} onChange={(e) => handleChange("joint", e.target.value, index)}>
                                    
                                    {
                                        state.exercises && state.exercises[index] 
                                        ?
                                       typeof( state.exercises[index]['Rom']['joint'])=='object'
                                       ?
                                       
                                       state.exercises[index]['Rom']['joint'].map((item,index)=>{

                                        return(
                                            <option

                                            value={item}

                                            >
                                            {item}

                                        </option>
                                        )
                                       })
                                       :
                                       <option
                                       value={state.exercises[index]['Rom']['joint']}>
                                       {state.exercises[index]['Rom']['joint']}
                                   </option>
                                       :
                                       data && data['Rom'] ?
                                       <option
                                       value={data['Rom']['joint']}>
                                       {data['Rom']['joint']   }                             
                                   </option>
                                   :
                                   <option
                                       value='no Joint given'>
                                       {'no Joint given'}                             
                                   </option>
                                    }
                                    
                                </select>
                            </Form.Item>
                            <Row gutter={[10, 10]}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name={"min" + index} label="min" required={true}>
                                        {console.log('printing default danglse')}
                                    {console.log(state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']: 'nulli')}
                                   
                                   
                                        <Input
                                            disabled={carePlanView}
                                            onChange={(e) => handleChange1("min", e.target.value, index)}
                                            min={(state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["min"] : 1}
                                            max={(state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["max"] : 10}
                                            value={(data && data.Rom) ? data.Rom.min :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["min"] : state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']: state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']: 6}
                                            defaultValue={(data && data.Rom) ? data.Rom.min :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["min"] : state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']: state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']:8}
                                            className="w-75 m-1" />
                                    </Form.Item>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                <Form.Item name={"max" + index} label="max" required={true}>
                                        {console.log("Hello")}
                                        <Input
                                            disabled={carePlanView}
                                            onChange={(e) => handleChange1("max", e.target.value, index)}
                                            value={(data && data.Rom) ? data.Rom.max :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["max"] :  80}
                                            min={(state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["min"] : 90}
                                            max={(state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["max"] : state.exercises && state.exercises[index] ? state.exercises[index]['angle'][Object.keys(state.exercises[index]['angle'])[0]]['min']: 360}
                                            defaultValue={(data && data.Rom) ? data.Rom.max :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rom"]["max"] :80} className="w-75 m-1" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </>]}
            >
                <Meta
                    title={<p style={{ color: "#fa5f7f" }}>{Level}</p>}
                    description={Name}
                />
            </Card>
            <Modal footer={null} visible={visible} title="Video" onOk={onOk} onCancel={onCancel} centered>
                {video ? (
                    <video controls autoplay="autoplay" loop width="100%">
                          <source src={`${process.env.REACT_APP_EXERCISE_URL}/${video}`} type="video/mp4" />
                    </video>
                ) : <p>No Video Present...</p>}
            </Modal>
        </>
    )
}