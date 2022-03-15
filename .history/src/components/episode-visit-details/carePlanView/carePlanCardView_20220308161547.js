import React from 'react'
import CarePlanCard from './../../care-plan/care-plan-card/Card';
import { Row, Col } from 'antd';
import FormDate from './../../UI/antInputs/FormDate';
import moment from "moment";
import TimePickerComp from './../../care-plan/care-plan-allocate-plan/TimePickerComp';

export default function CarePlanCardView({ data }) {
    console.log('data in dashboard')
    console.log(data)
    return (
        <>
            <Row gutter={[10, 10]}>
                <Col lg={12} md={12} sm={12} xs={12}>
                {console.log('start date isss hh')}
                    {console.log(data.end_date)}
                    <FormDate
                        label="Start Date"
                        name="Start Data"
                        required={true}
                        defaultValue={data.end_date?  moment(data.end_date, "YYYY-MM-DD") : moment(data.start_date, "YYYY-MM-DD")}
                        disabledDate={true}
                        disabled={true}
                    />
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <FormDate
                        label="End Date"
                        name="End Data"
                        required={true}
                        defaultValue={moment(data.start_date, "YYYY-MM-DD")}
                        disabledDate={true}
                        disabled={true}
                    />
                </Col>
                {
                    data.exercise_details.map((exercise, index) => {
                        return (
                            <Col key={index} md={12} lg={8} sm={12} xs={24}>
                                <CarePlanCard
                                    cartState={false}
                                    id={exercise.ex_em_id}
                                    Level=""
                                    Name={exercise.name}
                                    image={exercise.image_url && exercise.image_url !== null ? exercise.image_url : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                    video={exercise.video_url && exercise.video_url !== null ? exercise.video_url : ""}
                                    actions={false}
                                    handleChange={() => console.log("Hello")}
                                    index={index}
                                    carePlanView={true}
                                    data={exercise}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
            <Row gutter={[10, 10]}>
                {
                    data.time_slot && data.time_slot.length !== 0 && (
                        data.time_slot.map((val, index) => {
                            return <TimePickerComp time={val[0]} showWatch={false} handleChange={() => console.log("Hello")} key={index} index={index} />
                        })
                    )
                }
            </Row>
            <Row gutter={[10, 10]}>
                {
                    data.time_slots && data.time_slots.length !== 0 && (
                        data.time_slots.map((val, index) => {
                            return <TimePickerComp time={val[0]} showWatch={false} handleChange={() => console.log("Hello")} key={index} index={index} />
                        })
                    )
                }
            </Row>
        </>
    )
}
