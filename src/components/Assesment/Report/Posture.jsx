import { Badge, Col, Descriptions, Row } from 'antd'
import React from 'react'
import "./Common.css"
import pos from '../../../assets/download.png'
import H3 from '../components/H3'
let angles = ["Flexed Knee",
    "Hyper Extended Knee",
    "Excessive Anterior Pelvic",
    "Forward Head",
    "Lordosis",
    "Kyphosis",]
const Posture = ({ state }) => {
    return (
        <>
            <Row className="posture-row-main-1x bg-theme-1x div-border-1x">
                {state.FirstAssesment.posture.Posterial_view && Object.keys(state.FirstAssesment.posture["Posterial_view"]).length > 0 && <div style={{ backgroundColor: 'white' }} class="column" >
                    <H3 title={'Anteror(Standing)'} />
                    <div className='posture-row-1x bg-theme-1x'>
                        <div className='posture-col-1x'>
                            <img
                                src={
                                    state.FirstAssesment.posture["Posterial_view"]
                                        .posterial_view_image
                                }
                            />
                        </div>
                        <div className='posture-col-1x' style={{ backgroundColor: 'white' }}>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Nasal Bridge</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[0]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Shoulder levels(Acrimion)</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[1]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Umbilicus</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[2]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Knees</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[3]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Ankle/Foot</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[4]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Line of Gravity</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Posterial_view"].Angles[5]}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.keys(state.FirstAssesment.posture["Posterial_view"].checkbox).map((ob) => {
                            if (state.FirstAssesment.posture["Posterial_view"].checkbox[ob] == 1) {
                                return (
                                    <p style={{ margin: '5px' }}> <Badge color="#000000" />{ob}</p>
                                )
                            }
                        }
                        )}
                    </div>
                </div>}

                {state.FirstAssesment.posture.lateral_view && Object.keys(state.FirstAssesment.posture["lateral_view"]).length > 0 && <div style={{ backgroundColor: 'white' }} class="column" >
                    <H3 title={'Lateral(Standing)'} />
                    <div className='posture-row-1x bg-theme-1x'>
                        <div className='posture-col-1x'>
                            <img
                                src={
                                    state.FirstAssesment.posture["lateral_view"]
                                        .posterial_view_image
                                }
                            />
                        </div>
                        <div className='posture-col-1x' style={{ backgroundColor: 'white' }}>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Head deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["lateral_view"].Angles[0]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Shoulder</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["lateral_view"].Angles[1]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Hip/Pelvic Deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["lateral_view"].Angles[2]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Knees Deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["lateral_view"].Angles[3]}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.keys(state.FirstAssesment.posture["lateral_view"].checkbox).map((ob) => {
                            if (state.FirstAssesment.posture["lateral_view"].checkbox[ob] == 1) {
                                return (
                                    <p style={{ margin: '5px' }}> <Badge color="#000000" />{ob}</p>
                                )
                            }
                        }
                        )}
                    </div>
                </div>}
                {state.FirstAssesment.posture.sitting_Posterial_view && Object.keys(state.FirstAssesment.posture["sitting_Posterial_view"]).length > 0 && <div style={{ backgroundColor: 'white' }} class="column" >
                    <H3 title={'Anteror(Sitting)'} />
                    <div className='posture-row-1x bg-theme-1x'>
                        <div className='posture-col-1x'>
                            <img
                                src={
                                    state.FirstAssesment.posture["sitting_Posterial_view"]
                                        .posterial_view_image
                                }
                            />
                        </div>
                        <div className='posture-col-1x' style={{ backgroundColor: 'white' }}>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Nasal Bridge</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[0]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Shoulder levels(Acrimion)</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[1]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Umbilicus</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[2]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Knees</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[3]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Ankle/Foot</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[4]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Line of Gravity</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["sitting_Posterial_view"].Angles[5]}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.keys(state.FirstAssesment.posture["sitting_Posterial_view"].checkbox).map((ob) => {
                            if (state.FirstAssesment.posture["sitting_Posterial_view"].checkbox[ob] == 1) {
                                return (
                                    <p style={{ margin: '5px' }}> <Badge color="#000000" />{ob}</p>
                                )
                            }
                        }
                        )}
                    </div>
                </div>}

                {state.FirstAssesment.posture.Sitting_lateral_view && Object.keys(state.FirstAssesment.posture["Sitting_lateral_view"]).length > 0 && <div style={{ backgroundColor: 'white' }} class="column" >
                    <H3 title={'Lateral(Sitting)'} />
                    <div className='posture-row-1x bg-theme-1x'>
                        <div className='posture-col-1x'>
                            <img
                                src={
                                    state.FirstAssesment.posture["Sitting_lateral_view"]
                                        .posterial_view_image
                                }
                            />
                        </div>
                        <div className='posture-col-1x' style={{ backgroundColor: 'white' }}>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Head deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Sitting_lateral_view"].Angles[0]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Shoulder</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Sitting_lateral_view"].Angles[1]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Hip/Pelvic Deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Sitting_lateral_view"].Angles[2]}</p>
                            </div>
                            <div className='bg-theme-1x' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Knees Deviation</p>
                                <p> {Object.keys(state.FirstAssesment.posture).length > 0 &&
                                    state.FirstAssesment.posture["Sitting_lateral_view"].Angles[3]}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.keys(state.FirstAssesment.posture["Sitting_lateral_view"].checkbox).map((ob) => {
                            if (state.FirstAssesment.posture["Sitting_lateral_view"].checkbox[ob] == 1) {
                                return (
                                    <p style={{ margin: '5px' }}> <Badge color="#000000" />{ob}</p>
                                )
                            }
                        }
                        )}
                    </div>
                </div>}
            </Row>
            <Col sm={24} md={12} lg={12}>
                <Col style={{ backgroundColor: 'white' }} className='h3-1x m1-1x' span={24}>
                    <span className='m1-1x'>{`Notes : ${Object.keys(state.FirstAssesment.posture).length > 0 &&
                        state.FirstAssesment.posture["Notes"]}`}</span>
                </Col>
            </Col>

        </>
    )
}

export default Posture