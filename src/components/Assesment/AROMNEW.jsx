import { Button, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { IconContext } from 'react-icons'
import { BsFillPlayFill } from 'react-icons/bs'
import './AROMNEW.css'

const AROMNEW = ({ setIsSideNavbarCollapsed, Setsidebarshow }) => {
    let joints = [{
        joint: 'Shoulder',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Elbow',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Cervical',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Lumbar',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Hip',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Knee',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Ankle',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    },
    {
        joint: 'Wrist',
        joints: ["L Shoulder Abd/Add",
            "R Shoulder Abd/Add", "L Shoulder Flex/Ext", "R Shoulder Flex/Ext"]
    }
    ]
    useEffect(() => {
        Setsidebarshow(false)
    }, [])

    return (
        <Row justify='space-between' className='main-container-1x'>
            <Col xs={24} sm={24} md={4} lg={2}>
                <div className="arom-joints-list-wrapper-1x div-border-1x">
                    {joints.map((e) => <div className='arom-joints-list-item-1x'>{e.joint}</div>)}
                </div>
            </Col>
            <Col className='arom-canvas-1x div-border-1x' xs={24} sm={24} md={20} lg={12}>

            </Col>
            <Col className='arom-controls-1x div-border-1x' xs={24} sm={24} md={8} lg={9}>
                <div className='arom-btn-grp-wrapper'>
                    <div className='arom-btn-grp'>
                        <IconContext.Provider value={{ color: 'black', size: '40px' }}>
                            <Button><BsFillPlayFill /></Button>
                            <Button><BsFillPlayFill /></Button>
                            <Button><BsFillPlayFill /></Button>
                            <Button><BsFillPlayFill /></Button>
                        </IconContext.Provider>
                    </div>
                </div>
                <div className='arom-analytics-tab-wrapper-1x '>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                    <div>Column</div>
                </div>
            </Col>
        </Row>
    )
}

export default AROMNEW