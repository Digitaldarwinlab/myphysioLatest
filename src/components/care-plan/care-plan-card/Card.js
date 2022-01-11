import React, { useState } from 'react'
import { Card, InputNumber,Input, Form, Row, Col, Modal } from 'antd';
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
    console.log(state)
    const AddIntoCart = (id) => {
        UpdateCart(id);
        setAddInCart(true);
    }
    const RemoveFromCart = (id) => {
        //UpdateCart(id);
        state.exercises_cart.find(ex=>ex.ex_em_id!==id)
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
        if(value>199||value<0){
            return
        }
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-' ) {
            handleChange(key,value,id);
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
                            <div style={{ minHeight: "33px" }}></div>
                            <Row gutter={[10, 10]}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name={"set" + index} label="Set" required={true}>
                                        <InputNumber
                                            disabled={carePlanView}
                                            onChange={(value) => handleChange("set", value, index)}
                                            value={(data && data.Rep) ? data.Rep.set :
                                                (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["set"] : 1}
                                            min={1} max={10}
                                            defaultValue={(data && data.Rep) ? data.Rep.set :
                                                (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["set"] : 1} className="w-75 m-1" />
                                    </Form.Item>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Item name={"rep_count" + index} label="Count" required={true}>
                                        <InputNumber
                                            disabled={carePlanView}
                                            onChange={(value) => handleChange("rep_count", value, index)}
                                            value={(data && data.Rep) ? data.Rep.rep_count :
                                                (state.exercises.length > 0 && state.exercises[index]) ? state.exercises[index]["Rep"]["rep_count"] : 1}
                                            min={1} max={10}
                                            defaultValue={(data && data.Rep) ? data.Rep.rep_count :
                                                (state.exercises && state.exercises[index]) ? state.exercises[index]["Rep"]["rep_count"] : 1} className="w-75 m-1" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </>,
                    <>
                        <div className="border m-1">
                            <h4 className="border">Rom</h4>
                            <Form.Item name={"joint" + index} required={true}>
                                <label for={"joint" + index}>Joint </label>
                                <select disabled={carePlanView} id={"joint" + index} onChange={(e) => handleChange("joint", e.target.value, index)}>
                                    
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